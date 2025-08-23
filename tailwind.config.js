/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{ts,tsx}", // if needed
  ],
  theme: {
    extend: {
      colors: {
        "professional-bg": "#f8f9fa",
        "professional-surface": "#ffffff",
        "professional-text": "#111827",
        "professional-text-light": "#6b7280",
        "professional-accent": "#6366f1",
        "professional-border": "#e5e7eb",
      },
    },
  },
  plugins: [],
};
    