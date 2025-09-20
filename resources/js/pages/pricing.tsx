import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon, ArrowUp } from 'lucide-react';
import LandingPageNavigation from '@/components/landing-page/landing-page-navigation';
import LandingPageFooter from '@/components/landing-page/landing-page-footer';
import PricingHero from '@/components/pricing/pricing-hero';
// import PricingPlans from '@/components/pricing/pricing-plans';
// import PricingFAQ from '@/components/pricing/pricing-faq';
// import PricingComparison from '@/components/pricing/pricing-comparison';
import PricingPlans from '@/components/pricing/pricing-plans';
import PricingFAQ from '@/components/pricing/pricing-faq';
import PricingComparison from '@/components/pricing/pricing-comparison';

export default function Pricing() {
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
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300'
        >
            <Head title="Pricing - CRM Lite">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="description" content="Choose the perfect CRM-lite plan for your business. Simple, transparent pricing with no hidden fees." />
            </Head>

            {/* Theme Toggle Button - Fixed Position */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
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
            </motion.div>

            {/* Scroll to Top Button - Conditional Display */}
            {showScrollTop && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-300"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </motion.div>
            )}

            <LandingPageNavigation />
            <main>
                <PricingHero />
                <PricingPlans />
                <PricingComparison />
                <PricingFAQ />
            </main>
            <LandingPageFooter />
        </motion.div>
    );
}