'use client';

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <Badge>Powered by Advanced AI</Badge>
          <h2 className="text-4xl font-bold">
            Revolutionize Your Interview Experience
          </h2>
          <p className="text-lg text-gray-600">
            Practice and ace your next interview with AI-driven real-time feedback and scoring.
          </p>
          <Button>Start Practicing</Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1758876202789-7f1388c96e01?auto=format&fit=crop&w=1080&q=80"
              alt="AI Interview Platform"
              width={1080}
              height={720}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
