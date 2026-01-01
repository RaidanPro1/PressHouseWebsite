import React, { useState } from 'react';
import { ICONS, MOCK_VIOLATIONS, MOCK_VERIFIED_NEWS } from '../constants';
import { AdminUser } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import AnimatedNumber from './AnimatedNumber';
import AssignAlertModal from './AssignAlertModal';

const violationChartData = MOCK_VIOLATIONS.reduce((acc, v) => {
    const month = new Date(v.date).toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
        existing.count++;
    } else {
        acc.push({ month, count: 1 });
    }
    return acc;
}, [] as { month: string, count: number }[]).reverse();


const DashboardHome: React.FC<{ t: (key: any, vars?: Record<string, string | number>) => string; users: AdminUser[] }> = ({ t, users }) => {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
    const [alerts, setAlerts] = useState([
        { id: 1, location: 'صنعاء، بالقرب من ميدان التحرير', time: 'منذ 5 دقائق', status: 'new' },
        { id: 2, location: 'عدن، مديرية كريتر', time: 'منذ ساعتين', status: 'new' },
        { id: 3, location: 'تعز، شارع جمال', time: 'منذ 8 ساعات', status: 'new' },
    ]);

    const stats = [
        { label: t('admin.total_violations'), value: MOCK_VIOLATIONS.length, icon: ICONS.Observatory },
        { label: t('admin.fact_checks'), value: MOCK_VERIFIED_NEWS.length, icon: ICONS.FactCheck },
        { label: t('admin.registered_users'), value: users.length, icon: ICONS.Users },
        { label: t('admin.panic_alerts'), value: alerts.length, icon: ICONS.Panic },
    ];

    const handleOpenAssignModal = (alert: any) => {
        setSelectedAlert(alert);
        setIsAssignModalOpen(true);
    };

    const handleAssignAlert = (userId: number, userName: string) => {
        if (selectedAlert) {
            setAlerts(prevAlerts => 
                prevAlerts.map(alert => 
                    alert.id === selectedAlert.id ? { ...alert, status: `assigned:${userName}` } : alert
                )
            );
        }
        setIsAssignModalOpen(false);
        setSelectedAlert(null);
    };
    
    const adminName = users.find(u => u.role === 'admin')?.name || 'Admin';

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">{t('admin.welcome')}, {adminName}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <AnimatedNumber value={stat.value} className="text-3xl font-bold text-gray-900" />
                        </div>
                        <div className="bg-press-blue/10 p-3 rounded-full">
                            <stat.icon className="w-6 h-6 text-press-blue" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-gray-800 mb-4">{t('admin.recent_activity')}</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={violationChartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" name={t('admin.total_violations')} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="lg:col-span-1">
                    <h3 className="font-bold text-gray-800 mb-4">تنبيهات الطوارئ الأخيرة</h3>
                    <div className="bg-white p-4 rounded-lg shadow space-y-3">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="p-3 bg-red-50 rounded-md border border-red-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <ICONS.Alert className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <span className="font-semibold text-sm text-gray-800">{alert.location}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 flex-shrink-0">{alert.time}</span>
                                </div>
                                <div className="mt-2 text-right">
                                    {alert.status === 'new' ? (
                                        <button onClick={() => handleOpenAssignModal(alert)} className="text-xs font-bold text-press-blue hover:underline">
                                            {t('admin.alerts.assign')} &rarr;
                                        </button>
                                    ) : (
                                        <p className="text-xs font-semibold text-green-700">
                                            {t('admin.alerts.assigned_to', { user: alert.status.split(':')[1] })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <AssignAlertModal 
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                onAssign={handleAssignAlert}
                users={users}
                t={t}
            />
        </div>
    );
};

export default DashboardHome;