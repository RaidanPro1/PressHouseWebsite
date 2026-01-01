import React, { useState } from 'react';
import { ICONS } from '../constants';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const SKILLS = [
    'التحرير الصحفي', 'التصوير الفوتوغرافي', 'تصوير الفيديو والمونتاج', 'الترجمة (إنجليزي)', 'تصميم الجرافيك', 'إدارة المشاريع', 'التدريب والتيسير'
];

const VolunteerForm: React.FC<{ t: (key: any) => string }> = ({ t }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        skills: [] as string[],
        availability: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSkillToggle = (skill: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Volunteer Form Submitted:", formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <motion.div 
                className="text-center bg-white p-12 rounded-lg shadow-xl border"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <ICONS.Success className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-press-blue mb-2">شكراً لاهتمامك!</h2>
                <p className="text-gray-600">تم استلام طلبك بنجاح. سيقوم فريقنا بمراجعته والتواصل معك قريباً.</p>
            </motion.div>
        );
    }

    return (
        <motion.form 
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg border space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <fieldset className="space-y-4">
                <legend className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. المعلومات الشخصية</legend>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                        <input type="text" id="fullName" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-press-blue focus:border-press-blue" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                        <input type="email" id="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-press-blue focus:border-press-blue" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                    <input type="tel" id="phone" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-press-blue focus:border-press-blue" />
                </div>
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">2. المهارات والتوفر</legend>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">ما هي المهارات التي يمكنك المساهمة بها؟ (اختر ما يناسبك)</label>
                     <div className="flex flex-wrap gap-2">
                         {SKILLS.map(skill => (
                             <button
                                 type="button"
                                 key={skill}
                                 onClick={() => handleSkillToggle(skill)}
                                 className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                                     formData.skills.includes(skill)
                                         ? 'bg-press-blue text-white border-press-blue'
                                         : 'bg-white text-gray-700 hover:bg-gray-100'
                                 }`}
                             >
                                 {skill}
                             </button>
                         ))}
                     </div>
                </div>
                 <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">مدى التوفر</label>
                    <select id="availability" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-press-blue focus:border-press-blue bg-white">
                        <option value="">اختر الخيار المناسب</option>
                        <option value="full-time">دوام كامل</option>
                        <option value="part-time">دوام جزئي</option>
                        <option value="flexible">مرن (حسب الحاجة)</option>
                    </select>
                </div>
            </fieldset>
            
            <div className="pt-4 text-center">
                <button type="submit" className="bg-press-yellow text-press-blue font-bold px-10 py-3 rounded-lg hover:bg-yellow-400 transition-colors shadow-md">
                    إرسال طلب التطوع
                </button>
            </div>
        </motion.form>
    );
};

const GetInvolvedPage: React.FC<{}> = () => {
    const t = useTranslation();

    return (
        <div className="space-y-16">
            <header className="text-center animate-fade-in">
                <ICONS.Volunteer className="w-16 h-16 mx-auto text-press-yellow mb-4" />
                <h1 className="text-4xl font-extrabold text-press-blue">{t('page.get_involved.title')}</h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                    {t('page.get_involved.desc')}
                </p>
            </header>

            <section id="vacancies">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('get_involved.vacancies.title')}</h2>
                <div className="bg-white p-8 rounded-xl shadow-lg border text-center">
                    <ICONS.Careers className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">{t('get_involved.vacancies.desc')}</p>
                </div>
            </section>

            <section id="volunteer">
                 <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('get_involved.volunteer.title')}</h2>
                 <VolunteerForm t={t} />
            </section>
        </div>
    );
};

export default GetInvolvedPage;