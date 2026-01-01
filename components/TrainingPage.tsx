import React from 'react';
import { ICONS, MOCK_TRAINING_COURSES } from '../constants';
import { TrainingCourse } from '../types';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const CourseCard: React.FC<{ course: TrainingCourse }> = ({ course }) => {
    const title = course.title;
    const description = course.description;

    return (
        <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative h-48">
                <img src={course.image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold text-white rounded-full ${course.status === 'upcoming' ? 'bg-press-blue' : 'bg-gray-700'}`}>
                    {course.status === 'upcoming' ? 'دورة قادمة' : 'دورة منتهية'}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
                <div className="text-xs text-gray-500 space-y-2 mb-4">
                    <div className="flex items-center gap-2"><ICONS.Calendar className="w-4 h-4 text-press-yellow"/> <span>التاريخ: {course.date}</span></div>
                    <div className="flex items-center gap-2"><ICONS.Clock className="w-4 h-4 text-press-yellow"/> <span>المدة: {course.duration}</span></div>
                    <div className="flex items-center gap-2"><ICONS.Users className="w-4 h-4 text-press-yellow"/> <span>المدرب: {course.instructor}</span></div>
                </div>
                {course.status === 'upcoming' ? (
                    <button className="w-full mt-auto bg-press-yellow text-press-blue font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors">
                        سجل الآن
                    </button>
                ) : (
                     <button disabled className="w-full mt-auto bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded-lg cursor-not-allowed">
                        مشاهدة التفاصيل
                    </button>
                )}
            </div>
        </motion.div>
    );
};

const TrainingPage: React.FC<{}> = () => {
    const t = useTranslation();
    const upcomingCourses = MOCK_TRAINING_COURSES.filter(c => c.status === 'upcoming');
    const completedCourses = MOCK_TRAINING_COURSES.filter(c => c.status === 'completed');

    return (
        <div className="space-y-12">
            <header className="text-center animate-fade-in">
                <ICONS.CapacityBuilding className="w-16 h-16 mx-auto text-press-yellow mb-4" />
                <h1 className="text-4xl font-extrabold text-press-blue">{t('page.training.title')}</h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                    {t('page.training.desc')}
                </p>
            </header>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-press-yellow pr-4">دوراتنا القادمة</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingCourses.map(course => <CourseCard key={course.id} course={course} />)}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-gray-400 pr-4">من دوراتنا السابقة</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {completedCourses.map(course => <CourseCard key={course.id} course={course} />)}
                </div>
            </section>
        </div>
    );
};

export default TrainingPage;