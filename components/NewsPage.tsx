import React from 'react';
import { ICONS, MOCK_NEWS_ARTICLES } from '../constants';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { NewsArticle } from '../types';
import ShareButtons from './ShareButtons';

const NewsPage: React.FC<{}> = () => {
    const t = useTranslation();

    const NewsCard: React.FC<{ article: NewsArticle, index: number }> = ({ article, index }) => {
        const title = article.title;
        const summary = article.summary;

        return (
            <motion.div
                key={article.id}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                {article.videoUrl ? (
                     <div className="aspect-video bg-black">
                        <iframe 
                            src={article.videoUrl} 
                            title={title} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                ) : (
                    <div className="h-56 overflow-hidden">
                        <img
                            src={article.imageUrl}
                            alt={title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-press-blue bg-press-blue/10 px-3 py-1 rounded-full">{article.category}</span>
                        <span className="text-xs text-slate-500">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex-grow">{title}</h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">{summary}</p>
                    <div className="mt-auto flex items-center justify-between gap-4">
                        <a href="#" className="text-sm font-bold text-press-blue hover:underline">
                            {t('news.read_more')} &rarr;
                        </a>
                        <ShareButtons title={title} url="#" />
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="space-y-12">
            <header className="text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                  <ICONS.News className="w-16 h-16 mx-auto text-press-yellow mb-4" />
                  <h1 className="text-4xl font-extrabold text-slate-800">{t('page.news.title')}</h1>
                  <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-600">
                      {t('page.news.desc')}
                  </p>
                </motion.div>
            </header>

            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_NEWS_ARTICLES.map((article, index) => (
                        <NewsCard key={article.id} article={article} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default NewsPage;