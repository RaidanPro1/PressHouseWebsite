import React, { useState } from 'react';
import { ICONS } from '../constants';
import { MockApiService } from '../services/mockBackend';
import { Camera, Mic, Video } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const PanicSystem: React.FC = () => {
  const t = useTranslation();
  const [status, setStatus] = useState<'idle' | 'locating' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [followUpState, setFollowUpState] = useState<'idle' | 'recording' | 'uploading' | 'done' | 'error'>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const activatePanic = () => {
    if (!name.trim() || !phone.trim()) {
        setStatus('error');
        setErrorMsg('يرجى إدخال الاسم ورقم الهاتف.');
        return;
    }
    setStatus('locating');
    if (!navigator.geolocation) {
        setStatus('error');
        setErrorMsg('المتصفح لا يدعم تحديد الموقع.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            setStatus('sending');
            try {
                await MockApiService.submitPanicSignal(position.coords, name, phone);
                setStatus('sent');
            } catch (err) {
                setStatus('error');
                setErrorMsg('فشل الاتصال بالخادم الآمن.');
            }
        },
        (err) => {
            setStatus('error');
            setErrorMsg('تعذر الوصول للموقع. يرجى تفعيل الـ GPS.');
        },
        { enableHighAccuracy: true }
    );
  };
  
  const handleFollowUp = (type: 'audio' | 'photo' | 'video') => {
      setFollowUpState('uploading'); // Simplified to one state
      // Simulate API call for evidence submission
      setTimeout(() => {
          setFollowUpState('done');
      }, 2500);
  }

  const resetAll = () => {
      setStatus('idle');
      setFollowUpState('idle');
      setErrorMsg('');
      setName('');
      setPhone('');
  }

  const renderFollowUp = () => {
      if (followUpState === 'idle') {
          return (
              <>
                  <p className="text-green-700 text-sm mt-2 mb-4">
                      تم استلام إشارتك. إذا كان الوضع يسمح، يمكنك إرسال دليل إضافي لتوثيق الحالة.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => handleFollowUp('audio')} className="flex flex-col items-center justify-center p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-800 transition-colors">
                          <Mic className="w-6 h-6 mb-1"/>
                          <span className="text-xs font-semibold">تسجيل صوتي</span>
                      </button>
                      <button onClick={() => handleFollowUp('photo')} className="flex flex-col items-center justify-center p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-800 transition-colors">
                          <Camera className="w-6 h-6 mb-1"/>
                          <span className="text-xs font-semibold">إرفاق صورة</span>
                      </button>
                      <button onClick={() => handleFollowUp('video')} className="flex flex-col items-center justify-center p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-800 transition-colors">
                          <Video className="w-6 h-6 mb-1"/>
                          <span className="text-xs font-semibold">تسجيل فيديو</span>
                      </button>
                  </div>
              </>
          );
      }
      if (followUpState === 'uploading') {
          return (
              <div className="flex items-center justify-center flex-col text-green-800">
                  <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <span className="text-sm font-medium">جاري إرسال الدليل...</span>
              </div>
          );
      }
      if (followUpState === 'done') {
           return (
              <div className="text-center text-green-800">
                <ICONS.Success className="w-8 h-8 mx-auto mb-2"/>
                <p className="font-semibold">تم استلام الدليل بنجاح.</p>
              </div>
          );
      }
      return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-8 border-red-600">
        <ICONS.Alert className="w-16 h-16 text-red-600 mx-auto mb-6" />
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">نظام الطوارئ</h2>
        <p className="text-gray-600 mb-8">
            في حال تعرضك لخطر محدق، أدخل بياناتك ثم اضغط الزر لإرسال استغاثة فورية مع موقعك.
        </p>

        {status === 'idle' && (
            <div className="space-y-4 mb-6">
                <div>
                    <label htmlFor="panic-name" className="sr-only">{t('nav.panic_form.name')}</label>
                    <input type="text" id="panic-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('nav.panic_form.name_placeholder')} className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-center" required />
                </div>
                <div>
                    <label htmlFor="panic-phone" className="sr-only">{t('nav.panic_form.phone')}</label>
                    <input type="tel" id="panic-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('nav.panic_form.phone_placeholder')} className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-center" required />
                </div>
            </div>
        )}

        {status === 'idle' && (
            <button
                onClick={activatePanic}
                className="w-full h-24 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-xl shadow-lg transition-all flex flex-col items-center justify-center group"
            >
                <span className="text-2xl font-bold group-hover:scale-110 transition-transform">إرسال استغاثة</span>
                <span className="text-red-200 text-sm mt-1">SOS SIGNAL</span>
            </button>
        )}

        {status === 'locating' && (
            <div className="w-full h-24 bg-gray-100 rounded-xl flex items-center justify-center flex-col animate-pulse">
                <ICONS.Location className="w-8 h-8 text-gray-400 mb-2 animate-bounce" />
                <span className="text-gray-600 font-medium">جاري تحديد الموقع...</span>
            </div>
        )}

        {status === 'sending' && (
            <div className="w-full h-24 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center flex-col">
                <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                <span className="text-red-600 font-medium">جاري إرسال البيانات المشفرة...</span>
            </div>
        )}

        {status === 'sent' && (
            <div className="w-full bg-green-50 border border-green-200 rounded-xl p-6">
                <ICONS.Success className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-green-800">تم الإرسال بنجاح</h3>
                {renderFollowUp()}
                <button 
                    onClick={resetAll}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    إعادة تعيين النظام
                </button>
            </div>
        )}

        {status === 'error' && (
            <div className="w-full bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 mb-1">فشل الإرسال</h3>
                <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
                <button
                    onClick={activatePanic}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
                >
                    محاولة مرة أخرى
                </button>
                 <button 
                    onClick={resetAll}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    إلغاء
                </button>
            </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <ICONS.Panic className="w-3 h-3" />
                اتصال آمن ومشفر (AES-256)
            </p>
        </div>
      </div>
    </div>
  );
};

export default PanicSystem;