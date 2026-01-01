import React, { useState } from 'react';
import { ICONS } from '../constants';
import { MockApiService } from '../services/mockBackend';
import { AnalysisResult } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { Globe } from 'lucide-react';

const ExternalToolCard: React.FC<{ icon?: React.ElementType, logoUrl?: string, title: string, description: string, url: string }> = ({ icon: Icon, logoUrl, title, description, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block bg-slate-50/80 p-4 rounded-lg border hover:border-press-blue hover:bg-white transition-all group shadow-sm hover:shadow-md">
        <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-md border shadow-sm">
              {logoUrl ? <img src={logoUrl} alt={`${title} logo`} className="w-6 h-6 object-contain" /> : (Icon ? <Icon className="w-6 h-6 text-press-blue" /> : <Globe className="w-6 h-6 text-press-blue"/>)}
            </div>
            <div>
                <h4 className="font-bold text-slate-800 group-hover:text-press-blue transition-colors">{title}</h4>
                <p className="text-xs text-slate-500 mt-1">{description}</p>
            </div>
        </div>
    </a>
);

const FactCheck: React.FC<{}> = () => {
  const t = useTranslation();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [textQuery, setTextQuery] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisType, setAnalysisType] = useState<'image' | 'video' | null>(null);


  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImageFile(e.target.files[0]);
      setSelectedVideoFile(null);
      setResult(null);
      setAnalysisType(null);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideoFile(e.target.files[0]);
      setSelectedImageFile(null);
      setResult(null);
      setAnalysisType(null);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImageFile) return;
    setAnalyzing(true);
    setResult(null);
    setAnalysisType('image');
    try {
      const data = await MockApiService.analyzeImage(selectedImageFile);
      setResult(data);
    } catch (error) {
      console.error("Error analyzing image", error);
    } finally {
      setAnalyzing(false);
    }
  };
  
  const handleAnalyzeVideo = async () => {
    if (!selectedVideoFile) return;
    setAnalyzing(true);
    setResult(null);
    setAnalysisType('video');
    try {
      const data = await MockApiService.analyzeVideo(selectedVideoFile);
      setResult(data);
    } catch (error) {
      console.error("Error analyzing video", error);
    } finally {
      setAnalyzing(false);
    }
  };
  
  const handleVerifyText = (e: React.FormEvent) => {
      e.preventDefault();
      if (!textQuery.trim()) return;
      const url = `https://www.google.com/search?q="${encodeURIComponent(textQuery)}"`;
      window.open(url, '_blank');
  };

  return (
    <div className="space-y-12">
      <header className="text-center space-y-4 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-press-blue">{t('page.factcheck.title')}</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t('page.factcheck.desc')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column - Tools */}
        <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg border p-6">
                <h3 className="font-bold text-xl mb-4 text-slate-800">1. أدوات التحليل المباشر</h3>
                 <div className="space-y-4">
                    <p className="text-sm text-slate-600">ارفع ملف صورة أو فيديو لتحليل بياناته الوصفية (Metadata) وكشف أي تلاعب محتمل.</p>
                    {/* Image Analyzer */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-press-blue transition-colors bg-slate-50/80">
                        <ICONS.Upload className="w-8 h-8 text-slate-400 mb-3" />
                        <label className="cursor-pointer text-center">
                            <span className="font-medium text-press-blue">{selectedImageFile ? t('factcheck.image.selected') : t('factcheck.image.select')}</span>
                            <p className="text-xs text-slate-500 mt-1">{selectedImageFile ? selectedImageFile.name : t('factcheck.image.helper')}</p>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageFileChange} />
                        </label>
                    </div>
                     {selectedImageFile && ( <button onClick={handleAnalyzeImage} disabled={analyzing} className="w-full px-6 py-2 bg-press-blue text-white rounded-lg font-semibold shadow hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2">{analyzing && analysisType === 'image' ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {t('factcheck.image.analyzing')}</> : t('factcheck.image.analyze_button')}</button>)}
                    {/* Video Analyzer */}
                     <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-press-blue transition-colors bg-slate-50/80">
                        <ICONS.FileVideo className="w-8 h-8 text-slate-400 mb-3" />
                        <label className="cursor-pointer text-center">
                            <span className="font-medium text-press-blue">{selectedVideoFile ? t('factcheck.video.selected') : t('factcheck.video.select')}</span>
                            <p className="text-xs text-slate-500 mt-1">{selectedVideoFile ? selectedVideoFile.name : t('factcheck.video.helper')}</p>
                            <input type="file" className="hidden" accept="video/*" onChange={handleVideoFileChange} />
                        </label>
                    </div>
                     {selectedVideoFile && (<button onClick={handleAnalyzeVideo} disabled={analyzing} className="w-full px-6 py-2 bg-press-blue text-white rounded-lg font-semibold shadow hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2">{analyzing && analysisType === 'video' ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {t('factcheck.image.analyzing')}</> : t('factcheck.video.analyze_button')}</button>)}
                </div>
            </div>
            
            <div className="space-y-6">
                <h3 className="font-bold text-xl text-slate-800">2. أدوات التحقق مفتوحة المصدر (OSINT)</h3>
                
                <h4 className="font-semibold text-slate-700">أدوات التحقق من الصور</h4>
                <div className="space-y-3">
                    <ExternalToolCard logoUrl="https://logo.clearbit.com/google.com" title="Google Images" description="البحث العكسي عن الصور للبحث عن مصدرها وأماكن ظهورها." url="https://images.google.com/" />
                    <ExternalToolCard logoUrl="https://logo.clearbit.com/tineye.com" title="TinEye" description="أداة متخصصة في البحث العكسي عن الصور وتتبع تاريخها." url="https://tineye.com/" />
                    <ExternalToolCard logoUrl="https://logo.clearbit.com/yandex.com" title="Yandex Images" description="محرك بحث روسي قوي جداً في البحث العكسي عن الصور والوجوه." url="https://yandex.com/images/" />
                </div>
                
                <h4 className="font-semibold text-slate-700 pt-4">أدوات التحقق من الفيديو</h4>
                 <div className="space-y-3">
                    <ExternalToolCard icon={ICONS.Youtube} title="Amnesty YouTube DataViewer" description={t('factcheck.tools.amnesty_youtube.desc')} url="https://citizenevidence.amnestyusa.org/" />
                    <ExternalToolCard logoUrl="https://logo.clearbit.com/invid-project.eu" title="InVID Verification Plugin" description="إضافة للمتصفح توفر مجموعة أدوات لتحليل الفيديوهات والصور." url="https://www.invid-project.eu/tools-and-services/invid-verification-plugin/" />
                </div>
                
                <h4 className="font-semibold text-slate-700 pt-4">أدوات عامة ومصادر</h4>
                <div className="space-y-3">
                    <ExternalToolCard logoUrl="https://logo.clearbit.com/google.com" title="Google Fact Check Explorer" description={t('factcheck.tools.google.desc')} url="https://toolbox.google.com/factcheck/explorer" />
                    <ExternalToolCard icon={ICONS.FileSearch2} title="Bellingcat OSINT Tools" description={t('factcheck.tools.bellingcat.desc')} url="https://www.bellingcat.com/resources/2021/02/09/bellingcats-online-investigation-toolkit/" />
                </div>
            </div>
        </div>
        
        {/* Right Column - Results */}
        <div className="bg-white rounded-xl shadow-lg border p-6 sticky top-8">
            <h3 className="font-bold text-xl mb-4 text-slate-800">
                {analysisType === 'image' && t('factcheck.results.title_image')}
                {analysisType === 'video' && t('factcheck.results.title_video')}
                {!analysisType && 'نتائج التحليل'}
            </h3>
            {!result && (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                    <ICONS.FactCheck className="w-16 h-16 text-slate-300 mb-4" />
                    <p>{t('factcheck.results.placeholder')}</p>
                </div>
            )}
             {result && (
                <div className="animate-fade-in">
                    <div className={`p-4 rounded-lg mb-6 flex items-start gap-4 ${result.isManipulated ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'}`}>
                        {result.isManipulated ? <ICONS.Alert className="w-8 h-8 text-red-600 flex-shrink-0" /> : <ICONS.Success className="w-8 h-8 text-green-600 flex-shrink-0" />}
                        <div>
                            <h4 className={`text-lg font-bold ${result.isManipulated ? 'text-red-800' : 'text-green-800'}`}>
                                {result.isManipulated ? t('factcheck.results.manipulated') : t('factcheck.results.authentic')}
                            </h4>
                            <p className={`text-sm mt-1 ${result.isManipulated ? 'text-red-700' : 'text-green-700'}`}>
                                {t(result.isManipulated ? 'factcheck.results.manipulated_desc' : 'factcheck.results.authentic_desc', { score: result.confidenceScore })}
                            </p>
                        </div>
                    </div>
                     <h4 className="font-bold text-slate-800 mb-3">البيانات الوصفية (Metadata)</h4>
                    <ul className="space-y-3 text-sm border rounded-lg p-3 bg-slate-50 max-h-96 overflow-y-auto">
                        {Object.entries(result.metadata).map(([key, value]) => (
                            <li key={key} className="flex justify-between items-center border-b border-slate-200 pb-2 last:border-b-0">
                                <span className="text-slate-600">{key}</span>
                                <span className="font-medium text-slate-900 ltr:text-right" dir="ltr">{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FactCheck;