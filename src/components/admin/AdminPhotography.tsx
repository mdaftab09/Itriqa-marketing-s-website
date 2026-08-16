import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Camera,
    Check,
    ImagePlus,
    Loader2,
    Pencil,
    RefreshCw,
    Save,
    Trash2,
    Upload,
    X,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    supabase,
    PHOTOGRAPHY_CATEGORIES,
    type PhotographyCategory,
    type PhotographyPhoto,
    deletePhotographyPhoto,
    getPhotographyPhotos,
    getPhotographyPublicUrl,
    replacePhotographyPhoto,
    updatePhotographyMetadata,
    uploadPhotographyPhoto,
} from '../../lib/supabase';

const DEFAULT_CATEGORY: PhotographyCategory = 'Beauty & Salon';

type CategoryFilter = 'All' | PhotographyCategory;

export function AdminPhotography() {
    const location = useLocation();
    const navigate = useNavigate();
    const requestedSegment = new URLSearchParams(location.search).get('segment');
    const [photos, setPhotos] = useState<PhotographyPhoto[]>([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<CategoryFilter>('All');
    const [uploadCategory, setUploadCategory] = useState<PhotographyCategory>(DEFAULT_CATEGORY);
    const [editing, setEditing] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAlt, setEditAlt] = useState('');
    const [editCategory, setEditCategory] = useState<PhotographyCategory>(DEFAULT_CATEGORY);
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

    useEffect(() => {
        if (requestedSegment === 'All') {
            setFilter('All');
            return;
        }
        if (requestedSegment && PHOTOGRAPHY_CATEGORIES.includes(requestedSegment as PhotographyCategory)) {
            setFilter(requestedSegment as PhotographyCategory);
            setUploadCategory(requestedSegment as PhotographyCategory);
        }
    }, [requestedSegment]);

    const selectFilter = (value: CategoryFilter) => {
        setFilter(value);
        if (value !== 'All') setUploadCategory(value);
        navigate(value === 'All' ? '/admin/photography' : `/admin/photography?segment=${encodeURIComponent(value)}`, { replace: true });
    };

    const showError = (value: unknown) => {
        setError(value instanceof Error ? value.message : 'Something went wrong.');
        setMessage('');
    };

    const handleAdd = async (files: FileList | null) => {
        if (!files?.length || !supabase) return;
        setBusy(true);
        setError('');
        setMessage('');
        try {
            let uploaded = 0;
            for (const file of Array.from(files)) {
                if (!file.type.startsWith('image/')) continue;
                if (file.size > 20 * 1024 * 1024) throw new Error(`${file.name} is larger than 20 MB.`);
                await uploadPhotographyPhoto(file, uploadCategory);
                uploaded += 1;
            }
            await loadPhotos();
            selectFilter(uploadCategory);
            setMessage(`${uploaded} photo${uploaded === 1 ? '' : 's'} uploaded to ${uploadCategory}.`);
        } catch (e) {
            showError(e);
        } finally {
            setBusy(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleReplace = async (file: File | undefined) => {
        if (!file || !replaceId || !supabase) return;
        const current = photos.find((photo) => photo.id === replaceId);
        if (!current) return;
        setBusy(true);
        setError('');
        setMessage('');
        try {
            await replacePhotographyPhoto(current.id, current.storage_path, file);
            await loadPhotos();
            setMessage('Photo replaced successfully.');
        } catch (e) {
            showError(e);
        } finally {
            setBusy(false);
            setReplaceId(null);
            if (replaceInputRef.current) replaceInputRef.current.value = '';
        }
    };

    const startEdit = (photo: PhotographyPhoto) => {
        setEditing(photo.id);
        setEditTitle(photo.title);
        setEditAlt(photo.alt_text);
        setEditCategory(photo.category);
        setMessage('');
        setError('');
    };

    const saveEdit = async () => {
        if (!editing) return;
        setBusy(true);
        setError('');
        try {
            await updatePhotographyMetadata(editing, editTitle.trim(), editAlt.trim(), editCategory);
            await loadPhotos();
            setEditing(null);
            selectFilter(editCategory);
            setMessage('Photo details saved.');
        } catch (e) {
            showError(e);
        } finally {
            setBusy(false);
        }
    };

    const handleDelete = async (photo: PhotographyPhoto) => {
        if (!window.confirm(`Delete “${photo.title || 'this photo'}” permanently?`)) return;
        setBusy(true);
        setError('');
        try {
            await deletePhotographyPhoto(photo.id, photo.storage_path);
            await loadPhotos();
            setMessage('Photo deleted.');
        } catch (e) {
            showError(e);
        } finally {
            setBusy(false);
        }
    };

    const filteredPhotos = filter === 'All' ? photos : photos.filter((photo) => photo.category === filter);
    const visiblePhotos = filteredPhotos.slice(0, 6);
    const currentLabel = filter === 'All' ? 'All photography' : filter;

    if (!supabase) {
        return (
            <div className="max-w-3xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Photography</h1>
                    <p className="text-muted-foreground mt-1">Manage photography by industry segment.</p>
                </div>
                <div className="bg-card border border-amber-500/30 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-2">Supabase is not connected</h2>
                    <p className="text-sm text-muted-foreground">Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your local <code>.env.local</code> file and to Vercel Environment Variables, then restart the dev server.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-w-0 max-w-[1500px] space-y-7">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5">
                <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-accent font-semibold">Photography CMS</p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-1">{currentLabel}</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">Upload, replace, edit, and remove photos without leaving the selected industry segment.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as PhotographyCategory)}
                        className="min-w-0 sm:min-w-[210px] px-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-accent"
                        aria-label="Upload category"
                    >
                        {PHOTOGRAPHY_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                    </select>
                    <button onClick={() => void loadPhotos()} disabled={loading || busy} className="px-4 py-2.5 border border-border bg-card rounded-xl flex items-center justify-center gap-2 hover:bg-secondary disabled:opacity-50">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} disabled={busy} className="px-4 py-2.5 bg-accent text-accent-foreground rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 disabled:opacity-50">
                        <ImagePlus className="w-4 h-4" /> Add Photos
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple hidden onChange={(e) => void handleAdd(e.target.files)} />
                </div>
            </div>

            <div className="lg:hidden -mx-1 overflow-x-auto pb-1 scrollbar-thin" aria-label="Photography segments">
                <div className="flex w-max min-w-full gap-2 px-1">
                    <button
                        type="button"
                        onClick={() => selectFilter('All')}
                        className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${filter === 'All' ? 'border-foreground bg-foreground text-background' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}
                    >
                        All photos
                    </button>
                    {PHOTOGRAPHY_CATEGORIES.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => selectFilter(category)}
                            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${filter === category ? 'border-foreground bg-foreground text-background' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {(message || error) && (
                <div className={`rounded-xl border p-4 text-sm flex items-start gap-2 ${error ? 'border-red-500/30 bg-red-500/10 text-red-600' : 'border-green-500/30 bg-green-500/10 text-green-700'}`}>
                    {error ? <X className="w-4 h-4 mt-0.5 shrink-0" /> : <Check className="w-4 h-4 mt-0.5 shrink-0" />}
                    <span className="break-words">{error || message}</span>
                </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
                <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div className="text-sm text-muted-foreground min-w-0">
                        <p className="font-medium text-foreground">Upload guidance</p>
                        <p className="mt-1 leading-relaxed">Upload to <strong className="text-foreground">{uploadCategory}</strong>. JPG, PNG, WebP or AVIF up to 20 MB each. Images are resized to 2400px maximum and converted to WebP before storage.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-foreground">{currentLabel}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}{filteredPhotos.length > 6 ? ' · showing 6' : ''}</p>
                </div>
                {filter !== 'All' && (
                    <button type="button" onClick={() => selectFilter('All')} className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">View all photos</button>
                )}
            </div>

            {loading ? (
                <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>
            ) : visiblePhotos.length === 0 ? (
                <div className="py-20 px-6 text-center border border-dashed border-border rounded-2xl bg-card/40">
                    <Camera className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                    <p className="font-medium text-foreground">No photography in {currentLabel} yet.</p>
                    <p className="text-sm text-muted-foreground mt-1">Choose this segment for uploads using the category selector above.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {visiblePhotos.map((photo, index) => {
                        const url = getPhotographyPublicUrl(photo.storage_path);
                        const isEditing = editing === photo.id;
                        return (
                            <motion.article key={photo.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.03, 0.15) }} className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                                    {url ? <img src={url} alt={photo.alt_text || photo.title} className="w-full h-full object-contain" /> : null}
                                </div>
                                <div className="p-4 space-y-3">
                                    {isEditing ? (
                                        <>
                                            <select value={editCategory} onChange={(e) => setEditCategory(e.target.value as PhotographyCategory)} className="w-full min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent">
                                                {PHOTOGRAPHY_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                                            </select>
                                            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" className="w-full min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
                                            <input value={editAlt} onChange={(e) => setEditAlt(e.target.value)} placeholder="Alt text" className="w-full min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
                                            <div className="flex gap-2">
                                                <button onClick={() => void saveEdit()} disabled={busy} className="flex-1 min-w-0 px-3 py-2 bg-accent text-accent-foreground rounded-lg flex justify-center items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                                                <button onClick={() => setEditing(null)} className="px-3 py-2 border border-border rounded-lg"><X className="w-4 h-4" /></button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-foreground truncate">{photo.title || 'Untitled photo'}</p>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 break-words">{photo.alt_text || 'No alt text'}</p>
                                                <span className="inline-flex mt-2 max-w-full px-2 py-1 rounded-full bg-secondary text-[10px] uppercase tracking-wider font-semibold truncate">{photo.category}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <button onClick={() => startEdit(photo)} className="px-2 py-2 border border-border rounded-lg flex justify-center items-center gap-1 text-xs sm:text-sm hover:bg-secondary"><Pencil className="w-4 h-4" /> Edit</button>
                                                <button onClick={() => { setReplaceId(photo.id); setTimeout(() => replaceInputRef.current?.click(), 0); }} disabled={busy} className="px-2 py-2 border border-border rounded-lg flex justify-center items-center gap-1 text-xs sm:text-sm hover:bg-secondary"><RefreshCw className="w-4 h-4" /> Replace</button>
                                                <button onClick={() => void handleDelete(photo)} disabled={busy} className="px-2 py-2 border border-red-500/20 text-red-600 rounded-lg flex justify-center items-center gap-1 text-xs sm:text-sm hover:bg-red-500/10"><Trash2 className="w-4 h-4" /> Delete</button>
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
