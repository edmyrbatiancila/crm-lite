import { testimonials } from "@/data/landing-page/testimonials";
import { Card, CardContent } from "../ui/card";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const LandingPageTestimonials = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Loved by
                        <span className="text-blue-600"> Thousands</span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Don't just take our word for it. Here's what our customers have to say 
                        about their experience with CRM-lite.
                    </p>
                </div>

                {/* Testimonials grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card 
                        key={index}
                        className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-md bg-white"
                    >
                        <CardContent className="p-8">
                            {/* Quote icon */}
                            <div className="flex justify-between items-start mb-6">
                                <Quote className="h-8 w-8 text-blue-600 opacity-50" />
                                
                                {/* Rating */}
                                <div className="flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-gray-700 leading-relaxed mb-8 italic">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="" alt={testimonial.name} />
                                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                                    {testimonial.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {testimonial.role} at {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-medium">
                        <Star className="h-5 w-5 fill-current" />
                        4.9/5 stars from 2,500+ reviews
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingPageTestimonials;