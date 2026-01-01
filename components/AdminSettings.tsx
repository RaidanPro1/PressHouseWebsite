import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Save, Upload } from 'lucide-react';
import { SiteSettings } from './AdminDashboard';

interface AdminSettingsProps {
    t: (key: any) => string;
    settings: SiteSettings;
    onSave: (newSettings: SiteSettings) => void;
}

const THEME_OPTIONS = [
    { label: 'الأزرق (افتراضي)', value: 'blue', color: 'bg-blue-600' },
    { label: 'الرمادي الداكن', value: 'slate', color: 'bg-slate-600' },
    { label: 'الأحمر', value: 'red', color: 'bg-red-600' },
];

const AdminSettings: React.FC<AdminSettingsProps> = ({ t, settings, onSave }) => {
    const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
    const [activeTab, setActiveTab] = useState('general');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocalSettings({ ...localSettings, [e.target.name]: e.target.value });
    };

    const handleThemeChange = (color: string) => {
        setLocalSettings({ ...localSettings, themeColor: color });
    };
    
    const handleLogoTypeChange = (type: 'text' | 'image') => {
        setLocalSettings({ ...localSettings, logoType: type });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setLocalSettings({ ...localSettings, siteLogoUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(localSettings);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">{t('admin.settings.title')}</h2>
                <p className="text-slate-500 mt-1">{t('admin.settings.desc')}</p>
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 space-x-reverse" aria-label="Tabs">
                    <button type="button" onClick={() => setActiveTab('general')} className={`${activeTab === 'general' ? 'border-press-blue text-press-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                        الإعدادات العامة
                    </button>
                    <button type="button" onClick={() => setActiveTab('seo')} className={`${activeTab === 'seo' ? 'border-press-blue text-press-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                        {t('admin.settings.seo_settings')}
                    </button>
                </nav>
            </div>
            
            {activeTab === 'general' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-700 border-b pb-3 mb-4">{t('admin.settings.site_identity')}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">{t('admin.settings.logo_type')}</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="logoType" value="text" checked={localSettings.logoType === 'text'} onChange={() => handleLogoTypeChange('text')} className="focus:ring-press-blue h-4 w-4 text-press-blue border-gray-300" />
                                        {t('admin.settings.logo_type_text')}
                                    </label>
                                     <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="logoType" value="image" checked={localSettings.logoType === 'image'} onChange={() => handleLogoTypeChange('image')} className="focus:ring-press-blue h-4 w-4 text-press-blue border-gray-300" />
                                        {t('admin.settings.logo_type_image')}
                                    </label>
                                </div>
                            </div>
                            {localSettings.logoType === 'text' ? (
                                <div>
                                    <label htmlFor="textLogo" className="block text-sm font-medium text-slate-600 mb-1">{t('admin.settings.text_logo')}</label>
                                    <input type="text" name="textLogo" value={localSettings.textLogo} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">{t('admin.settings.site_logo')}</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center border">
                                            {localSettings.siteLogoUrl ? <img src={localSettings.siteLogoUrl} alt="Logo preview" className="max-w-full max-h-full" /> : <span className="text-xs text-slate-400">معاينة</span>}
                                        </div>
                                        <label className="cursor-pointer bg-white border border-slate-300 rounded-md px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            {t('admin.crud.upload_from_device')}
                                            <input type="file" className="hidden" accept="image/png, image/jpeg, image/svg+xml" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                </div>
                            )}
                             <div>
                                <label htmlFor="faviconUrl" className="block text-sm font-medium text-slate-600 mb-1">{t('admin.settings.favicon_url')}</label>
                                <input type="text" name="faviconUrl" value={localSettings.faviconUrl} onChange={handleChange} placeholder="https://example.com/favicon.ico" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                         <h3 className="text-lg font-semibold text-slate-700 border-b pb-3 mb-4">{t('admin.settings.theme')}</h3>
                         <div>
                            <label className="block text-sm font-medium text-slate-600 mb-2">{t('admin.settings.theme_color')}</label>
                            <div className="flex items-center gap-4">
                                {THEME_OPTIONS.map(theme => (
                                     <button key={theme.value} type="button" onClick={() => handleThemeChange(theme.value)} className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${localSettings.themeColor === theme.value ? 'border-press-blue' : 'border-transparent hover:bg-slate-50'}`}>
                                        <span className={`w-6 h-6 rounded-full ${theme.color}`}></span>
                                        <span className="text-sm font-medium">{theme.label}</span>
                                     </button>
                                ))}
                            </div>
                         </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'seo' && (
                 <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                     <h3 className="text-lg font-semibold text-slate-700 border-b pb-3 mb-4">{t('admin.settings.seo_settings')}</h3>
                     <div>
                        <label htmlFor="seoTitle" className="block text-sm font-medium text-slate-600 mb-1">{t('admin.settings.seo_title')}</label>
                        <input type="text" name="seoTitle" value={localSettings.seoTitle} onChange={handleChange} placeholder={t('admin.settings.seo_title_placeholder')} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                     </div>
                      <div>
                        <label htmlFor="seoDescription" className="block text-sm font-medium text-slate-600 mb-1">{t('admin.settings.seo_description')}</label>
                        <textarea name="seoDescription" value={localSettings.seoDescription} onChange={handleChange} rows={3} placeholder={t('admin.settings.seo_desc_placeholder')} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                     </div>
                      <div>
                        <label htmlFor="seoKeywords" className="block text-sm font-medium text-slate-600 mb-1">{t('admin.settings.seo_keywords')}</label>
                        <input type="text" name="seoKeywords" value={localSettings.seoKeywords} onChange={handleChange} placeholder={t('admin.settings.seo_keywords_placeholder')} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm" />
                         <p className="text-xs text-gray-500 mt-1">افصل بين الكلمات بفاصلة (,)</p>
                     </div>
                 </div>
            )}
            
            <div className="flex justify-end items-center gap-4 pt-4">
                {saveStatus === 'saved' && <p className="text-sm text-green-600">{t('admin.settings.changes_saved')}</p>}
                <button type="submit" className="bg-press-blue text-white font-semibold px-6 py-2.5 rounded-lg shadow hover:bg-blue-900 flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {t('admin.settings.save_changes')}
                </button>
            </div>
        </form>
    );
};

export default AdminSettings;
