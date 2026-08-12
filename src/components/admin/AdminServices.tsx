import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, GripVertical } from 'lucide-react';
import { supabase, getAllServices, type Service } from '../../lib/supabase';

export function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        const data = await getAllServices();
        setServices(data);
        setLoading(false);
    }

    async function toggleActive(id: string, currentStatus: boolean) {
        if (!supabase) return;

        const { error } = await supabase
            .from('services')
            .update({ active: !currentStatus })
            .eq('id', id);

        if (!error) {
            setServices(services.map(s =>
                s.id === id ? { ...s, active: !currentStatus } : s
            ));
        }
    }

    async function deleteService(id: string) {
        if (!supabase || !confirm('Are you sure you want to delete this service?')) return;

        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id);

        if (!error) {
            setServices(services.filter(s => s.id !== id));
        }
    }

    const filteredServices = services.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Services</h1>
                    <p className="text-muted-foreground">Manage your service offerings</p>
                </div>
                <Link to="/admin/services/new">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Service
                    </motion.button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 bg-card rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : filteredServices.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <p className="text-muted-foreground">No services found</p>
                    <Link to="/admin/services/new" className="text-accent hover:underline mt-2 inline-block">
                        Add your first service
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
                        >
                            <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />

                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient || 'from-blue-500 to-blue-600'} flex items-center justify-center text-white font-bold`}>
                                {service.title.charAt(0)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground truncate">{service.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">{service.description}</p>
                            </div>

                            {service.price_from && (
                                <span className="text-sm text-muted-foreground hidden sm:block">
                                    From {service.price_from}
                                </span>
                            )}

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleActive(service.id, service.active)}
                                    className={`p-2 rounded-lg transition-colors ${service.active
                                            ? 'bg-green-500/10 text-green-500'
                                            : 'bg-gray-500/10 text-gray-500'
                                        }`}
                                    title={service.active ? 'Active' : 'Inactive'}
                                >
                                    {service.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                                <Link to={`/admin/services/${service.id}`}>
                                    <button className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </Link>
                                <button
                                    onClick={() => deleteService(service.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
