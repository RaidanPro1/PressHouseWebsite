import React from 'react';
import { ICONS, MOCK_TEAM_MEMBERS, MOCK_ADMINISTRATIVE_BOARD, MOCK_ADVISORY_BOARD } from '../constants';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { TeamMember } from '../types';

const AboutUsPage: React.FC<{}> = () => {
    const t = useTranslation();

    const GoalCard: React.FC<{ icon: React.ElementType, title: string, description: string, delay: number }> = ({ icon: Icon, title, description, delay }) => (
        <motion.div 
            className="bg-white p-6 rounded-lg shadow-md border text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="mx-auto bg-press-blue/10 p-4 rounded-full w-fit mb-4">
                <Icon className="w-8 h-8 text-press-blue" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        </motion.div>
    );

    const MemberCard: React.FC<{ member: TeamMember, index: number }> = ({ member, index }) => (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <img 
                src={member.imageUrl} 
                alt={member.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
            />
            <h3 className="text-md font-bold text-press-blue">{member.name}</h3>
            <p className="text-xs text-slate-500">{member.title}</p>
        </motion.div>
    );

    return (
        <div className="space-y-16">
            <header className="text-center animate-fade-in">
                <ICONS.About className="w-16 h-16 mx-auto text-press-yellow mb-4" />
                <h1 className="text-4xl font-extrabold text-press-blue">{t('page.about.title')}</h1>
                <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-600">
                    {t('page.about.desc')}
                </p>
            </header>

            <section id="who-we-are" className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <img src="https://images.unsplash.com/photo-1573496774439-c9a7b3db25c3?q=80&w=2070&auto=format&fit=crop" alt="Press House Team" className="rounded-xl shadow-2xl w-full h-full object-cover"/>
                </motion.div>
                 <motion.div className="space-y-4" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
                    <h2 className="text-3xl font-bold text-slate-800 border-r-4 border-press-yellow pr-4">{t('about.who_we_are_title')}</h2>
                    <p className="text-slate-600 leading-relaxed">{t('about.who_we_are_p1')}</p>
                    <p className="text-slate-600 leading-relaxed">{t('about.who_we_are_p2')}</p>
                 </motion.div>
            </section>
            
            <section id="our-goals">
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">{t('about.our_goals_title')}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                   {/* FIX: Corrected translation keys for GoalCard titles. */}
                   <GoalCard icon={ICONS.Observatory} title={t('about.goal1.title')} description={t('about.goal1.desc')} delay={0.1} />
                   <GoalCard icon={ICONS.FactCheck} title={t('about.goal2.title')} description={t('about.goal2.desc')} delay={0.2} />
                   <GoalCard icon={ICONS.CapacityBuilding} title={t('about.goal3.title')} description={t('about.goal3.desc')} delay={0.3} />
                </div>
            </section>
            
            <section id="boards">
                <div className="space-y-12">
                     <div>
                        <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">{t('about.administrative_board_title')}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {MOCK_ADMINISTRATIVE_BOARD.map((member, index) => <MemberCard key={member.id} member={member} index={index} />)}
                        </div>
                     </div>
                     <div>
                        <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">{t('about.advisory_board_title')}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {MOCK_ADVISORY_BOARD.map((member, index) => <MemberCard key={member.id} member={member} index={index} />)}
                        </div>
                     </div>
                </div>
            </section>
            
            <section id="team">
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">{t('page.team.title')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* FIX: Corrected typo from MOCK_TEAM_ MEMBERS to MOCK_TEAM_MEMBERS. */}
                    {MOCK_TEAM_MEMBERS.map((member, index) => <MemberCard key={member.id} member={member} index={index} />)}
                </div>
            </section>

        </div>
    );
};

export default AboutUsPage;