import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Interviews
            </Badge>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl tracking-tight text-gray-900">
                Hire Smarter with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Interviews
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl">
                Transform your hiring process with intelligent AI interviews. Save time, reduce bias, and find the perfect candidates faster than ever before.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
             <Button
  size="lg"
  className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
>
  <span>Start Free Trial</span>
  <ArrowRight className="h-4 w-4" />
</Button>

              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Interviews Conducted</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <div className="text-3xl text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <div className="text-3xl text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">AI Availability</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl transform rotate-3" />
            <ImageWithFallback
               src="images/image.png"
  alt="My Personal Photo"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />



  
          </div>
        </div>
      </div>
    </section>
  );
}
