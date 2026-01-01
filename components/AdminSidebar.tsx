import React from 'react';
import { ICONS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { Newspaper } from 'lucide-react';
import { SiteSettings } from './AdminDashboard';

interface AdminSidebarProps {
    activePage: string;
    setActivePage: (page: any) => void;
    t: (key: any) => string;
    siteSettings: SiteSettings;
    theme: { bg: string, hover: string, text: string };
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage, setActivePage, t, siteSettings, theme }) => {

    const navItems = [
        { id: 'dashboard', label: t('admin.nav.dashboard'), icon: ICONS.Dashboard },
        { id: 'pages', label: t('admin.nav.pages'), icon: ICONS.Pages },
        { id: 'slider', label: t('admin.nav.slider'), icon: ICONS.FileVideo },
        { id: 'violations', label: t('admin.nav.violations'), icon: ICONS.Observatory },
        { id: 'reports', label: t('admin.nav.reports'), icon: ICONS.Reports },
        { id: 'news', label: t('admin.nav.news'), icon: ICONS.News },
        { id: 'projects', label: t('admin.nav.projects'), icon: ICONS.Projects },
        { id: 'events', label: t('admin.nav.events'), icon: ICONS.Events },
        { id: 'training', label: t('admin.nav.training'), icon: ICONS.CapacityBuilding },
        { id: 'get_involved', label: t('admin.nav.get_involved'), icon: ICONS.GetInvolved },
        { id: 'team', label: t('admin.nav.team'), icon: ICONS.Users },
        { id: 'users', label: t('admin.nav.users'), icon: ICONS.UserPlus },
        { id: 'mailing_list', label: t('admin.nav.mailing_list'), icon: ICONS.Mail },
        { id: 'settings', label: t('admin.nav.settings'), icon: ICONS.Settings },
    ];

    const title = siteSettings.logoType === 'text' ? siteSettings.textLogo : siteSettings.title_ar;
    const subtitle = siteSettings.subtitle_ar;

    return (
        <aside className={`${theme.bg} text-white w-64 flex-col flex-shrink-0 flex`}>
            <div className="p-5 border-b border-white/10 flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                    {siteSettings.logoType === 'image' && siteSettings.siteLogoUrl ? 
                        <img src={siteSettings.siteLogoUrl} alt="Logo" className="w-5 h-5" /> : 
                        <Newspaper className="w-5 h-5 text-white" />
                    }
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-wide">{title}</h1>
                    <p className="text-xs text-white/70">{subtitle}</p>
                </div>
            </div>
            <nav className="p-4 space-y-1.5 flex-grow overflow-y-auto">
                {navItems.map(item => (
                    <button 
                        key={item.id} 
                        onClick={() => setActivePage(item.id)} 
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 text-right ${activePage === item.id ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'}`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-white/10">
                <button 
                    onClick={() => window.location.reload()} 
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 text-white/80`}
                >
                    <ICONS.Close className="w-5 h-5" />
                    <span>{t('admin.logout')}</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
