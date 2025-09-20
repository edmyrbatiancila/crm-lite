import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, FileQuestion, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const supportOptions = [
    {
        title: 'Live Chat',
        description: 'Get instant help from our support team during business hours.',
        icon: MessageCircle,
        availability: 'Mon-Fri, 9AM-6PM PST',
        responseTime: 'Instant',
        color: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        buttonText: 'Start Chat',
        buttonVariant: 'default' as const
    },
    {
        title: 'Email Support',
        description: 'Send us detailed questions and get comprehensive answers.',
        icon: Mail,
        availability: '24/7',
        responseTime: 'Within 24 hours',
        color: 'bg-green-100 dark:bg-green-900/30',
        iconColor: 'text-green-600 dark:text-green-400',
        buttonText: 'Send Email',
        buttonVariant: 'outline' as const
    },
    {
        title: 'Phone Support',
        description: 'Speak directly with our experts for complex issues.',
        icon: Phone,
        availability: 'Enterprise plans only',
        responseTime: 'Immediate',
        color: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
        buttonText: 'Schedule Call',
        buttonVariant: 'outline' as const
    }
];

const ResourcesSupport = () => {
    const { ref, isInView } = useScrollAnimation(0.2);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.6
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    return (
        <section ref={ref} className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                        Need More
                        <span className="text-blue-600 dark:text-blue-400"> Help?</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Our support team is here to help you succeed. Choose the option that works best for you.
                    </p>
                </motion.div>

                {/* Support options */}
                <motion.div 
                    className="grid md:grid-cols-3 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {supportOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.1,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            >
                                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-800 dark:hover:shadow-2xl h-full">
                                    <CardHeader className="text-center pb-6">
                                        <div className={`inline-flex p-4 rounded-xl mb-4 ${option.color} transition-colors duration-300 mx-auto`}>
                                            <Icon className={`h-8 w-8 ${option.iconColor}`} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                            {option.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                            {option.description}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                                                <Clock className="h-4 w-4 mr-2" />
                                                {option.availability}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-500">
                                                Response time: <span className="font-medium">{option.responseTime}</span>
                                            </div>
                                        </div>
                                        <Button 
                                            variant={option.buttonVariant}
                                            className="w-full"
                                            size="lg"
                                        >
                                            {option.buttonText}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* FAQ and Community section */}
                <motion.div 
                    className="grid lg:grid-cols-2 gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Card className="bg-gray-50 dark:bg-gray-800 border-0 shadow-lg">
                        <CardContent className="p-8 text-center">
                            <div className="bg-orange-100 dark:bg-orange-900/30 inline-flex p-4 rounded-xl mb-6">
                                <FileQuestion className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                                Frequently Asked Questions
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                                Find quick answers to common questions about features, billing, and account management.
                            </p>
                            <Button variant="outline" size="lg">
                                Browse FAQ
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-50 dark:bg-gray-800 border-0 shadow-lg">
                        <CardContent className="p-8 text-center">
                            <div className="bg-pink-100 dark:bg-pink-900/30 inline-flex p-4 rounded-xl mb-6">
                                <Users className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                                Community Forum
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                                Connect with other users, share tips, and learn from the CRM-lite community.
                            </p>
                            <Button variant="outline" size="lg">
                                Join Community
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact info */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-2xl mx-auto transition-colors duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                            Still need help?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                            Can't find what you're looking for? Our support team is ready to assist you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg">
                                Contact Support
                            </Button>
                            <Button variant="outline" size="lg">
                                Request Feature
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ResourcesSupport;