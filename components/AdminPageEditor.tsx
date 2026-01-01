import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Save, Edit, GripVertical, Copy, PlusCircle, ArrowLeft } from 'lucide-react';
import { Page, PageBlock, MenuItem } from '../types';
import { motion, Reorder } from 'framer-motion';

// This is a simplified simulation of a Visual Block Editor.
// In a real app, this would be much more complex.

const VisualPageBuilder: React.FC<{ 
    page: Page; 
    onBack: () => void;
    onEditBlock: (block: PageBlock) => void;
    t: (key: any) => string;
}> = ({ page, onBack, onEditBlock, t }) => {
    
    return (
        <div className="space-y-4">
             <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-press-blue">
                <ArrowLeft className="w-4 h-4" />
                {t('admin.pages.back_to_pages')}
            </button>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 border-b pb-3 mb-6">{t('admin.pages.visual_editor')}: {page.name}</h3>
                <div className="space-y-6">
                    <p className="text-sm text-slate-500">{t('admin.pages.page_content_blocks')}</p>
                    {page.blocks.map(block => (
                         <div key={block.id} className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 relative">
                             <div className="flex justify-between items-center">
                                 <span className="font-semibold text-slate-700">{block.title}</span>
                                 <button onClick={() => onEditBlock(block)} className="flex items-center gap-2 text-sm bg-white border border-slate-300 px-3 py-1.5 rounded-md hover:bg-slate-100">
                                     <Edit className="w-3 h-3" />
                                     {t('admin.pages.edit_block')}
                                 </button>
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MenuManager: React.FC<{ 
    menuItems: MenuItem[]; 
    setMenuItems: (items: MenuItem[]) => void;
    t: (key: any) => string;
}> = ({ menuItems, setMenuItems, t }) => {
    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-600">{t('admin.pages.drag_to_reorder')}</p>
            <Reorder.Group axis="y" values={menuItems} onReorder={setMenuItems}>
                <div className="border rounded-lg bg-slate-50">
                    {menuItems.map((item) => (
                        <Reorder.Item key={item.id} value={item}>
                            <div className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-slate-100 cursor-grab active:cursor-grabbing">
                                <div className="flex items-center gap-3">
                                    <GripVertical className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium text-slate-800">{item.label}</span>
                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </div>
            </Reorder.Group>
        </div>
    );
}

const AdminPageEditor: React.FC<{ 
    t: (key: any) => string;
    pages: Page[]; 
    setPages: (pages: Page[]) => void;
    menuItems: MenuItem[];
    setMenuItems: (items: MenuItem[]) => void;
    onEditBlock: (pageId: string, block: PageBlock) => void;
}> = ({ t, pages, setPages, menuItems, setMenuItems, onEditBlock }) => {
    const [activeTab, setActiveTab] = useState('pages');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
    const [editingPage, setEditingPage] = useState<Page | null>(null);

    const handleSave = () => {
        setSaveStatus('saved');
        // Here you would send the updated `pages` and `menuItems` state to the backend
        setTimeout(() => setSaveStatus('idle'), 2000);
    };
    
    const handleSelectPageToEdit = (page: Page) => {
        setEditingPage(page);
    };

    if (editingPage) {
        return <VisualPageBuilder 
                    page={editingPage} 
                    onBack={() => setEditingPage(null)}
                    onEditBlock={(block) => onEditBlock(editingPage.id, block)}
                    t={t} 
                />
    }

    const renderPagesManager = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <p className="text-sm text-slate-600">تحكم في صفحات الموقع الحالية أو أنشئ صفحات جديدة.</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    {t('admin.pages.new_page')}
                </button>
            </div>
            <div className="border rounded-lg bg-slate-50">
                {pages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-slate-100">
                        <div className="flex flex-col">
                            <span className="font-medium text-slate-800">{page.name}</span>
                            <span className="text-xs text-slate-500">{page.path}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleSelectPageToEdit(page)} title={t('admin.pages.edit_page')} className="p-2 text-slate-500 hover:text-press-blue hover:bg-blue-100 rounded-md"><Edit className="w-4 h-4" /></button>
                            <button title={t('admin.pages.copy_components')} className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-100 rounded-md"><Copy className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{t('admin.pages.title')}</h2>
                    <p className="text-slate-500 mt-1">{t('admin.pages.desc')}</p>
                </div>
                <div className="flex items-center gap-4">
                    {saveStatus === 'saved' && <p className="text-sm text-green-600">{t('admin.settings.changes_saved')}</p>}
                    <button onClick={handleSave} className="bg-press-blue text-white font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-blue-900 flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        {t('admin.settings.save_changes')}
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-200">
                 <nav className="-mb-px flex space-x-4 space-x-reverse" aria-label="Tabs">
                    <button type="button" onClick={() => setActiveTab('pages')} className={`${activeTab === 'pages' ? 'border-press-blue text-press-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                        {t('admin.pages.manage_pages')}
                    </button>
                    <button type="button" onClick={() => setActiveTab('menus')} className={`${activeTab === 'menus' ? 'border-press-blue text-press-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                         {t('admin.pages.manage_menus')}
                    </button>
                </nav>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                {activeTab === 'pages' ? renderPagesManager() : <MenuManager menuItems={menuItems} setMenuItems={setMenuItems} t={t} />}
            </div>
        </div>
    );
};

export default AdminPageEditor;