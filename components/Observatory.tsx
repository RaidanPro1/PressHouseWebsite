import React, { useState, useEffect, useMemo } from 'react';
import { MockApiService } from '../services/mockBackend';
import { useTranslation } from '../hooks/useTranslation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell, RadialBarChart, RadialBar, PieChart, Pie } from 'recharts';
// FIX: Import ObservatoryConfig to define component props
import { Violation, Governorate, ViolationType, ObservatoryConfig } from '../types';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';


const MostDangerousGovernorates: React.FC<{ violations: Violation[], t: (key: any) => string }> = ({ violations, t }) => {
    const topGovernorates = useMemo(() => {
        const severityScore = { 'خطير جداً': 4, 'عالي': 3, 'متوسط': 2, 'منخفض': 1 };
        
        const scores = violations.reduce((acc, v) => {
            const governorate = v.governorate;
            const score = severityScore[v.severity as keyof typeof severityScore] || 0;
            acc[governorate] = (acc[governorate] || 0) + score;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(scores)
            .sort(([, scoreA], [, scoreB]) => Number(scoreB) - Number(scoreA))
            .slice(0, 5);

    }, [violations]);

    const maxScore = topGovernorates[0]?.[1] || 1;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg h-full border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{t('observatory.top_governorates')}</h3>
            <ul className="space-y-4">
                {topGovernorates.map(([name, score]: [string, number], index) => (
                    <li key={name}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-700 text-sm">{name}</span>
                            <span className="text-sm font-bold text-red-700">{score} {t('observatory.points')}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <motion.div 
                                className="bg-red-500 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(score / maxScore) * 100}%` }}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// FIX: Add config prop to component signature to resolve error in App.tsx
const Observatory: React.FC<{ config: ObservatoryConfig }> = ({ config }) => {
  const t = useTranslation();
  const [violations, setViolations] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const data = await MockApiService.getViolations();
        setViolations(data as Violation[]);
        setLoading(false);
    };
    fetchData();
  }, []);

  const stats = useMemo(() => [
    { label: t('observatory.total_violations'), value: violations.length },
    { label: t('observatory.high_risk_cases'), value: violations.filter(v => v.severity === 'خطير جداً' || v.severity === 'عالي').length },
    { label: t('observatory.total_victims'), value: violations.reduce((acc, curr) => acc + curr.victimCount, 0) },
  ], [violations, t]);
  
  const violationsByTypeData = useMemo(() => {
    const typeCounts = violations.reduce((acc, v) => {
        acc[v.type] = (acc[v.type] || 0) + 1;
        return acc;
    }, {} as Record<ViolationType, number>);
    
    const colors = ['#003399', '#3b82f6', '#93c5fd', '#ef4444', '#f59e0b', '#10b981'];

    return Object.entries(typeCounts)
        .map(([name, value], index) => ({ name, value, fill: colors[index % colors.length] }))
        .sort((a,b) => b.value - a.value);

  }, [violations]);


  const governorateChartData = useMemo(() => {
     const govCounts = violations.reduce((acc, v) => {
        acc[v.governorate] = (acc[v.governorate] || 0) + 1;
        return acc;
     }, {} as Record<Governorate, number>);

     return Object.entries(govCounts)
        .map(([name, count]) => ({ name, 'عدد الانتهاكات': count }))
        .sort((a,b) => b['عدد الانتهاكات'] - a['عدد الانتهاكات']);
  }, [violations]);

  return (
    <div className="space-y-12">
      <header className="border-b border-slate-200 pb-6">
        <h2 className="text-4xl font-extrabold text-slate-800">{t('page.observatory.title')}</h2>
        <p className="text-slate-500 mt-2 text-lg">{t('page.observatory.desc')}</p>
      </header>
      
       <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">{t('observatory.dashboard_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
            <motion.div 
                key={idx} 
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
                <p className="text-slate-500 text-sm font-semibold mb-1">{stat.label}</p>
                <AnimatedNumber value={stat.value} className="text-3xl font-bold text-press-blue" />
            </motion.div>
            ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 min-h-[400px]">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{t('observatory.distribution_by_gov')}</h3>
             <ResponsiveContainer width="100%" height={350}>
                <BarChart data={governorateChartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false}/>
                    <XAxis type="number" stroke="#94a3b8"/>
                    <YAxis dataKey="name" type="category" width={80} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                    <Bar dataKey="عدد الانتهاكات" fill="#003399" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
             <h3 className="text-lg font-bold text-slate-800 mb-4">{t('observatory.violations_by_type')}</h3>
             <ResponsiveContainer width="100%" height={350}>
                <RadialBarChart 
                    innerRadius="20%" 
                    outerRadius="100%" 
                    data={violationsByTypeData} 
                    startAngle={180} 
                    endAngle={-180}
                    barSize={15}
                >
                    <RadialBar
                        // FIX: Removed `minAngle` prop as it's not supported by this version of recharts according to the TS error.
                        background
                        // FIX: Removed unsupported `clockWise` prop from RadialBar as it's not a valid property. The chart direction is controlled by the `startAngle` and `endAngle` properties on the parent `RadialBarChart` component.
                        dataKey='value'
                    />
                     <Legend 
                        iconSize={10} 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        wrapperStyle={{ fontSize: '12px' }}
                    />
                    <Tooltip />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
      </div>
       <div className="lg:col-span-1">
            <MostDangerousGovernorates violations={violations} t={t} />
        </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <h3 className="p-6 font-bold text-slate-800 text-lg">{t('observatory.violations_log')}</h3>
          <div className="overflow-x-auto">
             <table className="min-w-full">
                 <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">{t('observatory.table.type')}</th>
                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">العنوان</th>
                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">{t('observatory.table.governorate')}</th>
                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">{t('observatory.table.date')}</th>
                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">{t('observatory.table.severity')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                {loading ? (
                    <tr><td colSpan={5} className="p-6 text-center text-slate-500">{t('observatory.loading')}...</td></tr>
                ) : violations.map((violation) => (
                  <tr key={violation.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-press-blue/10 text-press-blue">{violation.type}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium max-w-xs truncate">{violation.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{violation.governorate}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{violation.date}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className={`font-semibold ${violation.severity.includes('خطير') || violation.severity === 'عالي' ? 'text-red-600' : 'text-yellow-600'}`}>{violation.severity}</span>
                    </td>
                  </tr>
                ))}
                </tbody>
             </table>
          </div>
      </div>
    </div>
  );
};

export default Observatory;