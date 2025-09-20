import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronDown, Search, Tag } from "lucide-react";
import { Button } from "../ui/button";

const faqCategories = [
    { id: "all", label: "All", count: 24 },
    { id: "getting-started", label: "Getting Started", count: 8 },
    { id: "account", label: "Account & Billing", count: 6 },
    { id: "features", label: "Features", count: 10 },
    { id: "integrations", label: "Integrations", count: 5 },
    { id: "troubleshooting", label: "Troubleshooting", count: 7 }
];

const faqData = [
    {
        category: "getting-started",
        question: "How do I get started with CRM Lite?",
        answer: "Getting started is easy! Simply sign up for an account, complete the onboarding process, and you'll be guided through setting up your first contacts and leads. Our setup wizard will help you import your existing data and configure your preferences."
    },
    {
        category: "getting-started",
        question: "Can I import my existing customer data?",
        answer: "Yes! CRM Lite supports importing data from CSV files, Excel spreadsheets, and popular CRM systems like Salesforce, HubSpot, and Pipedrive. Our import wizard guides you through the process step-by-step."
    },
    {
        category: "account",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our certified payment partners."
    },
    {
        category: "account",
        question: "Can I upgrade or downgrade my plan anytime?",
        answer: "Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and billing is prorated accordingly."
    },
    {
        category: "features",
        question: "How does the lead scoring feature work?",
        answer: "Our lead scoring uses machine learning algorithms to analyze lead behavior, engagement levels, and demographic data. Scores are updated in real-time and help you prioritize your sales efforts on the most promising prospects."
    },
    {
        category: "features",
        question: "Can I customize the dashboard and reports?",
        answer: "Yes! CRM Lite offers extensive customization options. You can create custom dashboards, build personalized reports, add custom fields, and set up automated workflows to match your business processes."
    },
    {
        category: "integrations",
        question: "What integrations are available?",
        answer: "CRM Lite integrates with over 100+ popular tools including Gmail, Outlook, Slack, Zapier, Mailchimp, QuickBooks, and many more. We also provide API access for custom integrations."
    },
    {
        category: "integrations",
        question: "Do you offer API access?",
        answer: "Yes! We provide a comprehensive REST API with detailed documentation. This allows you to integrate CRM Lite with your existing systems and build custom applications on top of our platform."
    },
    {
        category: "troubleshooting",
        question: "Why am I not receiving email notifications?",
        answer: "Check your notification settings in your profile, ensure our emails aren't going to spam, and verify your email address is correct. If issues persist, contact our support team for assistance."
    },
    {
        category: "troubleshooting",
        question: "How do I reset my password?",
        answer: "Click the 'Forgot Password' link on the login page, enter your email address, and follow the instructions in the reset email. If you don't receive the email within 5 minutes, check your spam folder."
    }
];

const SupportFAQ = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [activeCategory, setActiveCategory] = useState("all");
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const filteredFAQs = faqData.filter(faq => {
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch = searchQuery === "" || 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleQuestion = (index: number) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    return (
        <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p 
                        variants={itemVariants}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
                    >
                        Find quick answers to common questions about CRM Lite
                    </motion.p>

                    {/* Search bar */}
                    <motion.div variants={itemVariants} className="max-w-md mx-auto mb-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search FAQs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                            />
                        </div>
                    </motion.div>

                    {/* Category filters */}
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
                        {faqCategories.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? "default" : "outline"}
                                onClick={() => setActiveCategory(category.id)}
                                className={`transition-all duration-300 ${
                                    activeCategory === category.id
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                <Tag className="w-4 h-4 mr-2" />
                                {category.label}
                                <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                                    {category.count}
                                </span>
                            </Button>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-4xl mx-auto"
                >
                    <div className="space-y-4">
                        {filteredFAQs.map((faq, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="hover:shadow-lg transition-all duration-300">
                                    <CardHeader 
                                        className="cursor-pointer"
                                        onClick={() => toggleQuestion(index)}
                                    >
                                        <CardTitle className="flex items-center justify-between text-left">
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                                                {faq.question}
                                            </span>
                                            <ChevronDown 
                                                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                                                    openQuestion === index ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </CardTitle>
                                    </CardHeader>
                                    {openQuestion === index && (
                                        <CardContent className="pt-0">
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        </CardContent>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {filteredFAQs.length === 0 && (
                        <motion.div variants={itemVariants} className="text-center py-12">
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                No FAQs found matching your search criteria.
                            </p>
                            <Button 
                                variant="outline" 
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveCategory("all");
                                }}
                                className="mt-4"
                            >
                                Clear Filters
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default SupportFAQ;