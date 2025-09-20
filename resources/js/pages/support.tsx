import { SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import LandingPageNavigation from "@/components/landing-page/landing-page-navigation";
import SupportHero from "@/components/support/support-hero";
import SupportOptions from "@/components/support/support-options";
import SupportFAQ from "@/components/support/support-faq";
import SupportContact from "@/components/support/support-contact";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const Support = () => {
    const { auth } = usePage<SharedData>().props;
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <>
            <Head>
                <title>Support - CRM Lite</title>
                <meta name="description" content="Get help and support for CRM Lite. Contact our team, browse FAQ, and access documentation." />
            </Head>
            
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <LandingPageNavigation />
                
                {/* Theme Toggle Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-20 right-4 z-40"
                >
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg"
                    >
                        {isDarkMode ? (
                            <Sun className="h-4 w-4 text-yellow-500" />
                        ) : (
                            <Moon className="h-4 w-4 text-gray-600" />
                        )}
                    </Button>
                </motion.div>

                <main className="pt-16">
                    <SupportHero />
                    <SupportOptions />
                    <SupportFAQ />
                    <SupportContact />
                </main>

                <LandingPageFooter />
            </div>
        </>
    );
};

export default Support;