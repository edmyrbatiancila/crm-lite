import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
    MessageCircle, 
    Mail, 
    Phone, 
    Video, 
    FileText, 
    Users,
    Clock,
    CheckCircle
} from "lucide-react";

const supportOptions = [
    {
        title: "Live Chat",
        description: "Get instant help from our support team",
        icon: MessageCircle,
        availability: "24/7 Available",
        responseTime: "< 2 minutes",
        features: ["Instant responses", "Screen sharing", "File sharing", "Chat history"],
        action: "Start Chat",
        popular: true
    },
    {
        title: "Email Support",
        description: "Send us detailed questions and get comprehensive answers",
        icon: Mail,
        availability: "Business Hours",
        responseTime: "< 4 hours",
        features: ["Detailed responses", "Attachments", "Priority queue", "Follow-up tracking"],
        action: "Send Email"
    },
    {
        title: "Phone Support",
        description: "Speak directly with our technical experts",
        icon: Phone,
        availability: "Mon-Fri 9AM-6PM",
        responseTime: "Immediate",
        features: ["Direct conversation", "Technical guidance", "Account assistance", "Escalation support"],
        action: "Call Now"
    },
    {
        title: "Video Call",
        description: "Schedule a personalized demo or training session",
        icon: Video,
        availability: "By Appointment",
        responseTime: "Same day",
        features: ["Screen sharing", "Personalized demo", "Training session", "Best practices"],
        action: "Schedule Call"
    },
    {
        title: "Documentation",
        description: "Browse our comprehensive help center and guides",
        icon: FileText,
        availability: "Always Available",
        responseTime: "Instant",
        features: ["Step-by-step guides", "Video tutorials", "API documentation", "Best practices"],
        action: "Browse Docs"
    },
    {
        title: "Community Forum",
        description: "Connect with other users and share experiences",
        icon: Users,
        availability: "24/7 Community",
        responseTime: "Varies",
        features: ["User discussions", "Expert answers", "Feature requests", "Success stories"],
        action: "Join Community"
    }
];

const SupportOptions = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

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

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <motion.h2 
                        variants={cardVariants}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Choose Your Support Option
                    </motion.h2>
                    <motion.p 
                        variants={cardVariants}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                    >
                        We offer multiple ways to get help. Choose the option that works best for your situation.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {supportOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                            <motion.div key={option.title} variants={cardVariants}>
                                <Card className={`h-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative ${
                                    option.popular ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                                }`}>
                                    {option.popular && (
                                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    
                                    <CardHeader className="text-center pb-4">
                                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                            {option.title}
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 dark:text-gray-300">
                                            {option.description}
                                        </CardDescription>
                                    </CardHeader>
                                    
                                    <CardContent className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Clock className="w-4 h-4 mr-2 text-green-500" />
                                                <span className="font-medium">{option.availability}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                                                <span>Response: {option.responseTime}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features:</h4>
                                            <ul className="space-y-1">
                                                {option.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                        <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Button className={`w-full transition-all duration-300 ${
                                            option.popular 
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                                        }`}>
                                            {option.action}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default SupportOptions;