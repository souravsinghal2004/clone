'use client';

export function Testimonials() {
  const testimonials = [
    { name: "Amit Verma", text: "The AI feedback was spot-on! Helped me prepare for my dream job." },
    { name: "Neha Patel", text: "A realistic interview experience with amazing reports and insights." },
  ];

  return (
    <section className="py-16 px-6 bg-blue-50">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-10">What Our Users Say</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-700 mb-4">“{t.text}”</p>
              <p className="font-bold text-blue-600">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
