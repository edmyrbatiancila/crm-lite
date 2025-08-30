import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const LandingPageNavigation = () => {
    const { auth } = usePage<SharedData>().props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                CRM<span className="text-blue-600 dark:text-blue-400">-lite</span>
                            </h1>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <div className="relative group">
                                <a 
                                    href="#" 
                                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                >
                                    Features
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </a>
                            </div>
                            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Pricing
                            </a>
                            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Resources
                            </a>
                            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Support
                            </a>
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center space-x-4">
                        {auth.user ? (
                            <Link href={route('dashboard')}>
                                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 transition-colors duration-300">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')}>
                                    <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile navigation */}
                    {isOpen && (
                        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
                            <div className="px-6 py-4 space-y-4">
                            <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Features
                            </a>
                            <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Pricing
                            </a>
                            <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Resources
                            </a>
                            <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                Support
                            </a>
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                                <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 transition-colors duration-300">
                                Sign In
                                </Button>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors duration-300">
                                Start Free Trial
                                </Button>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
    );
}

export default LandingPageNavigation;