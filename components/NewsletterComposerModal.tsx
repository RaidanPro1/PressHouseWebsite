import React, { useState } from 'react';
// FIX: Import `CheckCircle` icon to resolve error.
import { X, Send, Bold, Italic, Link, List, CheckCircle } from 'lucide-react';

interface NewsletterComposerModalProps {
    isOpen: boolean;
    onClose: () => void;
    t: (key: any) => string;
}

const RichTextEditor: React.FC<{ value: string; onChange: (value: string) => void; }> = ({ value, onChange }) => (
    <div className="border border-gray-300 rounded-md">
        <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600"><Bold className="w-4 h-4"/></button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600"><Italic className="w-4 h-4"/></button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600"><Link className="w-4 h-4"/></button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600"><List className="w-4 h-4"/></button>
        </div>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={12}
            className="w-full p-2 focus:outline-none"
            placeholder="اكتب محتوى رسالتك هنا..."
        />
    </div>
);

const NewsletterComposerModal: React.FC<NewsletterComposerModalProps> = ({ isOpen, onClose, t }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        console.log("Sending newsletter:", { subject, content });
        setTimeout(() => {
            setStatus('sent');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setSubject('');
                setContent('');
            }, 2000);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <header className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-gray-800">{t('admin.mailing_list.composer_title')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </header>
                <form onSubmit={handleSend} className="p-6 space-y-4 overflow-y-auto">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{t('admin.mailing_list.subject')}</label>
                        <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                         <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-1">{t('admin.mailing_list.recipients')}</label>
                         <select id="recipients" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed">
                            <option>{t('admin.mailing_list.all_subscribers')}</option>
                         </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.mailing_list.content')}</label>
                        <RichTextEditor value={content} onChange={setContent} />
                     </div>
                </form>
                <footer className="flex justify-end items-center p-4 border-t bg-gray-50 space-x-2 space-x-reverse">
                    <button onClick={onClose} type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        {t('admin.crud.cancel')}
                    </button>
                    <button onClick={handleSend} type="submit" disabled={status !== 'idle'} className="px-6 py-2 text-sm font-medium text-white bg-press-blue border border-transparent rounded-md shadow-sm hover:bg-blue-900 flex items-center gap-2 disabled:opacity-60">
                        {status === 'idle' && <><Send className="w-4 h-4" />{t('admin.mailing_list.send')}</>}
                        {status === 'sending' && <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>{t('admin.mailing_list.sending')}</>}
                        {status === 'sent' && <><CheckCircle className="w-4 h-4" />{t('admin.mailing_list.sent_success')}</>}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default NewsletterComposerModal;
