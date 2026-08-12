import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Download, Search, Users, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Subscriber {
    id: string;
    email: string;
    subscribed_at: string;
    active: boolean;
}

export function AdminNewsletter() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSubscribers();
    }, []);

    async function fetchSubscribers() {
        if (!supabase) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('subscribed_at', { ascending: false });

        if (!error && data) {
            setSubscribers(data);
        }
        setLoading(false);
    }

    async function deleteSubscriber(id: string) {
        if (!supabase || !confirm('Remove this subscriber?')) return;

        const { error } = await supabase
            .from('newsletter_subscribers')
            .delete()
            .eq('id', id);

        if (!error) {
            setSubscribers(subscribers.filter(s => s.id !== id));
        }
    }

    function exportToCSV() {
        const csv = [
            'Email,Subscribed Date',
            ...subscribers.map(s => `${s.email},${new Date(s.subscribed_at).toLocaleDateString()}`)
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const filteredSubscribers = subscribers.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Stats
    const totalSubscribers = subscribers.length;
    const thisMonth = subscribers.filter(s => {
        const date = new Date(s.subscribed_at);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Newsletter Subscribers</h1>
                    <p className="text-muted-foreground">Manage your email subscribers</p>
                </div>
                {subscribers.length > 0 && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={exportToCSV}
                        className="px-4 py-2 bg-[#0063cd] text-white rounded-lg flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </motion.button>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0063cd]/10 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#0063cd]" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{totalSubscribers}</div>
                            <div className="text-sm text-muted-foreground">Total Subscribers</div>
                        </div>
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{thisMonth}</div>
                            <div className="text-sm text-muted-foreground">This Month</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search subscribers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0063cd]"
                />
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-14 bg-card rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : filteredSubscribers.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                        {searchTerm ? 'No subscribers found' : 'No subscribers yet'}
                    </p>
                    {!searchTerm && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Subscribers will appear here when people sign up
                        </p>
                    )}
                </div>
            ) : (
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-secondary/50">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Email</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Subscribed</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredSubscribers.map((subscriber, index) => (
                                <motion.tr
                                    key={subscriber.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    className="hover:bg-secondary/30 transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-[#0063cd]/10 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-[#0063cd]">
                                                    {subscriber.email.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-foreground text-sm">{subscriber.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
                                        {formatDate(subscriber.subscribed_at)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => deleteSubscriber(subscriber.id)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
