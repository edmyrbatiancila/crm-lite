import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const comparisonFeatures = [
    { category: 'Core Features', features: [
        { name: 'Contact Management', starter: true, professional: true, enterprise: true },
        { name: 'Task Management', starter: true, professional: true, enterprise: true },
        { name: 'Project Tracking', starter: false, professional: true, enterprise: true },
        { name: 'Lead Management', starter: false, professional: true, enterprise: true },
        { name: 'Activity Logging', starter: true, professional: true, enterprise: true }
    ]},
    { category: 'Analytics & Reporting', features: [
        { name: 'Basic Reports', starter: true, professional: true, enterprise: true },
        { name: 'Advanced Analytics', starter: false, professional: true, enterprise: true },
        { name: 'Custom Dashboards', starter: false, professional: true, enterprise: true },
        { name: 'Export Data', starter: false, professional: true, enterprise: true },
        { name: 'Real-time Insights', starter: false, professional: false, enterprise: true }
    ]},
    { category: 'Integrations & API', features: [
        { name: 'Email Integration', starter: true, professional: true, enterprise: true },
        { name: 'Calendar Sync', starter: false, professional: true, enterprise: true },
        { name: 'API Access', starter: false, professional: true, enterprise: true },
        { name: 'Webhooks', starter: false, professional: false, enterprise: true },
        { name: 'Custom Integrations', starter: false, professional: false, enterprise: true }
    ]},
    { category: 'Support & Security', features: [
        { name: 'Email Support', starter: true, professional: true, enterprise: true },
        { name: 'Priority Support', starter: false, professional: true, enterprise: true },
        { name: '24/7 Phone Support', starter: false, professional: false, enterprise: true },
        { name: 'Data Encryption', starter: true, professional: true, enterprise: true },
        { name: 'Advanced Security', starter: false, professional: false, enterprise: true }
    ]}
];

const PricingComparison = () => {
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
                        Compare
                        <span className="text-blue-600 dark:text-blue-400"> All Features</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        See exactly what's included in each plan to make the right choice for your business.
                    </p>
                </motion.div>

                {/* Comparison table */}
                <motion.div 
                    className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {/* Table header */}
                    <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                            Features
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Starter</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Free</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Professional</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">$29/month</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Enterprise</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">$99/month</div>
                        </div>
                    </div>

                    {/* Feature categories */}
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {comparisonFeatures.map((category, categoryIndex) => (
                            <motion.div 
                                key={categoryIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 0.6, delay: 0.6 + (categoryIndex * 0.1) }}
                                className="p-6"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                                    {category.category}
                                </h3>
                                <div className="space-y-3">
                                    {category.features.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="grid grid-cols-4 gap-4 items-center py-2">
                                            <div className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                                                {feature.name}
                                            </div>
                                            <div className="flex justify-center">
                                                {feature.starter ? (
                                                    <Check className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <X className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex justify-center">
                                                {feature.professional ? (
                                                    <Check className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <X className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex justify-center">
                                                {feature.enterprise ? (
                                                    <Check className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <X className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default PricingComparison;