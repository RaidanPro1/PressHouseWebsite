import React, { useState, useEffect } from 'react';
import { X, Save, Bold, Italic, Link, List, Upload } from 'lucide-react';

export interface Field {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'richtext' | 'select' | 'date' | 'email' | 'separator' | 'number' | 'uploader';
    options?: string[];
}

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: any) => void;
    item: any | null;
    fields: Field[];
    t: (key: any) => string;
    title: string;
}

const RichTextEditor: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; }> = ({ value, onChange }) => (
    <div className="border border-gray-300 rounded-md">
        <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600"><Bold className="w-4 h-4"/></button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600"><Italic className="w-4 h-4"/></button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600"><Link className="w-4 h-4"/></button>
            <button type="button" className="p-1.5 rounded hover:bg-gray-200 text-gray-600"><List className="w-4 h-4"/></button>
        </div>
        <textarea
            value={value}
            onChange={onChange}
            rows={8}
            className="w-full p-2 focus:outline-none"
        />
    </div>
);

const Uploader: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; t: (key: any) => string; }> = ({ value, onChange, t }) => (
    <div className="flex items-center gap-4">
         <input type="text" value={value} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-press-blue focus:border-press-blue" />
         <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 flex-shrink-0 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            {t('admin.crud.upload_from_device')}
        </button>
    </div>
);


const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSave, item, fields, t, title }) => {
    const [formData, setFormData] = useState<any>({});
    
    // Helper to get nested property
    const getNestedValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj);
    
    // Helper to set nested property
    const setNestedValue = (obj: any, path: string, value: any) => {
        const keys = path.split('.');
        keys.reduce((acc, key, i) => {
            if (i === keys.length - 1) {
                acc[key] = value;
            } else {
                if (!acc[key]) acc[key] = {};
            }
            return acc[key];
        }, obj);
        return { ...obj };
    };

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            const emptyForm: { [key: string]: any } = {};
            fields.forEach(field => {
                if(field.type !== 'separator') {
                    setNestedValue(emptyForm, field.name, '');
                }
            });
            setFormData(emptyForm);
        }
    }, [item, fields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => setNestedValue(prev, name, value));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <header className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </header>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    {fields.map(field => {
                        if (field.type === 'separator') {
                            return (
                                <div key={field.name} className="pt-4">
                                    <div className="border-t border-gray-200"></div>
                                    <h3 className="text-md font-semibold text-gray-600 mt-4">{field.label}</h3>
                                </div>
                            )
                        }
                        const value = getNestedValue(formData, field.name) || '';
                        return (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea id={field.name} name={field.name} value={value} onChange={handleChange} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-press-blue focus:border-press-blue" />
                                ) : field.type === 'richtext' ? (
                                    <RichTextEditor value={value} onChange={(e) => handleChange({ ...e, target: { ...e.target, name: field.name, value: e.target.value }})} />
                                ) : field.type === 'select' ? (
                                    <select id={field.name} name={field.name} value={value} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-press-blue focus:border-press-blue bg-white">
                                        <option value="">-- اختر --</option>
                                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                ) : field.type === 'uploader' ? (
                                    <Uploader value={value} onChange={handleChange} t={t} />
                                ) : (
                                    <input type={field.type} id={field.name} name={field.name} value={value} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-press-blue focus:border-press-blue" />
                                )}
                            </div>
                        )
                    })}
                </form>
                <footer className="flex justify-end items-center p-4 border-t bg-gray-50 space-x-2 space-x-reverse">
                    <button onClick={onClose} type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        {t('admin.crud.cancel')}
                    </button>
                    <button onClick={handleSubmit} type="submit" className="px-6 py-2 text-sm font-medium text-white bg-press-blue border border-transparent rounded-md shadow-sm hover:bg-blue-900 flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        {t('admin.crud.save')}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AdminModal;