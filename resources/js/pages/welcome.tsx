import LandingPageBenefits from '@/components/landing-page/landing-page-benefits';
import LandingPageFeatures from '@/components/landing-page/landing-page-features';
import LandingPageFooter from '@/components/landing-page/landing-page-footer';
import LandingPageHero from '@/components/landing-page/landing-page-hero';
import LandingPageNavigation from '@/components/landing-page/landing-page-navigation';
import LandingPageNewsLetter from '@/components/landing-page/landing-page-newsletter';
import LandingPageTestimonials from '@/components/landing-page/landing-page-testimonials';
import { Head } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { ArrowUp, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const { appearance, updateAppearance } = useAppearance();
    const [showScrollTop, setShowScrollTop] = useState(false);

    const toggleTheme = () => {
        const newTheme = appearance === 'dark' ? 'light' : 'dark';
        updateAppearance(newTheme);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300'>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Theme Toggle Button - Fixed Position */}
            <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="fixed top-20 right-6 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
            >
                {appearance === 'dark' ? (
                    <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                    <Moon className="h-4 w-4 text-blue-600" />
                )}
            </Button>

            {/* Scroll to Top Button - Conditional Display */}
            {showScrollTop && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                >
                    <ArrowUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </Button>
            )}

            <LandingPageNavigation />
            <main>
                <LandingPageHero />
                <LandingPageFeatures />
                <LandingPageBenefits />
                <LandingPageTestimonials />
                <LandingPageNewsLetter />
            </main>
            <LandingPageFooter />
        </div>
    );
}
