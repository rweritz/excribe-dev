/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#d1d5db", // gray-300
            a: {
              color: "#60a5fa", // blue-400
              textDecoration: "none",
              "&:hover": {
                color: "#93c5fd", // blue-300
              },
            },
            h1: {
              color: "#ffffff",
            },
            h2: {
              color: "#ffffff",
            },
            h3: {
              color: "#ffffff",
            },
            h4: {
              color: "#ffffff",
            },
            strong: {
              color: "#ffffff",
            },
            code: {
              color: "#93c5fd", // blue-300
              backgroundColor: "#111827", // gray-900
              padding: "0.25rem",
              borderRadius: "0.25rem",
            },
            blockquote: {
              borderLeftColor: "#60a5fa", // blue-400
              color: "#d1d5db", // gray-300
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
