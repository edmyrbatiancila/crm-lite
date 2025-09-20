import { motion } from 'framer-motion';
import { Check, X, Star, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const pricingPlans = [
    {
        name: 'Starter',
        description: 'Perfect for small businesses getting started',
        price: 'Free',
        period: 'Forever',
        icon: Zap,
        popular: false,
        features: [
            { name: 'Up to 100 contacts', included: true },
            { name: 'Basic contact management', included: true },
            { name: 'Email support', included: true },
            { name: '1 user account', included: true },
            { name: 'Mobile app access', included: true },
            { name: 'Advanced analytics', included: false },
            { name: 'Custom fields', included: false },
            { name: 'API access', included: false },
            { name: 'Priority support', included: false }
        ],
        cta: 'Get Started Free',
        buttonVariant: 'outline' as const
    },
    {
        name: 'Professional',
        description: 'Best for growing businesses with advanced needs',
        price: '$29',
        period: 'per month',
        icon: Star,
        popular: true,
        features: [
            { name: 'Up to 1,000 contacts', included: true },
            { name: 'Advanced contact management', included: true },
            { name: 'Priority email & chat support', included: true },
            { name: 'Up to 5 user accounts', included: true },
            { name: 'Mobile app access', included: true },
            { name: 'Advanced analytics', included: true },
            { name: 'Custom fields', included: true },
            { name: 'API access', included: true },
            { name: 'Priority support', included: false }
        ],
        cta: 'Start Free Trial',
        buttonVariant: 'default' as const
    },
    {
        name: 'Enterprise',
        description: 'For large organizations with custom requirements',
        price: '$99',
        period: 'per month',
        icon: Building2,
        popular: false,
        features: [
            { name: 'Unlimited contacts', included: true },
            { name: 'Enterprise contact management', included: true },
            { name: '24/7 phone & chat support', included: true },
            { name: 'Unlimited user accounts', included: true },
            { name: 'Mobile app access', included: true },
            { name: 'Advanced analytics', included: true },
            { name: 'Custom fields', included: true },
            { name: 'API access', included: true },
            { name: 'Priority support', included: true }
        ],
        cta: 'Contact Sales',
        buttonVariant: 'outline' as const
    }
];

const PricingPlans = () => {
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
                        Plans That Scale
                        <span className="text-blue-600 dark:text-blue-400"> With You</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Choose the perfect plan for your business. Start free and upgrade as you grow.
                    </p>
                </motion.div>

                {/* Pricing cards */}
                <motion.div 
                    className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {pricingPlans.map((plan, index) => {
                        const Icon = plan.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.1,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                                className="relative"
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </div>
                                    </div>
                                )}
                                <Card className={`h-full ${plan.popular ? 'border-blue-600 dark:border-blue-400 shadow-xl scale-105' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl`}>
                                    <CardHeader className="text-center pb-8">
                                        <div className={`inline-flex p-3 rounded-xl mb-4 ${plan.popular ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'} transition-colors duration-300`}>
                                            <Icon className={`h-8 w-8 ${plan.popular ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-300">
                                            {plan.description}
                                        </p>
                                        <div className="mt-6">
                                            <div className="flex items-baseline justify-center">
                                                <span className="text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                                    {plan.price}
                                                </span>
                                                {plan.period !== 'Forever' && (
                                                    <span className="text-xl text-gray-500 dark:text-gray-400 ml-1 transition-colors duration-300">
                                                        /{plan.period}
                                                    </span>
                                                )}
                                            </div>
                                            {plan.period === 'Forever' && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
                                                    No credit card required
                                                </p>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center">
                                                    {feature.included ? (
                                                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                                                    )}
                                                    <span className={`text-sm ${feature.included ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'} transition-colors duration-300`}>
                                                        {feature.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button 
                                            variant={plan.buttonVariant}
                                            className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''} transition-colors duration-300`}
                                            size="lg"
                                        >
                                            {plan.cta}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Additional info */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                        All plans include a 14-day free trial. No setup fees or hidden costs.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 transition-colors duration-300">
                        Need a custom solution? <button className="text-blue-600 dark:text-blue-400 hover:underline">Contact our sales team</button>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default PricingPlans;