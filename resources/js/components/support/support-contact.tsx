import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock,
    Send,
    CheckCircle,
    MessageSquare
} from "lucide-react";

const contactInfo = [
    {
        title: "Email Support",
        description: "Get detailed help via email",
        icon: Mail,
        info: "support@crmlite.com",
        availability: "24/7 monitoring",
        response: "< 4 hours"
    },
    {
        title: "Phone Support",
        description: "Speak with our experts directly",
        icon: Phone,
        info: "+1 (555) 123-4567",
        availability: "Mon-Fri 9AM-6PM EST",
        response: "Immediate"
    },
    {
        title: "Office Location",
        description: "Visit our headquarters",
        icon: MapPin,
        info: "123 Business Ave, Suite 100\nSan Francisco, CA 94105",
        availability: "Mon-Fri 9AM-5PM PST",
        response: "By appointment"
    }
];

const SupportContact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        priority: "normal"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after success
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
                priority: "normal"
            });
        }, 3000);
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
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Get in Touch
                    </motion.h2>
                    <motion.p 
                        variants={itemVariants}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                    >
                        Still need help? Contact our support team directly and we'll get back to you as soon as possible.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Contact Information */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Contact Information
                            </h3>
                        </motion.div>

                        {contactInfo.map((contact, index) => {
                            const Icon = contact.icon;
                            return (
                                <motion.div key={index} variants={itemVariants}>
                                    <Card className="hover:shadow-lg transition-all duration-300">
                                        <CardHeader>
                                            <div className="flex items-start space-x-4">
                                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {contact.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-gray-600 dark:text-gray-300">
                                                        {contact.description}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <p className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
                                                {contact.info}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <Clock className="w-4 h-4 mr-2 text-green-500" />
                                                {contact.availability}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                                                Response: {contact.response}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants}>
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                                        <MessageSquare className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                                        Send us a Message
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-300">
                                        Fill out the form below and we'll get back to you within 4 hours.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8"
                                        >
                                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                Message Sent Successfully!
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                We'll get back to you within 4 hours.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Full Name *
                                                    </label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Your full name"
                                                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Email Address *
                                                    </label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="your@email.com"
                                                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Subject *
                                                </label>
                                                <Input
                                                    id="subject"
                                                    name="subject"
                                                    type="text"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    placeholder="What can we help you with?"
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Priority Level
                                                </label>
                                                <select
                                                    id="priority"
                                                    name="priority"
                                                    value={formData.priority}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                                                >
                                                    <option value="low">Low - General inquiry</option>
                                                    <option value="normal">Normal - Standard support</option>
                                                    <option value="high">High - Urgent issue</option>
                                                    <option value="critical">Critical - System down</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Message *
                                                </label>
                                                <Textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    placeholder="Please describe your issue or question in detail..."
                                                    rows={5}
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SupportContact;