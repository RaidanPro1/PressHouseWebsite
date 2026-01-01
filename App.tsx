import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Observatory from './components/Observatory';
import FactCheck from './components/FactCheck';
import PanicSystem from './components/PanicSystem';
import Reports from './components/Reports';
import HomePage from './components/HomePage';
import TrainingPage from './components/TrainingPage';
import GetInvolvedPage from './components/GetInvolvedPage';
import NewsPage from './components/NewsPage';
import AdminDashboard from './components/AdminDashboard';
import ProjectsPage from './components/ProjectsPage';
import EventsPage from './components/EventsPage';
import AboutUsPage from './components/AboutUsPage';
// FIX: Import ObservatoryConfig from types.ts
import { ObservatoryConfig } from './types';

// FIX: Removed local ObservatoryConfig type definition
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [observatoryConfig, setObservatoryConfig] = useState<ObservatoryConfig>({ chartType: 'radial' });


  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutUsPage />;
      case 'observatory':
        return <Observatory config={observatoryConfig} />;
      case 'factcheck':
        return <FactCheck />;
      case 'panic':
        return <PanicSystem />;
      case 'reports':
        return <Reports />;
      case 'news':
        return <NewsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'events':
        return <EventsPage />;
      case 'training':
        return <TrainingPage />;
      case 'get_involved':
        return <GetInvolvedPage />;
      case 'admin':
        return <AdminDashboard 
                  observatoryConfig={observatoryConfig} 
                  setObservatoryConfig={setObservatoryConfig} 
               />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
