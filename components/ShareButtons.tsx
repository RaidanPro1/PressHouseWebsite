import React from 'react';
import { ICONS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface ShareButtonsProps {
    title: string;
    url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
    const t = useTranslation();
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    };

    const ShareButton: React.FC<{ platform: 'facebook' | 'twitter' | 'whatsapp', link: string }> = ({ platform, link }) => {
        const platformIcons = {
            facebook: ICONS.Facebook,
            twitter: ICONS.Twitter,
            whatsapp: ICONS.Whatsapp,
        };
        const platformColors = {
            facebook: 'hover:bg-blue-600 hover:text-white',
            twitter: 'hover:bg-sky-500 hover:text-white',
            whatsapp: 'hover:bg-green-500 hover:text-white',
        }
        const Icon = platformIcons[platform];

        return (
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                title={`${t('share.title')} ${platform}`}
                className={`p-2 rounded-full bg-slate-100 text-slate-600 transition-colors ${platformColors[platform]}`}
            >
                <Icon className="w-4 h-4" />
            </a>
        );
    };

    return (
        <div className="flex items-center gap-2">
            <ShareButton platform="facebook" link={shareLinks.facebook} />
            <ShareButton platform="twitter" link={shareLinks.twitter} />
            <ShareButton platform="whatsapp" link={shareLinks.whatsapp} />
        </div>
    );
};

export default ShareButtons;
