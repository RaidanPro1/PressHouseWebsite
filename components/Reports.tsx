import React, { useEffect, useState, useMemo } from 'react';
import { ICONS } from '../constants';
import { MockApiService } from '../services/mockBackend';
import { Report } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { motion } from 'framer-motion';
import ShareButtons from './ShareButtons';

const Reports: React.FC<{}> = () => {
    const t = useTranslation();
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        MockApiService.getReports().then(data => setReports(data as Report[]));
    }, []);

    const categories = useMemo(() => {
        const allCategories = reports
            .map(r => r.category)
            .filter((c): c is string => !!c);
        return ['all', ...Array.from(new Set(allCategories))];
    }, [reports]);

    const filteredReports = useMemo(() => {
        if (selectedCategory === 'all') {
            return reports;
        }
        return reports.filter(report => report.category === selectedCategory);
    }, [reports, selectedCategory]);
    
    const categoryTranslations: { [key: string]: string } = {
        all: t('reports.category.all'),
        سنوي: t('reports.category.annual'),
        نوعي: t('reports.category.thematic'),
        استقصائي: t('reports.category.investigative')
    };

    const ReportCard: React.FC<{ report: Report, index: number }> = ({ report, index }) => {
        const title = report.title;
        const summary = report.summary;

        return (
            <motion.div 
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-slate-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
                {report.videoUrl ? (
                    <div className="aspect-video">
                        <iframe 
                            src={report.videoUrl} 
                            title={title} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                ) : (
                    <div className="h-56 overflow-hidden">
                      <img src={report.imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-4">
                        {report.category && (
                            <span className="bg-press-yellow text-press-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm">{categoryTranslations[report.category] || report.category}</span>
                        )}
                        <span className="text-xs text-slate-500">{report.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                        {summary}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-4">
                        <a 
                            href={report.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-white bg-press-blue font-bold hover:bg-slate-800 text-sm group px-6 py-3 rounded-lg transition-colors flex-grow"
                        >
                            {t('reports.download_pdf')}
                            <ICONS.Upload className="w-4 h-4" />
                        </a>
                        <ShareButtons title={title} url="#" />
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h2 className="text-4xl font-extrabold text-slate-800">{t('page.reports.title')}</h2>
                    <p className="text-slate-500 mt-2 text-lg">{t('page.reports.desc')}</p>
                </div>
                {categories.length > 2 && (
                    <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-full">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all ${
                                    selectedCategory === category
                                        ? 'bg-white text-press-blue shadow'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                {categoryTranslations[category] || category}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredReports.map((report, index) => (
                    <ReportCard key={report.id} report={report} index={index} />
                ))}
            </div>
            {filteredReports.length === 0 && (
                <div className="text-center py-20 text-slate-500 bg-slate-100/80 rounded-2xl">
                    <p>{t('reports.no_reports')}</p>
                </div>
            )}
        </div>
    );
};

export default Reports;