import React from 'react';
import { ICONS, MOCK_PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { Project } from '../types';

const ProjectsPage: React.FC<{}> = () => {
    const t = useTranslation();

    const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
        const title = project.title;
        const summary = project.summary;

        return (
            <motion.div 
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative h-56">
                    <img src={project.imageUrl} alt={title} className="w-full h-full object-cover" />
                    <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white rounded-full ${project.status === 'ongoing' ? 'bg-green-600' : 'bg-gray-700'}`}>
                        {project.status === 'ongoing' ? 'مشروع جاري' : 'مشروع مكتمل'}
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{summary}</p>
                    {project.donorLogoUrl && (
                        <div className="mt-auto border-t pt-4">
                            <span className="text-xs text-gray-500 font-semibold">بدعم من:</span>
                            <img src={project.donorLogoUrl} alt="Donor" className="h-8 mt-2" />
                        </div>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="space-y-12">
            <header className="text-center animate-fade-in">
                <ICONS.Projects className="w-16 h-16 mx-auto text-press-yellow mb-4" />
                <h1 className="text-4xl font-extrabold text-press-blue">{t('page.projects.title')}</h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                    {t('page.projects.desc')}
                </p>
            </header>

            <section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_PROJECTS.map(project => <ProjectCard key={project.id} project={project} />)}
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;