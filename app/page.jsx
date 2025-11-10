"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 🌟 Header */}
      <Header />

      {/* 🧩 Main Content */}
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
      
        <CTA />
      </main>

      {/* ⚓ Footer */}
      <Footer />
    </div>
  );
}
