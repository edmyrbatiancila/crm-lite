import { benefits } from "@/data/landing-page/benefits";
import { Check } from "lucide-react";

const LandingPageBenefits = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left side - Benefits list */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                                Why Choose
                                <span className="text-blue-600 dark:text-blue-400"> CRM-lite?</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                Join thousands of businesses that have transformed their customer 
                                relationships and boosted revenue with our intuitive platform.
                            </p>
                        </div>

                        <div className="space-y-6">
                        {benefits.map((benefit, index) => (
                            <div 
                                key={index}
                                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                                    <benefit.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Right side - Feature highlights */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            What's Included
                        </h3>

                        <div className="space-y-4">
                        {[
                            'Unlimited contacts and leads',
                            'Advanced analytics dashboard',
                            'Email marketing automation',
                            'Mobile app (iOS & Android)',
                            'Third-party integrations',
                            '24/7 customer support',
                            'Data export and backup',
                            'Custom fields and workflows'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                            </div>
                        ))}
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    14-Day Free Trial
                                </div>
                                <div className="text-gray-600">
                                    No credit card required
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingPageBenefits;