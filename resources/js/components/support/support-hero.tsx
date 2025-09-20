import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Search, MessageCircle, Book, Phone } from "lucide-react";

const SupportHero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section ref={ref} className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
            {/* Animated background decorations */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-10 right-10 w-32 h-32 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -10, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-xl"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Get the{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Help
                            </span>{" "}
                            You Need
                        </h1>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Our support team is here to help you succeed. Find answers, get assistance, 
                            and connect with our community of CRM experts.
                        </p>
                    </motion.div>

                    {/* Quick action buttons */}
                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Start Live Chat
                        </Button>
                        <Button variant="outline" className="border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            <Book className="w-5 h-5 mr-2" />
                            Browse Documentation
                        </Button>
                        <Button variant="outline" className="border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            <Phone className="w-5 h-5 mr-2" />
                            Schedule Call
                        </Button>
                    </motion.div>

                    {/* Search bar */}
                    <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for help articles, tutorials, or features..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent shadow-lg"
                            />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Popular searches: user management, lead tracking, reporting, integrations
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SupportHero;