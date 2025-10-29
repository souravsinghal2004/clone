import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Head of Talent, TechCorp",
    avatar: "SJ",
    content: "This platform cut our time-to-hire in half. The AI insights are incredibly accurate and help us make data-driven decisions.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "HR Director, StartupXYZ",
    avatar: "MC",
    content: "We've interviewed over 500 candidates using this platform. The consistency and quality of evaluations are outstanding.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Recruiter, Global Solutions",
    avatar: "ER",
    content: "Game changer for remote hiring. Candidates love the flexibility and we love the detailed analytics and bias-free scoring.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Trusted by Leading Companies</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what hiring managers say about our AI interview platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {testimonial.avatar}
                  </AvatarFallback>
                  {/* Optional AvatarImage can be used here */}
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                </Avatar>
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
