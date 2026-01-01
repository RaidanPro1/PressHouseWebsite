import React, { useState } from 'react';
import { ICONS } from '../constants';
import { MockApiService } from '../services/mockBackend';
import { Newspaper, Send } from 'lucide-react';

interface FooterProps {
    t: (key: any, vars?: Record<string, string | number>) => string;
    setActiveTab: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ t, setActiveTab }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('submitting');
        try {
            await MockApiService.subscribeToNewsletter(email);
            setStatus('success');
            setEmail('');
        } catch (err) {
            setStatus('error');
        } finally {
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const quickLinks = [
        { label: t('nav.observatory'), tab: 'observatory' },
        { label: t('nav.reports'), tab: 'reports' },
        { label: t('nav.news'), tab: 'news' },
        { label: t('nav.get_involved'), tab: 'get_involved' },
    ];
    
    const socialLinks = [
        { icon: ICONS.Facebook, url: '#' },
        { icon: ICONS.Twitter, url: '#' },
        { icon: ICONS.Linkedin, url: '#' },
    ];

    return (
        <footer className="bg-slate-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white/10 p-2 rounded-lg">
                               <Newspaper className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">{t('sidebar.title')}</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                            {t('footer.about')}
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h3>
                        <ul className="space-y-2">
                            {quickLinks.map(link => (
                                <li key={link.tab}>
                                    <button onClick={() => setActiveTab(link.tab)} className="text-slate-400 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t('footer.newsletter.title')}</h3>
                        <p className="text-slate-400 text-sm mb-4">{t('footer.newsletter.desc')}</p>
                        <form onSubmit={handleSubscribe}>
                            <div className="flex items-center">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('footer.newsletter.placeholder')}
                                    className="w-full bg-slate-700 text-white px-4 py-2 rounded-r-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-press-yellow"
                                />
                                <button type="submit" disabled={status === 'submitting'} className="bg-press-yellow text-press-blue p-2.5 rounded-l-md hover:bg-yellow-400 transition-colors disabled:opacity-50">
                                    <Send className="w-5 h-5"/>
                                </button>
                            </div>
                             {status === 'success' && <p className="text-green-400 text-xs mt-2">{t('footer.newsletter.success')}</p>}
                             {status === 'error' && <p className="text-red-400 text-xs mt-2">{t('footer.newsletter.error')}</p>}
                        </form>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center text-center sm:text-right gap-4">
                    <p className="text-sm text-slate-500 order-2 sm:order-1">
                        {t('footer.rights', { year: new Date().getFullYear() })}
                        <span className="mx-2 text-slate-600 hidden sm:inline">|</span>
                        <span className="text-xs text-slate-600 block sm:inline mt-1 sm:mt-0">
                            {t('footer.powered_by')} <a href="https://raidan.pro" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-500 hover:text-press-yellow transition">Raidan Pro</a>
                        </span>
                    </p>
                    <div className="flex items-center space-x-4 space-x-reverse order-1 sm:order-2">
                        {socialLinks.map((social, index) => (
                            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <social.icon className="w-5 h-5"/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;