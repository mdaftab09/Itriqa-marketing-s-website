import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const gradientOptions = [
    { value: 'from-blue-500 to-blue-600', label: 'Blue' },
    { value: 'from-purple-500 to-purple-600', label: 'Purple' },
    { value: 'from-green-500 to-green-600', label: 'Green' },
    { value: 'from-orange-500 to-orange-600', label: 'Orange' },
    { value: 'from-pink-500 to-pink-600', label: 'Pink' },
    { value: 'from-cyan-500 to-cyan-600', label: 'Cyan' },
];

const iconOptions = [
    'Code', 'Palette', 'Smartphone', 'Globe', 'ShoppingCart', 'Layers', 'Zap', 'Shield'
];

export function ServiceEditor() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [newFeature, setNewFeature] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Code',
        features: [] as string[],
        price_from: '',
        gradient: 'from-blue-500 to-blue-600',
        order_index: 0,
        active: true
    });

    useEffect(() => {
        if (isEditing) {
            fetchService();
        } else {
            setLoading(false);
        }
    }, [isEditing, id]);

    async function fetchService() {
        if (!supabase || !id) return;
        setLoading(true);

        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching service:', error);
            navigate('/admin/services');
            return;
        }

        if (data) {
            setFormData({
                title: data.title || '',
                description: data.description || '',
                icon: data.icon || 'Code',
                features: data.features || [],
                price_from: data.price_from || '',
                gradient: data.gradient || 'from-blue-500 to-blue-600',
                order_index: data.order_index || 0,
                active: data.active ?? true
            });
        }
        setLoading(false);
    }

    function addFeature() {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()]
            }));
            setNewFeature('');
        }
    }

    function removeFeature(index: number) {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!supabase) return;
        setSaving(true);

        const serviceData = {
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            features: formData.features,
            price_from: formData.price_from || null,
            gradient: formData.gradient,
            order_index: formData.order_index,
            active: formData.active
        };

        let error;
        if (isEditing) {
            const result = await supabase
                .from('services')
                .update(serviceData)
                .eq('id', id);
            error = result.error;
        } else {
            const result = await supabase
                .from('services')
                .insert([serviceData]);
            error = result.error;
        }

        setSaving(false);

        if (error) {
            console.error('Error saving service:', error);
            alert('Error saving service');
            return;
        }

        navigate('/admin/services');
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#0063cd]" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={() => navigate('/admin/services')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
            </button>

            <h1 className="text-2xl font-bold text-foreground mb-6">
                {isEditing ? 'Edit Service' : 'New Service'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        placeholder="e.g., Web Development"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd] resize-none"
                        placeholder="Brief description of the service..."
                    />
                </div>

                {/* Icon & Gradient */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Icon
                        </label>
                        <select
                            value={formData.icon}
                            onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                            className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        >
                            {iconOptions.map(icon => (
                                <option key={icon} value={icon}>{icon}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Color
                        </label>
                        <select
                            value={formData.gradient}
                            onChange={(e) => setFormData(prev => ({ ...prev, gradient: e.target.value }))}
                            className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        >
                            {gradientOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Starting Price (optional)
                    </label>
                    <input
                        type="text"
                        value={formData.price_from}
                        onChange={(e) => setFormData(prev => ({ ...prev, price_from: e.target.value }))}
                        className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        placeholder="e.g., $999"
                    />
                </div>

                {/* Features */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Features
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                            className="flex-1 px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                            placeholder="Add a feature..."
                        />
                        <button
                            type="button"
                            onClick={addFeature}
                            className="px-4 py-2 bg-[#0063cd] text-white rounded-lg"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                                <span className="flex-1 text-sm">{feature}</span>
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="text-muted-foreground hover:text-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order & Active */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Display Order
                        </label>
                        <input
                            type="number"
                            value={formData.order_index}
                            onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                            className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                        />
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                                    className="sr-only"
                                />
                                <div className={`w-14 h-8 rounded-full transition-colors ${formData.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${formData.active ? 'translate-x-7' : 'translate-x-1'}`} />
                                </div>
                            </div>
                            <span className="text-sm font-medium text-foreground">Active</span>
                        </label>
                    </div>
                </div>

                {/* Submit */}
                <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full px-6 py-3 bg-[#0063cd] text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            {isEditing ? 'Update Service' : 'Create Service'}
                        </>
                    )}
                </motion.button>
            </form>
        </div>
    );
}
