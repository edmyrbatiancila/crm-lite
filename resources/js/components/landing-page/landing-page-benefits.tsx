import { benefits } from "@/data/landing-page/benefits";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const LandingPageBenefits = () => {
    const { ref, isInView } = useScrollAnimation(0.2);
    
    return (
        <section ref={ref} className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left side - Benefits list */}
                    <motion.div 
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                                Why Choose
                                <span className="text-blue-600 dark:text-blue-400"> CRM-lite?</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                Join thousands of businesses that have transformed their customer 
                                relationships and boosted revenue with our intuitive platform.
                            </p>
                        </div>

                        <div className="space-y-6">
                        {benefits.map((benefit, index) => (
                            <motion.div 
                                key={index}
                                className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            >
                                <motion.div 
                                    className="flex-shrink-0"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                                    <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                                        {benefit.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                        </div>
                    </motion.div>

                    {/* Right side - Feature highlights */}
                    <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-12 transition-colors duration-300"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">
                            What's Included
                        </h3>

                        <div className="space-y-4">
                        {[
                            'Unlimited contacts and leads',
                            'Advanced analytics dashboard',
                            'Email marketing automation',
                            'Mobile app (iOS & Android)',
                            'Third-party integrations',
                            '24/7 customer support',
                            'Data export and backup',
                            'Custom fields and workflows'
                        ].map((feature, index) => (
                            <motion.div 
                                key={index} 
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            >
                                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <Check className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{feature}</span>
                            </motion.div>
                        ))}
                        </div>

                        <motion.div 
                            className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl transition-colors duration-300"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-300">
                                    14-Day Free Trial
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                                    No credit card required
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default LandingPageBenefits;