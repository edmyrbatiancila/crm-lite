import { features } from "@/data/landing-page/features";
import { Card, CardContent } from "../ui/card";

const LandingPageFeatures = () => {
    return (
        <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                        Everything You Need to
                        <span className="text-blue-600 dark:text-blue-400"> Succeed</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Powerful features designed to help you build stronger customer relationships 
                        and drive sustainable business growth.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card 
                        key={index} 
                        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-gray-800 dark:hover:shadow-2xl"
                    >
                        <CardContent className="p-8">
                            {/* Icon */}
                            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="h-6 w-6 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </div>
        </section>
    );
}

export default LandingPageFeatures;