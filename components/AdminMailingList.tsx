import React, { useState } from 'react';
import { NewsletterSubscriber } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { Send, PlusCircle } from 'lucide-react';
import NewsletterComposerModal from './NewsletterComposerModal';

interface AdminMailingListProps {
    t: (key: any) => string;
    subscribers: NewsletterSubscriber[];
}

const AdminMailingList: React.FC<AdminMailingListProps> = ({ t, subscribers }) => {
    const [isComposerOpen, setIsComposerOpen] = useState(false);

    const statusClasses = (status: 'subscribed' | 'unsubscribed') => {
        return status === 'subscribed' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-xl">{t('admin.mailing_list.title')}</h3>
                <button 
                    onClick={() => setIsComposerOpen(true)}
                    className="bg-press-blue text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-900 flex items-center gap-2"
                >
                    <Send className="w-4 h-4" />
                    {t('admin.mailing_list.compose')}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-right">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-3 font-semibold text-slate-600">{t('admin.mailing_list.email')}</th>
                            <th className="p-3 font-semibold text-slate-600">{t('admin.mailing_list.subscription_date')}</th>
                            <th className="p-3 font-semibold text-slate-600">{t('admin.mailing_list.status')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {subscribers.map(subscriber => (
                            <tr key={subscriber.id} className="hover:bg-slate-50">
                                <td className="p-3 text-slate-600 font-medium">{subscriber.email}</td>
                                <td className="p-3 text-slate-600">{subscriber.subscriptionDate}</td>
                                <td className="p-3 text-slate-600">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses(subscriber.status)}`}>
                                        {subscriber.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <NewsletterComposerModal 
                isOpen={isComposerOpen}
                onClose={() => setIsComposerOpen(false)}
                t={t}
            />
        </div>
    );
};

export default AdminMailingList;