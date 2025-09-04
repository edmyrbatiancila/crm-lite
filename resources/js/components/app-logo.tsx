export default function AppLogo() {
    return (
        <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-white/20 to-white/10 dark:from-white/10 dark:to-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10">
            <img 
                src="/img/crm_lite_transparent_logo.png" 
                alt="CRM-Lite Logo" 
                className="size-30 object-contain drop-shadow-lg dark:brightness-125 dark:contrast-110"
            />
        </div>
    );
}
