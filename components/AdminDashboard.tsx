import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { AdminUser, Violation, Report, TrainingCourse, NewsArticle, Project, Event, NewsletterSubscriber, JobPosting, ViolationType, Governorate, Severity, Slide, Page, PageBlock, MenuItem, ObservatoryConfig, TeamMember } from '../types';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import DashboardHome from './DashboardHome';
import AdminModal, { Field } from './AdminModal';
import AdminSidebar from './AdminSidebar';
import AdminSettings from './AdminSettings';
import AdminMailingList from './AdminMailingList';
import AdminPageEditor from './AdminPageEditor';
import { MOCK_VIOLATIONS, MOCK_REPORTS, MOCK_NEWS_ARTICLES, MOCK_TRAINING_COURSES, MOCK_PROJECTS, MOCK_EVENTS, MOCK_SUBSCRIBERS, MOCK_JOB_POSTINGS, MOCK_SLIDES, MOCK_TEAM_MEMBERS, MOCK_ADMINISTRATIVE_BOARD, MOCK_ADVISORY_BOARD } from '../constants';

const mockInitialUsers: AdminUser[] = [
    { id: 1, name: 'علي محسن', email: 'ali.mohsen@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'فاطمة أحمد', email: 'fatima.ahmed@example.com', role: 'editor', status: 'active' },
    { id: 3, name: 'خالد صالح', email: 'khaled.saleh@example.com', role: 'monitor', status: 'inactive' },
];

type AdminPage = 'dashboard' | 'pages' | 'slider' | 'violations' | 'reports' | 'news' | 'projects' | 'events' | 'training' | 'get_involved' | 'users' | 'mailing_list' | 'settings' | 'team';
type DataType = Violation | Report | NewsArticle | Project | Event | TrainingCourse | AdminUser | JobPosting | NewsletterSubscriber | Slide | TeamMember;

export interface SiteSettings {
    logoType: 'text' | 'image';
    textLogo: string;
    siteLogoUrl: string;
    faviconUrl: string;
    title_ar: string;
    subtitle_ar: string;
    themeColor: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
}

export interface AdminDashboardProps {
    observatoryConfig: ObservatoryConfig;
    setObservatoryConfig: React.Dispatch<React.SetStateAction<ObservatoryConfig>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ observatoryConfig, setObservatoryConfig }) => {
    const t = useTranslation();
    const [activePage, setActivePage] = useState<AdminPage>('dashboard');
    
    // State management for all data
    const [users, setUsers] = useState<AdminUser[]>(mockInitialUsers);
    const [violations, setViolations] = useState<Violation[]>(MOCK_VIOLATIONS);
    const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
    const [news, setNews] = useState<NewsArticle[]>(MOCK_NEWS_ARTICLES);
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
    const [training, setTraining] = useState<TrainingCourse[]>(MOCK_TRAINING_COURSES);
    const [jobPostings, setJobPostings] = useState<JobPosting[]>(MOCK_JOB_POSTINGS);
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(MOCK_SUBSCRIBERS);
    const [slides, setSlides] = useState<Slide[]>(MOCK_SLIDES);
    const [workTeam, setWorkTeam] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
    const [adminBoard, setAdminBoard] = useState<TeamMember[]>(MOCK_ADMINISTRATIVE_BOARD);
    const [advisoryBoard, setAdvisoryBoard] = useState<TeamMember[]>(MOCK_ADVISORY_BOARD);

    const [pages, setPages] = useState<Page[]>([
        { id: 'home', name: 'الصفحة الرئيسية', path: '/', blocks: [] },
        { id: 'about', name: 'من نحن', path: '/about', blocks: [] },
        { id: 'observatory', name: 'المرصد', path: '/observatory', blocks: [
             { id: 'chart_config', type: 'chart_config', title: t('admin.observatory.chart_config'), content: observatoryConfig },
        ]},
    ]);

    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: 'home', label: t('nav.home'), path: '/' },
        { id: 'about', label: t('nav.about'), path: '/about' },
        { id: 'observatory', label: t('nav.observatory'), path: '/observatory' },
    ]);
    
    const handleEditBlock = (pageId: string, block: PageBlock) => {
        if (block.type === 'chart_config') {
            setModalType({ type: 'pages', subType: 'chart_config' });
            setCurrentItem({ ...block.content });
            setIsModalOpen(true);
        }
    };

    const [siteSettings, setSiteSettings] = useState<SiteSettings>({
        logoType: 'text',
        textLogo: "بيت الصحافة",
        siteLogoUrl: "",
        faviconUrl: "",
        title_ar: "بيت الصحافة",
        subtitle_ar: "لوحة التحكم",
        themeColor: "blue",
        seoTitle: "بيت الصحافة | منصة الحريات الإعلامية",
        seoDescription: "منصة متخصصة في رصد الانتهاكات ضد الصحفيين، التحقق من الأخبار، وبناء قدرات الإعلاميين في اليمن.",
        seoKeywords: "حرية الصحافة, اليمن, انتهاكات الصحفيين, التحقق من الأخبار",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<any | null>(null);
    const [modalType, setModalType] = useState<{ type: AdminPage, subType?: string } | null>(null);

    const handleEdit = (item: DataType, type: AdminPage, subType?: string) => {
        setCurrentItem(item);
        setModalType({ type, subType });
        setIsModalOpen(true);
    };

    const handleAdd = (type: AdminPage, subType?: string) => {
        setCurrentItem(null);
        setModalType({ type, subType });
        setIsModalOpen(true);
    };
    
    const handleDelete = (id: number, type: AdminPage, subType?: string) => {
        if (window.confirm(t('admin.crud.delete_confirm_title'))) {
           const stateUpdater = (setter: React.Dispatch<React.SetStateAction<any[]>>) => {
                setter(prev => prev.filter(i => i.id !== id));
           };
           
           if (type === 'team') {
               switch(subType) {
                    case 'work_team': stateUpdater(setWorkTeam); break;
                    case 'admin_board': stateUpdater(setAdminBoard); break;
                    case 'advisory_board': stateUpdater(setAdvisoryBoard); break;
               }
           } else {
               const setters: Record<string, React.Dispatch<React.SetStateAction<any[]>>> = {
                   'violations': setViolations, 'users': setUsers, 'news': setNews,
                   'reports': setReports, 'projects': setProjects, 'events': setEvents,
                   'training': setTraining, 'get_involved': setJobPostings, 'slider': setSlides,
               };
               if (setters[type]) {
                   setters[type](prev => prev.filter(i => i.id !== id));
               }
           }
        }
    };
    
    const handleSave = (item: any) => {
        if (!modalType) return;
        const { type, subType } = modalType;

        if (type === 'pages' && subType === 'chart_config') {
            setObservatoryConfig(item);
            setIsModalOpen(false);
            return;
        }

        const stateUpdater = (setter: React.Dispatch<React.SetStateAction<any[]>>) => {
            setter(prev => {
                if (item.id) {
                    return prev.map(i => i.id === item.id ? item : i);
                } else {
                    return [{ ...item, id: Date.now() }, ...prev];
                }
            });
        };

        const setters: Record<string, React.Dispatch<React.SetStateAction<any[]>>> = {
            'violations': setViolations, 'users': setUsers, 'news': setNews,
            'reports': setReports, 'projects': setProjects, 'events': setEvents,
            'training': setTraining, 'get_involved': setJobPostings, 'slider': setSlides,
        };
        
        if (type === 'team') {
            switch(subType) {
                case 'work_team': stateUpdater(setWorkTeam); break;
                case 'admin_board': stateUpdater(setAdminBoard); break;
                case 'advisory_board': stateUpdater(setAdvisoryBoard); break;
            }
        } else if (setters[type]) {
            stateUpdater(setters[type]);
        }
        
        setIsModalOpen(false);
    };
    
    const getFieldsForType = (type: AdminPage | null, subType?: string): Field[] => {
      if (!type) return [];
      
      const seoFields: Field[] = [
        { name: 'seo_separator', label: t('admin.crud.seo_section'), type: 'separator' },
        { name: 'seoTitle', label: t('admin.crud.seo_title'), type: 'text' },
        { name: 'seoDescription', label: t('admin.crud.seo_desc'), type: 'textarea' },
        { name: 'slug', label: t('admin.crud.slug'), type: 'text' },
      ];
      
      if (type === 'pages' && subType === 'chart_config') {
        return [
          { name: 'chartType', label: t('admin.observatory.chart_type'), type: 'select', options: ['radial', 'pie', 'bar'] }
        ];
      }
      
      switch (type) {
        case 'team': return [
            { name: 'name', label: t('admin.crud.name'), type: 'text' },
            { name: 'title', label: t('admin.crud.title_ar'), type: 'text' },
            { name: 'imageUrl', label: t('admin.crud.image_url'), type: 'uploader' },
            { name: 'email', label: t('admin.crud.email'), type: 'email' },
            { name: 'phone', label: t('admin.crud.phone'), type: 'text' },
        ];
        case 'slider': return [
            { name: 'title', label: 'العنوان', type: 'text' },
            { name: 'description', label: t('admin.crud.summary_ar'), type: 'textarea' },
            { name: 'imageUrl', label: t('admin.crud.image_url'), type: 'uploader' },
            { name: 'button1Text', label: t('admin.crud.button1_text'), type: 'text' },
            { name: 'button1Link', label: t('admin.crud.button1_link'), type: 'text' },
            { name: 'button2Text', label: t('admin.crud.button2_text'), type: 'text' },
            { name: 'button2Link', label: t('admin.crud.button2_link'), type: 'text' },
        ];
        case 'violations': return [
            { name: 'title', label: 'العنوان', type: 'text' },
            { name: 'type', label: t('admin.crud.violation_type'), type: 'select', options: Object.values(ViolationType) },
            { name: 'governorate', label: t('admin.crud.violation_gov'), type: 'select', options: Object.values(Governorate) },
            { name: 'severity', label: t('admin.crud.violation_severity'), type: 'select', options: Object.values(Severity) },
            { name: 'date', label: t('admin.crud.date'), type: 'date' },
        ];
        case 'users': return [
            { name: 'name', label: t('admin.crud.name'), type: 'text' },
            { name: 'email', label: t('admin.crud.email'), type: 'email' },
            { name: 'role', label: t('admin.crud.role'), type: 'select', options: ['admin', 'editor', 'monitor'] },
            { name: 'status', label: t('admin.crud.status'), type: 'select', options: ['active', 'inactive'] },
        ];
        default: return [];
      }
    };
    
    const CrudView: React.FC<{ title: string; data: any[]; columns: { key: string; label: string; render?: (item: any) => React.ReactNode }[]; type: AdminPage; subType?: string; }> = ({ title, data, columns, type, subType }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-xl">{title}</h3>
                <button onClick={() => handleAdd(type, subType)} className="bg-press-blue text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-900 flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    {t('admin.crud.add_new')}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-right">
                    <thead className="bg-slate-50">
                        <tr>
                            {columns.map(col => <th key={col.key} className="p-3 font-semibold text-slate-600">{col.label}</th>)}
                            <th className="p-3 font-semibold text-slate-600">{t('admin.crud.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {data.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                {columns.map(col => <td key={col.key} className="p-3 text-slate-600">{col.render ? col.render(item) : item[col.key]}</td>)}
                                <td className="p-3 space-x-2 space-x-reverse">
                                    <button onClick={() => handleEdit(item, type, subType)} className="text-press-blue hover:underline p-1"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(item.id, type, subType)} className="text-red-600 hover:underline p-1"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
    const TeamManager: React.FC = () => {
        const [teamTab, setTeamTab] = useState('work_team');
        const teamColumns = [ { key: 'name', label: t('admin.crud.name')}, { key: 'title', label: t('admin.crud.title_ar') }, {key: 'email', label: t('admin.crud.email')} ];
        return (
            <div className="space-y-6">
                 <div className="border-b border-gray-200">
                     <nav className="-mb-px flex space-x-4 space-x-reverse" aria-label="Tabs">
                        <button type="button" onClick={() => setTeamTab('work_team')} className={`${teamTab === 'work_team' ? 'border-press-blue text-press-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                            {t('admin.team.work_team')}
                        </button>
                        <button type="button" onClick={() => setTeamTab('admin_board')} className={`${teamTab === 'admin_board' ? 'border-press-blue text-press-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                            {t('admin.team.admin_board')}
                        </button>
                         <button type="button" onClick={() => setTeamTab('advisory_board')} className={`${teamTab === 'advisory_board' ? 'border-press-blue text-press-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                            {t('admin.team.advisory_board')}
                        </button>
                    </nav>
                </div>
                {teamTab === 'work_team' && <CrudView title={t('admin.team.work_team')} data={workTeam} columns={teamColumns} type="team" subType="work_team" />}
                {teamTab === 'admin_board' && <CrudView title={t('admin.team.admin_board')} data={adminBoard} columns={teamColumns} type="team" subType="admin_board" />}
                {teamTab === 'advisory_board' && <CrudView title={t('admin.team.advisory_board')} data={advisoryBoard} columns={teamColumns} type="team" subType="advisory_board" />}
            </div>
        )
    }

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard': return <DashboardHome t={t} users={users} />;
            case 'pages': return <AdminPageEditor t={t} pages={pages} setPages={setPages} menuItems={menuItems} setMenuItems={setMenuItems} onEditBlock={handleEditBlock} />;
            case 'slider': return <CrudView title={t('admin.nav.slider')} data={slides} columns={[{key: 'title', label: 'العنوان'}, {key: 'description', label: 'الوصف'}]} type="slider" />;
            case 'team': return <TeamManager />;
            case 'violations': return <CrudView title={t('admin.nav.violations')} data={violations} columns={[{key: 'title', label: 'العنوان'}, {key: 'governorate', label: 'المحافظة'}, {key: 'date', label: 'التاريخ'}]} type="violations" />;
            case 'reports': return <CrudView title={t('admin.nav.reports')} data={reports} columns={[{key: 'title', label: 'العنوان'}, {key: 'category', label: 'التصنيف'}, {key: 'date', label: 'التاريخ'}]} type="reports" />;
            case 'news': return <CrudView title={t('admin.nav.news')} data={news} columns={[{key: 'title', label: 'العنوان'}, {key: 'category', label: 'التصنيف'}, {key: 'date', label: 'التاريخ'}]} type="news" />;
            case 'projects': return <CrudView title={t('admin.nav.projects')} data={projects} columns={[{key: 'title', label: 'العنوان'}, {key: 'status', label: 'الحالة'}]} type="projects" />;
            case 'events': return <CrudView title={t('admin.nav.events')} data={events} columns={[{key: 'title', label: 'العنوان'}, {key: 'location', label: 'الموقع'}, {key: 'date', label: 'التاريخ'}]} type="events" />;
            case 'training': return <CrudView title={t('admin.nav.training')} data={training} columns={[{key: 'title', label: 'العنوان'}, {key: 'instructor', label: 'المدرب'}, {key: 'status', label: 'الحالة'}]} type="training" />;
            case 'get_involved': return <CrudView title={t('admin.nav.get_involved')} data={jobPostings} columns={[{key: 'title', label: 'العنوان'}, {key: 'type', label: 'النوع'}, {key: 'status', label: 'الحالة'}]} type="get_involved" />;
            case 'users': return <CrudView title={t('admin.nav.users')} data={users} columns={[{key: 'name', label: t('admin.crud.name')}, {key: 'email', label: t('admin.crud.email')}, {key: 'role', label: t('admin.crud.role')}]} type="users" />;
            case 'mailing_list': return <AdminMailingList t={t} subscribers={subscribers} />;
            case 'settings': return <AdminSettings t={t} settings={siteSettings} onSave={setSiteSettings} />;
            default: return <div className="bg-white p-6 rounded-lg shadow-sm"><h3 className="font-bold text-xl">Coming Soon</h3><p>This section is under construction.</p></div>;
        }
    };

    const themeColors: { [key: string]: { bg: string, hover: string, text: string, border: string } } = {
        blue: { bg: "bg-blue-900", hover: "hover:bg-blue-800", text: "text-blue-500", border: "border-blue-500" },
        slate: { bg: "bg-slate-800", hover: "hover:bg-slate-700", text: "text-slate-500", border: "border-slate-500" },
        red: { bg: "bg-red-900", hover: "hover:bg-red-800", text: "text-red-500", border: "border-red-500" },
    };
    const currentTheme = themeColors[siteSettings.themeColor] || themeColors.blue;

    return (
        <div className="min-h-screen bg-slate-100 flex flex-row-reverse">
            <AdminSidebar 
                activePage={activePage} 
                setActivePage={setActivePage}
                t={t}
                siteSettings={siteSettings}
                theme={currentTheme}
            />

            <div className="flex-1 flex flex-col">
                 <header className="bg-white shadow-sm p-4 flex justify-end items-center">
                     <div className="flex items-center gap-4">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Admin" className="w-9 h-9 rounded-full"/>
                    </div>
                </header>
                <main className="flex-1 p-8 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
            
            {isModalOpen && modalType && (
                <AdminModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    item={currentItem}
                    fields={getFieldsForType(modalType.type, modalType.subType)}
                    t={t}
                    title={currentItem ? t('admin.crud.edit_item') : t('admin.crud.add_item')}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
