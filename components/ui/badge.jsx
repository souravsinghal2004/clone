export function Badge({ children }) {
  return (
    <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 text-sm font-semibold rounded-full">
      {children}
    </span>
  );
}
