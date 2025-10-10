'use client';

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">InterviewAI</h1>
      <nav className="space-x-6">
        <a href="#" className="hover:text-blue-600">Home</a>
        <a href="#" className="hover:text-blue-600">Features</a>
        <a href="#" className="hover:text-blue-600">How it Works</a>
        <a href="#" className="hover:text-blue-600">Contact</a>
      </nav>
    </header>
  );
}
