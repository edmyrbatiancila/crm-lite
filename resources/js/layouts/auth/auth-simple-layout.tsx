import { useState, type PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Moon, Sun } from 'lucide-react';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animationVariants';
import { features } from '@/data/login-page/login-page-features';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const [showForgotPassword] = useState<boolean>(false);
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        const newTheme = appearance === 'dark' ? 'light' : appearance === 'light' ? 'dark' : 'light';
        updateAppearance(newTheme);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex transition-colors duration-300">
            {/* Theme Toggle Button */}
            <div className="absolute top-4 right-4 z-50">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                >
                    {appearance === 'dark' ? (
                        <Sun className="h-4 w-4 text-yellow-500" />
                    ) : (
                        <Moon className="h-4 w-4 text-blue-600" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>

            {/* Left Panel - Branding */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-950" />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />

                <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 rounded-lg bg-white/20 dark:bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold">CRM Lite</h1>
                        </div>

                        <h2 className="text-4xl font-bold mb-4 leading-tight">
                            Streamline Your
                            <br />
                            <span className="bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                                Customer Relationships
                            </span>
                        </h2>

                        <p className="text-blue-100 dark:text-blue-200 text-lg mb-12 leading-relaxed">
                            Powerful CRM tools designed to help your business grow, 
                            manage leads, and close more deals efficiently.
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex items-start gap-4"
                            >
                                <div className="h-12 w-12 rounded-lg bg-white/10 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                    <Icon className="h-6 w-6 text-blue-200 dark:text-blue-300" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                    <p className="text-blue-200 dark:text-blue-300 text-sm">{feature.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-sm" />
                <div className="absolute bottom-20 right-32 h-24 w-24 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-sm" />
                <div className="absolute top-1/2 right-12 h-16 w-16 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-sm" />

            </motion.div>

            {/* Right Panel - Auth Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <motion.div
                    className="w-full max-w-md"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence mode='wait'>
                    {!showForgotPassword && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-colors duration-300">
                                <CardHeader className="space-y-4 pb-8">
                                    <div className="text-center">
                                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            {title || "Welcome back"}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                                            {description || "Sign in to your CRM account to continue"}
                                        </CardDescription>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    { children }
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
