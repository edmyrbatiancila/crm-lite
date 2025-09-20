import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const popularGuides = [
    {
        title: 'Complete CRM Setup Guide',
        description: 'Step-by-step walkthrough to set up your CRM from scratch, including data import and user management.',
        category: 'Getting Started',
        readTime: '15 min read',
        author: 'CRM Team',
        date: 'Updated 3 days ago',
        featured: true,
        tags: ['Setup', 'Beginner', 'Essential']
    },
    {
        title: 'Advanced Contact Management',
        description: 'Master contact segmentation, custom fields, and automation workflows to organize your contacts effectively.',
        category: 'Contact Management',
        readTime: '12 min read',
        author: 'Sarah Johnson',
        date: '1 week ago',
        featured: true,
        tags: ['Contacts', 'Advanced', 'Workflows']
    },
    {
        title: 'Project Tracking Best Practices',
        description: 'Learn how to set up projects, assign tasks, track progress, and collaborate with your team efficiently.',
        category: 'Project Management',
        readTime: '10 min read',
        author: 'Mike Chen',
        date: '2 weeks ago',
        featured: false,
        tags: ['Projects', 'Teams', 'Productivity']
    },
    {
        title: 'Building Custom Reports',
        description: 'Create powerful custom reports and dashboards to gain insights into your business performance.',
        category: 'Analytics',
        readTime: '18 min read',
        author: 'Lisa Rodriguez',
        date: '3 weeks ago',
        featured: false,
        tags: ['Reports', 'Analytics', 'Data']
    },
    {
        title: 'API Integration Guide',
        description: 'Connect CRM-lite with your favorite tools using our robust API and webhook integrations.',
        category: 'Development',
        readTime: '25 min read',
        author: 'Dev Team',
        date: '1 month ago',
        featured: false,
        tags: ['API', 'Integration', 'Developer']
    },
    {
        title: 'Mobile App Usage Tips',
        description: 'Get the most out of the CRM-lite mobile app with these productivity tips and tricks.',
        category: 'Mobile',
        readTime: '8 min read',
        author: 'Emma Wilson',
        date: '1 month ago',
        featured: false,
        tags: ['Mobile', 'Tips', 'Productivity']
    }
];

const ResourcesGuides = () => {
    const { ref, isInView } = useScrollAnimation(0.2);

    return (
        <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                        Popular
                        <span className="text-blue-600 dark:text-blue-400"> Guides</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Our most popular guides and tutorials, handpicked to help you succeed faster.
                    </p>
                </motion.div>

                {/* Featured guides */}
                <motion.div 
                    className="grid lg:grid-cols-2 gap-8 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {popularGuides.filter(guide => guide.featured).map((guide, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <Card className="group h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white dark:bg-gray-900 cursor-pointer">
                                <CardContent className="p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                                            Featured
                                        </Badge>
                                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {guide.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {guide.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {guide.tags.map((tag, tagIndex) => (
                                            <Badge 
                                                key={tagIndex} 
                                                variant="outline" 
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 mr-1" />
                                                {guide.author}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {guide.readTime}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {guide.date}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* All guides grid */}
                <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    {popularGuides.filter(guide => !guide.featured).map((guide, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 1.0 + (index * 0.1) }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <Card className="group h-full hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <Badge variant="outline" className="text-xs">
                                            {guide.category}
                                        </Badge>
                                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                    
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {guide.title}
                                    </h3>
                                    
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                                        {guide.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {guide.readTime}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {guide.date}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default ResourcesGuides;