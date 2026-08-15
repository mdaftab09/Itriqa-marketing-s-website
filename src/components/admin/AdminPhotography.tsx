import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, ImagePlus, Loader2, Pencil, RefreshCw, Save, Trash2, Upload, X } from 'lucide-react';
import { supabase, type PhotographyPhoto, deletePhotographyPhoto, getPhotographyPublicUrl, getPhotographyPhotos, replacePhotographyPhoto, updatePhotographyMetadata, uploadPhotographyPhoto } from '../../lib/supabase';

export function AdminPhotography() {
    const [photos, setPhotos] = useState<PhotographyPhoto[]>([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [editing, setEditing] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAlt, setEditAlt] = useState('');
    const [replaceId, setReplaceId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const replaceInputRef = useRef<HTMLInputElement>(null);

    const loadPhotos = async () => {
        setLoading(true);
        setError('');
        const data = await getPhotographyPhotos();
        setPhotos(data);
        setLoading(false);
    };

    useEffect(() => { void loadPhotos(); }, []);

    const showError = (value: unknown) => {
        setError(value instanceof Error ? value.message : 'Something went wrong.');
        setMessage('');
    };

    const handleAdd = async (files: FileList | null) => {
        if (!files?.length || !supabase) return;
        setBusy(true); setError(''); setMessage('');
        try {
            for (const file of Array.from(files)) {
                if (!file.type.startsWith('image/')) continue;
                if (file.size > 12 * 1024 * 1024) throw new Error(`${file.name} is larger than 12 MB.`);
                await uploadPhotographyPhoto(file);
            }
            await loadPhotos();
            setMessage(`${files.length} photo${files.length > 1 ? 's' : ''} uploaded successfully.`);
        } catch (e) { showError(e); }
        finally { setBusy(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
    };

    const handleReplace = async (file: File | undefined) => {
        if (!file || !replaceId || !supabase) return;
        const current = photos.find((photo) => photo.id === replaceId);
        if (!current) return;
        setBusy(true); setError(''); setMessage('');
        try {
            await replacePhotographyPhoto(current.id, current.storage_path, file);
            await loadPhotos();
            setMessage('Photo replaced successfully.');
        } catch (e) { showError(e); }
        finally { setBusy(false); setReplaceId(null); if (replaceInputRef.current) replaceInputRef.current.value = ''; }
    };

    const startEdit = (photo: PhotographyPhoto) => {
        setEditing(photo.id); setEditTitle(photo.title); setEditAlt(photo.alt_text); setMessage(''); setError('');
    };

    const saveEdit = async () => {
        if (!editing) return;
        setBusy(true); setError('');
        try {
            await updatePhotographyMetadata(editing, editTitle.trim(), editAlt.trim());
            await loadPhotos();
            setEditing(null); setMessage('Photo details saved.');
        } catch (e) { showError(e); }
        finally { setBusy(false); }
    };

    const handleDelete = async (photo: PhotographyPhoto) => {
        if (!window.confirm('Delete this photo permanently?')) return;
        setBusy(true); setError('');
        try {
            await deletePhotographyPhoto(photo.id, photo.storage_path);
            await loadPhotos();
            setMessage('Photo deleted.');
        } catch (e) { showError(e); }
        finally { setBusy(false); }
    };

    if (!supabase) {
        return (
            <div className="max-w-3xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Photography</h1>
                    <p className="text-muted-foreground mt-1">Manage the public photography gallery.</p>
                </div>
                <div className="bg-card border border-amber-500/30 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-2">Supabase is not connected</h2>
                    <p className="text-sm text-muted-foreground">Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your local <code>.env.local</code> file and to Vercel Environment Variables, then restart the dev server.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Photography</h1>
                    <p className="text-muted-foreground mt-1">Add, replace, edit, and delete gallery photos.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => void loadPhotos()} disabled={loading || busy} className="px-4 py-2.5 border border-border rounded-xl flex items-center gap-2 hover:bg-secondary disabled:opacity-50">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} disabled={busy} className="px-4 py-2.5 bg-accent text-accent-foreground rounded-xl flex items-center gap-2 hover:bg-accent/90 disabled:opacity-50">
                        <ImagePlus className="w-4 h-4" /> Add Photos
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple hidden onChange={(e) => void handleAdd(e.target.files)} />
                </div>
            </div>

            {(message || error) && (
                <div className={`rounded-xl border p-4 text-sm flex items-center gap-2 ${error ? 'border-red-500/30 bg-red-500/10 text-red-600' : 'border-green-500/30 bg-green-500/10 text-green-700'}`}>
                    {error ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    {error || message}
                </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-accent mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Upload guidance</p>
                        <p className="mt-1">JPG, PNG, WebP or AVIF up to 12 MB per image. Images are stored in Supabase Storage and appear on the public Photography page automatically.</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>
            ) : photos.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-border rounded-2xl">
                    <Camera className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                    <p className="font-medium text-foreground">No photography uploaded yet.</p>
                    <p className="text-sm text-muted-foreground mt-1">Upload your first gallery image.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {photos.map((photo, index) => {
                        const url = getPhotographyPublicUrl(photo.storage_path);
                        const isEditing = editing === photo.id;
                        return (
                            <motion.article key={photo.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.03, 0.15) }} className="overflow-hidden rounded-2xl border border-border bg-card">
                                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                                    {url ? <img src={url} alt={photo.alt_text} className="w-full h-full object-cover" /> : null}
                                </div>
                                <div className="p-4 space-y-3">
                                    {isEditing ? (
                                        <>
                                            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
                                            <input value={editAlt} onChange={(e) => setEditAlt(e.target.value)} placeholder="Alt text" className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
                                            <div className="flex gap-2">
                                                <button onClick={() => void saveEdit()} disabled={busy} className="flex-1 px-3 py-2 bg-accent text-accent-foreground rounded-lg flex justify-center items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                                                <button onClick={() => setEditing(null)} className="px-3 py-2 border border-border rounded-lg"><X className="w-4 h-4" /></button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <p className="font-semibold text-foreground truncate">{photo.title || 'Untitled photo'}</p>
                                                <p className="text-xs text-muted-foreground mt-1 truncate">{photo.alt_text}</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <button onClick={() => startEdit(photo)} className="px-2 py-2 border border-border rounded-lg flex justify-center items-center gap-1 text-sm hover:bg-secondary"><Pencil className="w-4 h-4" /> Edit</button>
                                                <button onClick={() => { setReplaceId(photo.id); setTimeout(() => replaceInputRef.current?.click(), 0); }} disabled={busy} className="px-2 py-2 border border-border rounded-lg flex justify-center items-center gap-1 text-sm hover:bg-secondary"><RefreshCw className="w-4 h-4" /> Replace</button>
                                                <button onClick={() => void handleDelete(photo)} disabled={busy} className="px-2 py-2 border border-red-500/20 text-red-600 rounded-lg flex justify-center items-center gap-1 text-sm hover:bg-red-500/10"><Trash2 className="w-4 h-4" /> Delete</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            )}
            <input ref={replaceInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(e) => void handleReplace(e.target.files?.[0])} />
        </div>
    );
}
