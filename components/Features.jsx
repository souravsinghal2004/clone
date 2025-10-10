'use client';

export function Features() {
  const features = [
    { title: "AI-Driven Questions", desc: "Automatically generates role-specific interview questions." },
    { title: "Real-Time Feedback", desc: "Get instant insights on tone, confidence, and answers." },
    { title: "Detailed Reports", desc: "Receive performance reports and improvement tips." },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-10">Why Choose InterviewAI?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h4 className="font-bold text-xl mb-2 text-blue-600">{f.title}</h4>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
