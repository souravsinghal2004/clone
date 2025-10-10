'use client';

export function HowItWorks() {
  const steps = [
    "Recruiter posts a job and defines interview type.",
    "AI generates questions for the job role.",
    "Candidate logs in and attends AI-led interview.",
    "AI evaluates performance in real time.",
    "Reports are shared with both candidate and recruiter."
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-10">How It Works</h3>
        <ol className="space-y-6 text-left">
          {steps.map((step, i) => (
            <li key={i} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <span className="font-semibold text-blue-600 mr-2">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
