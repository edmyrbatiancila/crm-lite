import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Sparkles, 
    Users, 
    FolderOpen, 
    CheckSquare, 
    UserPlus,
    ArrowRight,
    Rocket,
    Gift
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    first_login_at: string | null;
    last_login_at: string | null;
    roles?: Array<{ name: string }>;
}

interface WelcomeModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
}

export function WelcomeModal({ user, isOpen, onClose }: WelcomeModalProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const welcomeSteps = [
        {
            title: `🎉 Welcome to CRM Lite, ${user.first_name}!`,
            subtitle: "We're excited to have you on board!",
            content: (
                <div className="space-y-4">
                    <div className="text-center">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
                            <Gift className="h-10 w-10 text-primary" />
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Your account has been successfully created. Let's take a quick tour to help you get started!
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border border-primary/10">
                        <h4 className="font-semibold text-sm mb-2">What you can do:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Manage your clients and build relationships</li>
                            <li>• Create and track projects efficiently</li>
                            <li>• Organize tasks and boost productivity</li>
                            <li>• Collaborate with your team seamlessly</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            title: "🚀 Quick Start Actions",
            subtitle: "Get started with these essential features",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        {
                            title: 'Create Project',
                            description: 'Start your first project',
                            icon: FolderOpen,
                            href: '/projects/create',
                            color: 'bg-blue-500'
                        },
                        {
                            title: 'Add Client',
                            description: 'Manage your clients',
                            icon: UserPlus,
                            href: '/clients/create',
                            color: 'bg-green-500'
                        },
                        {
                            title: 'Create Task',
                            description: 'Track your work',
                            icon: CheckSquare,
                            href: '/tasks/create',
                            color: 'bg-orange-500'
                        },
                        {
                            title: 'View Team',
                            description: 'See team members',
                            icon: Users,
                            href: '/users',
                            color: 'bg-purple-500'
                        },
                    ].map((action, index) => (
                        <motion.div
                            key={action.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link href={action.href} onClick={onClose}>
                                <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border/50 hover:border-primary/30 h-full">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                                                <action.icon className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                                    {action.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {action.description}
                                                </p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )
        },
        {
            title: "✨ You're All Set!",
            subtitle: "Ready to explore your new CRM dashboard",
            content: (
                <div className="text-center space-y-4">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Rocket className="h-10 w-10 text-green-600" />
                    </div>
                    <div className="space-y-3">
                        <p className="text-lg">
                            Perfect! You're ready to start managing your work efficiently.
                        </p>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-sm mb-2 text-green-800">💡 Pro Tips:</h4>
                            <ul className="text-sm text-green-700 space-y-1 text-left">
                                <li>• Check your notifications regularly for updates</li>
                                <li>• Use the search feature to find information quickly</li>
                                <li>• Customize your dashboard to match your workflow</li>
                                <li>• Need help? Check the help section anytime</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const nextStep = () => {
        if (currentStep < welcomeSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentStepData = welcomeSteps[currentStep];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-primary" />
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                Welcome Tour
                            </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {currentStep + 1} of {welcomeSteps.length}
                        </div>
                    </div>
                    <DialogTitle className="text-2xl">
                        {currentStepData.title}
                    </DialogTitle>
                    <p className="text-muted-foreground">
                        {currentStepData.subtitle}
                    </p>
                </DialogHeader>

                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="py-6"
                >
                    {currentStepData.content}
                </motion.div>

                {/* Progress bar */}
                <div className="w-full bg-secondary/20 rounded-full h-2 mb-4">
                    <motion.div 
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / welcomeSteps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <Button 
                        variant="outline" 
                        onClick={prevStep}
                        disabled={currentStep === 0}
                    >
                        Previous
                    </Button>
                    
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={onClose}>
                            Skip Tour
                        </Button>
                        <Button onClick={nextStep}>
                            {currentStep === welcomeSteps.length - 1 ? 'Get Started!' : 'Next'}
                            {currentStep !== welcomeSteps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
