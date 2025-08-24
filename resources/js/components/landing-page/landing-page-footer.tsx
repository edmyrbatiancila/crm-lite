import { footerLinks } from "@/data/landing-page/footer-links";
import { Facebook, Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const LandingPageFooter = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">
                            CRM<span className="text-blue-400">-lite</span>
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Simplifying customer relationship management for growing businesses worldwide. 
                            Build stronger connections, drive sales, and scale your success.
                        </p>

                        {/* Contact info */}
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4" />
                                <span>support@crm-lite.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Product links */}
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                        {footerLinks.product.map((link, index) => (
                            <li key={index}>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {link}
                                </a>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Company links */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                        {footerLinks.company.map((link, index) => (
                            <li key={index}>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {link}
                                </a>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Support links */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                        {footerLinks.support.map((link, index) => (
                            <li key={index}>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {link}
                                </a>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Resources links */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                        {footerLinks.resources.map((link, index) => (
                            <li key={index}>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {link}
                                </a>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <div className="text-gray-400 text-sm">
                            © 2025 CRM-lite. All rights reserved.
                        </div>

                        {/* Social links */}
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default LandingPageFooter;