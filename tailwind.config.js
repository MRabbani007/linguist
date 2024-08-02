/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primary_foreground: "var(--primary-foreground)",
        secondary: "var(--secondary)",
        secondary_foreground: "var(--secondary-foreground)",
        accent: "var(--accent)",
        accent_foreground: "var(--accent-foreground)",
        destructive: "var(--destructive)",
        destructive_foreground: "var(--destructive-foreground)",
      },
    },
  },
  plugins: [],
};
