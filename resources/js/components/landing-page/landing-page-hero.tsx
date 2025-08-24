import { ArrowRight, Play } from "lucide-react";
import { Button } from "../ui/button";

const LandingPageHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">

            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        New: Advanced Analytics Dashboard
                    </div>

                    {/* Main headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up animation-delay-200">
                        Simplify Your
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Customer</span>
                        <br />
                        Relationships
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
                        CRM-lite delivers powerful customer management tools in a clean, intuitive interface. 
                        Boost your sales, streamline workflows, and grow your business effortlessly.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-600">
                        <Button 
                            size="lg" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                        >
                            Start Free Trial
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105 group"
                        >
                            <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                            Watch Demo
                        </Button>
                    </div>

                    {/* Social proof */}
                    <div className="text-gray-500 animate-fade-in-up animation-delay-800">
                        <p className="mb-4">Trusted by 10,000+ growing businesses</p>
                        <div className="flex justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity">
                            <div className="text-2xl font-bold">TechCorp</div>
                            <div className="text-2xl font-bold">StartupCo</div>
                            <div className="text-2xl font-bold">GrowthLab</div>
                            <div className="text-2xl font-bold">ScaleUp</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
}

export default LandingPageHero;