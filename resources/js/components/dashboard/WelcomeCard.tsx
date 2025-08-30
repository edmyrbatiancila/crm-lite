import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
    Users, 
    FolderOpen, 
    CheckSquare, 
    UserPlus,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    first_login_at: string | null;
    last_login_at: string | null;
}

interface WelcomeCardProps {
    user: User;
}

export function WelcomeCard({ user }: WelcomeCardProps) {
    const isFirstTimeUser = !user.first_login_at || 
        (user.first_login_at && new Date(user.first_login_at).toDateString() === new Date().toDateString());

    if (!isFirstTimeUser) return null;

    const quickActions = [
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
            title: 'View Users',
            description: 'Manage team members',
            icon: Users,
            href: '/users',
            color: 'bg-purple-500'
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-full mb-6"
        >
            <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            Welcome!
                        </Badge>
                    </div>
                    <CardTitle className="text-2xl">
                        Welcome to CRM Lite, {user.first_name}! 👋
                    </CardTitle>
                    <CardDescription className="text-base">
                        {isFirstTimeUser && user.first_login_at 
                            ? "Great to see you back! Let's get you started with your CRM journey."
                            : "Your account has been created successfully. Let's explore what you can do with CRM Lite."
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map((action, index) => (
                                <motion.div
                                    key={action.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Link href={action.href}>
                                        <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border/50 hover:border-primary/30">
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
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

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild className="flex-1">
                                <Link href="/notifications">
                                    View Your Notifications
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="flex-1">
                                <Link href="/test-welcome">
                                    Test Welcome Notification
                                </Link>
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Need help getting started? Check out our{' '}
                                <Link href="/help" className="text-primary hover:underline">
                                    help guide
                                </Link>{' '}
                                or{' '}
                                <Link href="/support" className="text-primary hover:underline">
                                    contact support
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
