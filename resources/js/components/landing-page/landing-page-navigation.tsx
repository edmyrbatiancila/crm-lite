import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, Menu, X, Users, BarChart3, Shield, Building2, Clock, Target } from "lucide-react";
import { Button } from "../ui/button";
import { 
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Features data for the dropdown menu
const featuresData = [
    {
        title: "Contact Management",
        description: "Organize and manage all your customer contacts in one place",
        icon: Users,
        href: "#contact-management"
    },
    {
        title: "Project Tracking",
        description: "Track project progress and milestones with ease",
        icon: Target,
        href: "#project-tracking"
    },
    {
        title: "Task Management",
        description: "Assign and track tasks across your team",
        icon: Clock,
        href: "#task-management"
    },
    {
        title: "Analytics & Reports",
        description: "Get insights with powerful analytics and reporting",
        icon: BarChart3,
        href: "#analytics"
    },
    {
        title: "Team Collaboration",
        description: "Work together seamlessly with your team",
        icon: Building2,
        href: "#collaboration"
    },
    {
        title: "Security & Compliance",
        description: "Enterprise-grade security for your data",
        icon: Shield,
        href: "#security"
    }
];

const LandingPageNavigation = () => {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState<boolean>(false);

    // Helper function to check if a route is active
    const isActiveRoute = (routeName: string) => {
        // Return false if url is undefined or null
        if (!url) return false;
        
        // Get current path from URL, removing any query parameters or hash
        const currentPath = url.split('?')[0].split('#')[0];
        
        // Handle root route
        if (routeName === 'home') {
            return currentPath === '/' || currentPath === '';
        }
        
        // For other routes, check if the path matches
        if (routeName === 'pricing') {
            return currentPath === '/pricing';
        }

        if (routeName === 'resources') {
            return currentPath === '/resources';
        }

        if (routeName === 'support') {
            return currentPath === '/support';
        }
        
        return false;
    };

    return (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href={route('home')}>
                                <h1 className={`text-2xl font-bold transition-colors duration-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 ${
                                    isActiveRoute('home') 
                                        ? 'text-blue-600 dark:text-blue-400' 
                                        : 'text-gray-900 dark:text-white'
                                }`}>
                                    CRM<span className="text-blue-600 dark:text-blue-400">-lite</span>
                                </h1>
                            </Link>
                        </div>

                        {/* Desktop navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {/* Features dropdown */}
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                            Features
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="grid w-[600px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {featuresData.map((feature) => {
                                                    const Icon = feature.icon;
                                                    return (
                                                        <NavigationMenuLink
                                                            key={feature.title}
                                                            className={cn(
                                                                "group select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            )}
                                                            href={feature.href}
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
                                                                <div className="text-sm font-medium leading-none text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                    {feature.title}
                                                                </div>
                                                            </div>
                                                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                                                {feature.description}
                                                            </p>
                                                        </NavigationMenuLink>
                                                    );
                                                })}
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    
                                    {/* Other navigation items */}
                                    <NavigationMenuItem>
                                        <NavigationMenuLink 
                                            href={route('pricing')}
                                            className={`bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium px-4 py-2 rounded-md relative ${
                                                isActiveRoute('pricing') 
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                            }`}
                                        >
                                            Pricing
                                            {isActiveRoute('pricing') && (
                                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                                            )}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    
                                    <NavigationMenuItem>
                                        <NavigationMenuLink 
                                            href={route('resources')}
                                            className={`bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium px-4 py-2 rounded-md relative ${
                                                isActiveRoute('resources') 
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                            }`}
                                        >
                                            Resources
                                            {isActiveRoute('resources') && (
                                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                                            )}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    
                                    <NavigationMenuItem>
                                        <NavigationMenuLink 
                                            href={route('support')}
                                            className={`bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium px-4 py-2 rounded-md relative ${
                                                isActiveRoute('support') 
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                            }`}
                                        >
                                            Support
                                            {isActiveRoute('support') && (
                                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                                            )}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
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
                                {/* Features dropdown for mobile */}
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                                        className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                    >
                                        Features
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isFeaturesOpen && (
                                        <div className="pl-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-700">
                                            {featuresData.map((feature) => {
                                                const Icon = feature.icon;
                                                return (
                                                    <a
                                                        key={feature.title}
                                                        href={feature.href}
                                                        className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                                    >
                                                        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <div className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                                {feature.title}
                                                            </div>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                {feature.description}
                                                            </p>
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                
                                <a 
                                    href={route('pricing')} 
                                    className={`flex items-center transition-colors font-medium ${
                                        isActiveRoute('pricing') 
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-md' 
                                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2'
                                    }`}
                                >
                                    {isActiveRoute('pricing') && (
                                        <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                                    )}
                                    Pricing
                                </a>
                                <a 
                                    href={route('resources')} 
                                    className={`flex items-center transition-colors font-medium ${
                                        isActiveRoute('resources') 
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-md' 
                                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2'
                                    }`}
                                >
                                    {isActiveRoute('resources') && (
                                        <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                                    )}
                                    Resources
                                </a>
                                <a 
                                    href={route('support')} 
                                    className={`flex items-center transition-colors font-medium ${
                                        isActiveRoute('support') 
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-md' 
                                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2'
                                    }`}
                                >
                                    {isActiveRoute('support') && (
                                        <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                                    )}
                                    Support
                                </a>
                                
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                                    {auth.user ? (
                                        <Link href={route('dashboard')}>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors duration-300">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href={route('login')}>
                                                <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                                                    Sign In
                                                </Button>
                                            </Link>
                                            <Link href={route('register')}>
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors duration-300">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
    );
}

export default LandingPageNavigation;