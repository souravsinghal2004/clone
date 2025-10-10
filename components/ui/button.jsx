export function Button({ children, variant = "primary" }) {
  const base = "px-6 py-3 rounded-lg font-medium transition";
  const variants = {
    primary: `${base} bg-blue-600 text-white hover:bg-blue-700`,
    secondary: `${base} bg-white text-blue-600 hover:bg-gray-100`,
  };
  return <button className={variants[variant]}>{children}</button>;
}
