import React from 'react';
import { ICONS, MOCK_TEAM_MEMBERS } from '../constants';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { TeamMember } from '../types';

const TeamPage: React.FC<{}> = () => {
    const t = useTranslation();

    const TeamCard: React.FC<{ member: TeamMember, index: number }> = ({ member, index }) => {
        const name = member.name;
        const title = member.title;

        return (
            <motion.div
                className="text-center bg-white p-6 rounded-lg shadow-md border"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
            >
                <img 
                    src={member.imageUrl} 
                    alt={name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-100 object-cover"
                />
                <h3 className="text-lg font-bold text-press-blue">{name}</h3>
                <p className="text-sm text-gray-600">{title}</p>
            </motion.div>
        );
    };

    return (
        <div className="space-y-12">
            <header className="text-center animate-fade-in">
                <ICONS.Users className="w-16 h-16 mx-auto text-press-yellow mb-4" />
                <h1 className="text-4xl font-extrabold text-press-blue">{t('page.team.title')}</h1>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                    {t('page.team.desc')}
                </p>
            </header>

            <section>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {MOCK_TEAM_MEMBERS.map((member, index) => (
                        <TeamCard key={member.id} member={member} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TeamPage;