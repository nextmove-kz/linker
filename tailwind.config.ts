import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "up-animation": {
          "0%": {
            transform: "translateY(288px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "left-animation": {
          "0%": {
            transform: "translateX(-500px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "down-animation": {
          "0%": {
            transform: "translateY(-96px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "up-animation": "up-animation 0.3s linear forwards",
        "left-animation": "left-animation 0.3s linear forwards",
        "down-animation": "down-animation 0.3s linear forwards",
      },
      screens: {
        sm: "360px",
        tablet: "640px",
        desktop: "960px",
      },
      fontSize: {
        title: "2rem",
        md: "1.125rem",
        price: "1.5rem",
      },
      fontFamily: {
        rubik: ["var(--font-rubik)"],
        manrope: ["var(--font-manrope)"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        violet100: "#F2ECFE",
        darkGray: "#262626",
        orange: "#FF6D29",
        gray: "#79747E",
        borderColor: "#EEEEEE",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
