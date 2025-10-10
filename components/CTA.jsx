'use client';

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 px-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <h3 className="text-4xl font-bold mb-4">Ready to Ace Your Next Interview?</h3>
      <p className="text-lg mb-8">Join InterviewAI today and experience the power of AI-driven mock interviews.</p>
      <Button variant="secondary">Get Started</Button>
    </section>
  );
}
