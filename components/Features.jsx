import React from "react";
import { Card } from "./ui/card";
import { Brain, Clock, Shield, BarChart3, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced natural language processing evaluates candidate responses with human-like understanding.",
  },
  {
    icon: Clock,
    title: "Save 80% Time",
    description:
      "Automate initial screening interviews and focus your time on the best candidates.",
  },
  {
    icon: Shield,
    title: "Reduce Bias",
    description:
      "Standardized questions and objective scoring ensure fair evaluation for all candidates.",
  },
  {
    icon: BarChart3,
    title: "Deep Insights",
    description:
      "Get detailed analytics and reports on candidate performance and hiring trends.",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description:
      "Share feedback and collaborate with your team in real-time throughout the hiring process.",
  },
  {
    icon: Zap,
    title: "Instant Scheduling",
    description:
      "Candidates can interview anytime, anywhere. No more scheduling headaches.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Everything You Need to Hire Better
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI interview platform combines cutting-edge technology with proven hiring best practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
