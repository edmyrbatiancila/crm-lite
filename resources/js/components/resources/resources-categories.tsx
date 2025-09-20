import { motion } from 'framer-motion';
import { Book, Video, FileText, MessageCircle, Code, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const resourceCategories = [
    {
        title: 'Getting Started',
        description: 'Quick setup guides and onboarding tutorials to get you up and running fast.',
        icon: Book,
        color: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        resources: ['Quick Start Guide', 'Account Setup', 'First Contact Import', 'Basic Navigation']
    },
    {
        title: 'Video Tutorials',
        description: 'Watch step-by-step video guides covering all major features and workflows.',
        icon: Video,
        color: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
        resources: ['Platform Overview', 'Contact Management', 'Project Setup', 'Reports & Analytics']
    },
    {
        title: 'User Guides',
        description: 'Comprehensive documentation covering every feature in detail.',
        icon: FileText,
        color: 'bg-green-100 dark:bg-green-900/30',
        iconColor: 'text-green-600 dark:text-green-400',
        resources: ['User Manual', 'Admin Guide', 'Best Practices', 'Troubleshooting']
    },
    {
        title: 'Community',
        description: 'Connect with other users, share tips, and get help from the community.',
        icon: MessageCircle,
        color: 'bg-orange-100 dark:bg-orange-900/30',
        iconColor: 'text-orange-600 dark:text-orange-400',
        resources: ['Community Forum', 'User Groups', 'Feature Requests', 'Success Stories']
    },
    {
        title: 'Developer API',
        description: 'Technical documentation for integrations and custom development.',
        icon: Code,
        color: 'bg-gray-100 dark:bg-gray-700',
        iconColor: 'text-gray-600 dark:text-gray-400',
        resources: ['API Reference', 'SDK Downloads', 'Code Examples', 'Webhooks Guide']
    },
    {
        title: 'Training',
        description: 'Structured learning paths and certification programs.',
        icon: Users,
        color: 'bg-pink-100 dark:bg-pink-900/30',
        iconColor: 'text-pink-600 dark:text-pink-400',
        resources: ['Learning Paths', 'Webinars', 'Certification', 'Team Training']
    }
];

const ResourcesCategories = () => {
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
                        Explore Our
                        <span className="text-blue-600 dark:text-blue-400"> Resource Center</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Find exactly what you need to make the most of CRM-lite, from quick tutorials to in-depth guides.
                    </p>
                </motion.div>

                {/* Resource categories grid */}
                <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {resourceCategories.map((category, index) => {
                        const Icon = category.icon;
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
                                    <CardHeader className="pb-6">
                                        <div className={`inline-flex p-3 rounded-xl mb-4 ${category.color} transition-colors duration-300`}>
                                            <Icon className={`h-8 w-8 ${category.iconColor}`} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                            {category.description}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-2">
                                            {category.resources.map((resource, resourceIndex) => (
                                                <div 
                                                    key={resourceIndex}
                                                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></div>
                                                    {resource}
                                                </div>
                                            ))}
                                        </div>
                                        <button className="mt-6 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-300">
                                            View All Resources →
                                        </button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default ResourcesCategories;