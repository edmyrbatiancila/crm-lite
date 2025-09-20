import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const faqData = [
    {
        question: 'How does the free trial work?',
        answer: 'You can try any paid plan free for 14 days. No credit card required to start. At the end of the trial, you can choose to upgrade to a paid plan or continue with our free Starter plan.'
    },
    {
        question: 'Can I change plans at any time?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For Enterprise plans, we also offer invoice billing with net-30 terms.'
    },
    {
        question: 'Is my data secure?',
        answer: 'Absolutely. We use industry-standard encryption and security practices. Your data is stored securely and backed up regularly. We are SOC 2 Type II compliant.'
    },
    {
        question: 'Can I export my data?',
        answer: 'Yes, you can export your data at any time in CSV or JSON format. This feature is available on Professional and Enterprise plans.'
    },
    {
        question: 'Do you offer customer support?',
        answer: 'Yes, all plans include email support. Professional plans include priority support, and Enterprise plans include 24/7 phone and chat support.'
    },
    {
        question: 'What happens if I cancel?',
        answer: 'You can cancel your subscription at any time. Your account will remain active until the end of your current billing period, after which you\'ll be moved to the free Starter plan.'
    },
    {
        question: 'Are there any setup fees or hidden costs?',
        answer: 'No, there are no setup fees, hidden costs, or long-term contracts. You only pay for what you use, and you can cancel at any time.'
    }
];

const PricingFAQ = () => {
    const { ref, isInView } = useScrollAnimation(0.2);
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
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
                        Frequently Asked
                        <span className="text-blue-600 dark:text-blue-400"> Questions</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <motion.div 
                    className="max-w-4xl mx-auto space-y-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {faqData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                            className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden transition-colors duration-300"
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                                    {item.question}
                                </h3>
                                <ChevronDown 
                                    className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                                        openItems.includes(index) ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: openItems.includes(index) ? 'auto' : 0,
                                    opacity: openItems.includes(index) ? 1 : 0
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-6">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                        {item.answer}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact section */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-2xl mx-auto transition-colors duration-300">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                            Still have questions?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                            Our support team is here to help you find the right plan for your business.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
                            Contact Support
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default PricingFAQ;