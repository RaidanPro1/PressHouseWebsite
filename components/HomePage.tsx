import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { 
    ICONS, 
    MOCK_VIOLATIONS, 
    MOCK_NEWS_ARTICLES, 
    MOCK_REPORTS,
    MOCK_PROJECTS,
    MOCK_PARTNERS,
    MOCK_SLIDES,
} from '../constants';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import AnimatedNumber from './AnimatedNumber';

interface HomePageProps {
    setActiveTab: (tab: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
    const t = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % MOCK_SLIDES.length);
        }, 7000); // Change slide every 7 seconds
        return () => clearTimeout(timer);
    }, [currentSlide]);
    
    const slide = MOCK_SLIDES[currentSlide];

    return (
        <div className="space-y-20 md:space-y-28">
            
            {/* Hero Section */}
            <section id="hero" className="relative w-screen -mx-4 sm:-mx-6 lg:-mx-8 h-[500px] md:h-[600px] bg-slate-800 text-white flex items-center justify-center text-center overflow-hidden">
                {MOCK_SLIDES.map((s, index) => (
                <motion.div
                    key={s.id}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${s.imageUrl}')` }}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0, scale: index === currentSlide ? 1 : 1.05 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                </motion.div>
                ))}

                <div className="relative z-10 p-4">
                <motion.h1
                    key={`${slide.id}-title`}
                    className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {slide.title}
                </motion.h1>
                <motion.p
                    key={`${slide.id}-desc`}
                    className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-8 drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {slide.description}
                </motion.p>
                <motion.div
                    key={`${slide.id}-buttons`}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {slide.button1Text && (
                    <button onClick={() => setActiveTab(slide.button1Link || '')} className="bg-press-yellow text-press-blue font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto">
                        {slide.button1Text}
                    </button>
                    )}
                    {slide.button2Text && (
                    <button onClick={() => setActiveTab(slide.button2Link || '')} className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-press-blue transition-colors w-full sm:w-auto">
                        {slide.button2Text}
                    </button>
                    )}
                </motion.div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {MOCK_SLIDES.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                    />
                ))}
                </div>
            </section>

            {/* Impact in Numbers */}
            <section id="impact-numbers" className="-mt-40 md:-mt-44 relative z-20">
                <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 border">
                    <h2 className="text-2xl font-bold text-press-blue text-center mb-6">{t('home.impact.title')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="p-2">
                            <AnimatedNumber value={MOCK_VIOLATIONS.length} className="text-3xl md:text-4xl font-bold text-slate-800" />
                            <p className="text-sm text-slate-500 mt-1">{t('home.impact.violations_documented')}</p>
                        </div>
                        <div className="p-2">
                            <AnimatedNumber value={150} className="text-3xl md:text-4xl font-bold text-slate-800" />
                            <p className="text-sm text-slate-500 mt-1">{t('home.impact.journalists_supported')}</p>
                        </div>
                        <div className="p-2">
                            <AnimatedNumber value={MOCK_REPORTS.length} className="text-3xl md:text-4xl font-bold text-slate-800" />
                            <p className="text-sm text-slate-500 mt-1">{t('home.impact.reports_published')}</p>
                        </div>
                        <div className="p-2">
                            <AnimatedNumber value={800} className="text-3xl md:text-4xl font-bold text-slate-800" />
                            <p className="text-sm text-slate-500 mt-1">{t('home.impact.training_hours')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Pillars */}
            <section id="our-pillars">
                 <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-press-blue">{t('home.our_pillars.title')}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div className="text-center p-8 bg-white rounded-xl shadow-lg border" whileHover={{ y: -5 }}>
                        <ICONS.Observatory className="w-12 h-12 text-press-yellow mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{t('home.our_pillars.monitoring.title')}</h3>
                        <p className="text-slate-600 text-sm">{t('home.our_pillars.monitoring.desc')}</p>
                    </motion.div>
                     <motion.div className="text-center p-8 bg-white rounded-xl shadow-lg border" whileHover={{ y: -5 }}>
                        <ICONS.Panic className="w-12 h-12 text-press-yellow mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{t('home.our_pillars.support.title')}</h3>
                        <p className="text-slate-600 text-sm">{t('home.our_pillars.support.desc')}</p>
                    </motion.div>
                     <motion.div className="text-center p-8 bg-white rounded-xl shadow-lg border" whileHover={{ y: -5 }}>
                        <ICONS.CapacityBuilding className="w-12 h-12 text-press-yellow mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{t('home.our_pillars.capacity.title')}</h3>
                        <p className="text-slate-600 text-sm">{t('home.our_pillars.capacity.desc')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Latest News */}
            <section id="latest-news">
                <h2 className="text-3xl font-bold text-press-blue text-center mb-8">{t('home.latest_news')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MOCK_NEWS_ARTICLES.slice(0, 3).map((article, index) => (
                        <motion.div 
                          key={article.id} 
                          className="bg-white rounded-xl shadow-lg border overflow-hidden flex flex-col group" 
                          initial={{ opacity: 0, y: 20 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          viewport={{ once: true }} 
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                           <div className="h-48 overflow-hidden"><img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/></div>
                           <div className="p-5 flex flex-col flex-grow">
                                <span className="text-xs text-slate-500 mb-2">{article.date}</span>
                               <h3 className="text-md font-bold text-slate-900 mb-3 flex-grow line-clamp-2">{article.title}</h3>
                               <a href="#" onClick={() => setActiveTab('news')} className="mt-auto text-sm font-bold text-press-blue hover:underline">اقرأ المزيد &rarr;</a>
                           </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            
            {/* Call to Action */}
            <section id="cta" className="bg-press-blue text-white rounded-2xl p-10 md:p-16">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">{t('home.cta.title')}</h2>
                    <p className="text-blue-200 mb-8">{t('home.cta.desc')}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => setActiveTab('get_involved')} className="bg-press-yellow text-press-blue font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto">
                            {t('home.cta.button_volunteer')}
                        </button>
                         <button className="bg-white/10 border-2 border-white/20 text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-press-blue transition-colors w-full sm:w-auto">
                            {t('home.cta.button_donate')}
                        </button>
                    </div>
                </div>
            </section>

             {/* Partners */}
            <section id="partners">
                <h2 className="text-2xl font-bold text-center text-slate-700 mb-8">{t('home.partners.title')}</h2>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                    {MOCK_PARTNERS.map(partner => (
                        <img key={partner.name} src={partner.logo} alt={partner.name} className="h-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" title={partner.name} />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default HomePage;