import React from 'react';
import { ICONS } from '../constants';
import { Newspaper } from 'lucide-react';

interface SidebarProps {
    navItems: { id: string; label: string; icon: React.ElementType }[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    t: (key: any) => string;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, activeTab, setActiveTab, t }) => {
    
    const navLinkClasses = (isActive: boolean) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-base text-right ${
            isActive ? 'bg-press-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
        }`;

    return (
        <aside className="w-64 bg-white border-l border-gray-200 flex-col flex-shrink-0 hidden md:flex fixed h-full right-0 top-0">
             <div className="p-5 border-b border-gray-200 flex items-center gap-3">
                 <div className="bg-press-blue p-2 rounded-lg">
                   <Newspaper className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-wide text-press-blue">{t('sidebar.title')}</h1>
                    <p className="text-xs text-gray-500">{t('sidebar.subtitle')}</p>
                </div>
            </div>
            
            <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
                {navItems.map(item => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} className={navLinkClasses(activeTab === item.id)}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 space-y-4">
                 <button 
                    onClick={() => setActiveTab('panic')} 
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg animate-pulse"
                 >
                    <ICONS.Panic className="w-5 h-5" />
                    <span>{t('nav.panic')}</span>
                </button>
                
                <div className="flex items-center justify-center">
                    <button onClick={() => setActiveTab('admin')} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-sm text-gray-600">
                        <ICONS.Dashboard className="w-4 h-4"/>
                        <span>{t('admin.dashboard')}</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;