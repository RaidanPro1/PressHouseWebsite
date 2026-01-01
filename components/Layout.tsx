import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ICONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const t = useTranslation();

  // The AdminDashboard has its own layout, so we render it directly.
  if (activeTab === 'admin') {
      return <>{children}</>;
  }
  
  const navItems = [
    { id: 'home', label: t('nav.home'), icon: ICONS.Home },
    { id: 'about', label: t('nav.about'), icon: ICONS.About },
    { id: 'observatory', label: t('nav.observatory'), icon: ICONS.Observatory },
    { id: 'factcheck', label: t('nav.factcheck'), icon: ICONS.FactCheck },
    { id: 'reports', label: t('nav.reports'), icon: ICONS.Reports },
    { id: 'news', label: t('nav.news'), icon: ICONS.News },
    { id: 'projects', label: t('nav.projects'), icon: ICONS.Projects },
    { id: 'events', label: t('nav.events'), icon: ICONS.Events },
    { id: 'training', label: t('nav.training'), icon: ICONS.CapacityBuilding },
    { id: 'get_involved', label: t('nav.get_involved'), icon: ICONS.GetInvolved },
  ];
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-row-reverse">
        <Sidebar 
            navItems={navItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            t={t}
        />
        <div className="flex-1 flex flex-col md:mr-64">
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              {children}
          </main>
          <Footer setActiveTab={setActiveTab} t={t} />
        </div>
    </div>
  );
};

export default Layout;