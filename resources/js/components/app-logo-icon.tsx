import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    // Extract size classes to make them larger by default
    const sizeClasses = props.className?.includes('size-') || props.className?.includes('h-') || props.className?.includes('w-') 
        ? props.className 
        : `size-12 ${props.className || ''}`;
    
    return (
        <div className="p-1 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-sm">
            <img 
                {...props}
                src="/img/crm_lite_transparent_logo.png"
                alt="CRM-Lite Logo"
                className={`object-contain drop-shadow-md dark:brightness-125 dark:contrast-110 ${sizeClasses}`.trim()}
            />
        </div>
    );
}
