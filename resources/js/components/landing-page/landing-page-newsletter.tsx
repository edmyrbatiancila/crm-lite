import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const LandingPageNewsLetter = () => {
    return (
        <section className="py-24 bg-gradient-to-r from-blue-600 to-green-600 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    {/* Main heading */}
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Ready to Transform
                        <br />
                        Your Business?
                    </h2>

                    <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
                        Join thousands of successful businesses using CRM-lite to grow 
                        their customer relationships and boost revenue.
                    </p>

                    {/* Email signup form */}
                    <div className="max-w-md mx-auto mb-8">
                        <div className="flex gap-4 p-2 bg-white/10 backdrop-blur rounded-xl border border-white/20">
                            <Input 
                                type="email" 
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/20 border-0 text-white placeholder:text-white/70 focus:bg-white/30 transition-colors"
                            />
                            <Button 
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 transition-all duration-300 hover:scale-105"
                            >
                                Start Free Trial
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>14-day free trial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingPageNewsLetter;