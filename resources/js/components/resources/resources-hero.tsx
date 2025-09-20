import { motion } from 'framer-motion';

const ResourcesHero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                duration: 0.8
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
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 overflow-hidden transition-colors duration-300">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-100 dark:bg-blue-800/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    className="absolute top-40 right-10 w-72 h-72 bg-green-100 dark:bg-green-800/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-100 dark:bg-purple-800/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    className="text-center max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-6 transition-colors duration-300">
                            <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-2"></span>
                            Knowledge Base & Resources
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                            Everything You Need
                            <span className="block text-blue-600 dark:text-blue-400">To Succeed</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto transition-colors duration-300">
                            Comprehensive guides, tutorials, and documentation to help you master 
                            CRM-lite and grow your business effectively.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-12">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                Step-by-step guides
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                Video tutorials
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                24/7 support docs
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default ResourcesHero;