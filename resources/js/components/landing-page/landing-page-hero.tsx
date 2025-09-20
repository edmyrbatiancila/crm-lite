import { ArrowRight, Play } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const LandingPageHero = () => {
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
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 overflow-hidden transition-colors duration-300">

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
                    {/* Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                        New: Advanced Analytics Dashboard
                    </motion.div>

                    {/* Main headline */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300"
                    >
                        Simplify Your
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400"> Customer</span>
                        <br />
                        Relationships
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-300"
                    >
                        CRM-lite delivers powerful customer management tools in a clean, intuitive interface. 
                        Boost your sales, streamline workflows, and grow your business effortlessly.
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <Button 
                            size="lg" 
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                        >
                            Start Free Trial
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-gray-100 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 group"
                        >
                            <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                            Watch Demo
                        </Button>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div 
                        variants={itemVariants}
                        className="text-gray-500 dark:text-gray-400 transition-colors duration-300"
                    >
                        <p className="mb-4">Trusted by 10,000+ growing businesses</p>
                        <div className="flex justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity">
                            <div className="text-2xl font-bold">TechCorp</div>
                            <div className="text-2xl font-bold">StartupCo</div>
                            <div className="text-2xl font-bold">GrowthLab</div>
                            <div className="text-2xl font-bold">ScaleUp</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center transition-colors duration-300">
                    <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-pulse transition-colors duration-300"></div>
                </div>
            </motion.div>
        </section>
    );
}

export default LandingPageHero;