import React from 'react';
import { ICONS, MOCK_EVENTS } from '../constants';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { Event } from '../types';
import ShareButtons from './ShareButtons';

const EventsPage: React.FC<{}> = () => {
    const t = useTranslation();

    const EventCard: React.FC<{ event: Event }> = ({ event }) => {
        const title = event.title;
        const description = event.description;

        return (
            <motion.div 
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row group border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="md:w-1/3">
                    <img src={event.imageUrl} alt={title} className="w-full h-48 md:h-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full self-start mb-3 ${event.type === 'event' ? 'bg-press-yellow text-press-blue' : 'bg-gray-200 text-gray-800'}`}>
                        {event.type === 'event' ? 'فعالية رئيسية' : 'نشاط'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
                    <div className="mt-auto border-t pt-4 space-y-2">
                         <div className="flex items-center gap-2 text-sm text-gray-600"><ICONS.Calendar className="w-4 h-4 text-press-blue"/> <span>{event.date} | {event.time}</span></div>
                         <div className="flex items-center gap-2 text-sm text-gray-600"><ICONS.Location className="w-4 h-4 text-press-blue"/> <span>{event.location}</span></div>
                         <div className="mt-4">
                            <ShareButtons title={title} url="#" />
                         </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="space-y-12">
            <header className="text-center animate-fade-in">
                <ICONS.Events className="w-16 h-16 mx-auto text-press-yellow mb-4" />
                <h1 className="text-4xl font-extrabold text-press-blue">{t('page.events.title')}</h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                    {t('page.events.desc')}
                </p>
            </header>

            <section className="space-y-8">
                {MOCK_EVENTS.map(event => <EventCard key={event.id} event={event} />)}
            </section>
        </div>
    );
};

export default EventsPage;