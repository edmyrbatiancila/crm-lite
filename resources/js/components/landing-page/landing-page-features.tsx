import { features } from "@/data/landing-page/features";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const LandingPageFeatures = () => {
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
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1
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
                        Everything You Need to
                        <span className="text-blue-600 dark:text-blue-400"> Succeed</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Powerful features designed to help you build stronger customer relationships 
                        and drive sustainable business growth.
                    </p>
                </motion.div>

                {/* Features grid */}
                <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                {features.map((feature, index) => (
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
                            <CardContent className="p-8">
                                {/* Icon */}
                                <motion.div 
                                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <feature.icon className="h-6 w-6 text-white" />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
                </motion.div>
            </div>
        </section>
    );
}

export default LandingPageFeatures;