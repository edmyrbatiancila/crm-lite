import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { useState, type PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animationVariants';
import { features } from '@/data/login-page/login-page-features';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {

    const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
            {/* Left Panel - Branding */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
                <div className="absolute inset-0 bg-black/10" />

                <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold">CRM Lite</h1>
                        </div>

                        <h2 className="text-4xl font-bold mb-4 leading-tight">
                            Streamline Your
                            <br />
                            <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                                Customer Relationships
                            </span>
                        </h2>

                        <p className="text-blue-100 text-lg mb-12 leading-relaxed">
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
                                <div className="h-12 w-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                    <Icon className="h-6 w-6 text-blue-200" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                    <p className="text-blue-200 text-sm">{feature.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-white/5 backdrop-blur-sm" />
                <div className="absolute bottom-20 right-32 h-24 w-24 rounded-full bg-white/5 backdrop-blur-sm" />
                <div className="absolute top-1/2 right-12 h-16 w-16 rounded-full bg-white/5 backdrop-blur-sm" />

            </motion.div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12">
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
                            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                                <CardHeader className="space-y-4 pb-8">
                                    <div className="text-center">
                                        <CardTitle className="text-2xl font-bold text-gray-900">
                                            Welcome back
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 mt-2">
                                            Sign in to your CRM account to continue
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
