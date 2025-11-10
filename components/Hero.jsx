import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {g
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-xl">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Smart AI-Powered Interviews for Modern Hiring
        </h2>
        <p className="text-gray-600 mb-6">
          Recruiters can post jobs and schedule interviews, while candidates can
          log in and take AI-driven interviews with instant results.
        </p>
        <div className="flex gap-4">
          <a href="/signup" className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700">
            Get Started
          </a>
          <a href="#features" className="border border-blue-600 text-blue-600 px-5 py-3 rounded-md hover:bg-blue-50">
            Learn More
          </a>
        </div>
      </div>
      <img
        src="images/image.png"
        alt="AI Interview Illustration"
        className="w-80 mt-10 md:mt-0"
      />
    </section>
  );
}
