# Players Benefits and Footer Implementation Guide

This document contains the complete implementation code for the **Players Benefits** section and **Footer** component from the Spotts sports booking application. This guide is designed to help another AI or developer implement these components in a React + TypeScript + Tailwind CSS project.

---

## Table of Contents
1. [Overview](#overview)
2. [Dependencies Required](#dependencies-required)
3. [CSS Configuration](#css-configuration)
4. [Component Implementations](#component-implementations)
5. [How to Implement](#how-to-implement)
6. [Visual Design Explanation](#visual-design-explanation)

---

## Overview

This implementation includes:
- **PlayersBenefits Component**: A visually appealing benefits section with animated cards displaying three key player benefits
- **Footer Component**: A comprehensive footer with branding, navigation links, social media icons, and copyright information
- **Logo Component**: An SVG logo used in the footer

Both components use **Tailwind CSS** for styling with a custom design system based on HSL color values.

---

## Dependencies Required

Ensure these packages are installed in your project:

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-router-dom": "^6.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "tailwindcss-animate": "^1.x"
  }
}
```

Install with:
```bash
npm install react react-router-dom lucide-react
npm install -D typescript tailwindcss tailwindcss-animate
```

---

## CSS Configuration

### 1. Tailwind Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll: "scroll 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### 2. Global CSS Variables (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 220 20% 10%;

    --card: 0 0% 100%;
    --card-foreground: 220 20% 10%;

    --popover: 0 0% 100%;
    --popover-foreground: 220 20% 10%;

    /* Primary Blue Color */
    --primary: 234 89% 57%;
    --primary-foreground: 0 0% 100%;

    --secondary: 220 15% 95%;
    --secondary-foreground: 220 20% 10%;

    --muted: 220 15% 95%;
    --muted-foreground: 220 10% 45%;

    /* Accent Color (Bright Blue) */
    --accent: 211 100% 50%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 234 89% 57%;

    --radius: 0.75rem;

    /* Dark Section Colors */
    --dark-bg: 220 25% 6%;
    --dark-card: 220 22% 9%;
    --dark-foreground: 220 5% 95%;

    /* Gradients */
    --gradient-primary: linear-gradient(135deg, hsl(234 89% 57%), hsl(210 100% 65%));
    --gradient-hero: linear-gradient(180deg, hsl(0 0% 100%), hsl(220 15% 98%));

    /* Shadows */
    --shadow-subtle: 0 2px 8px -2px hsl(220 20% 10% / 0.08);
    --shadow-card: 0 4px 16px -4px hsl(220 20% 10% / 0.12);
    --shadow-glow: 0 0 40px hsl(234 89% 57% / 0.15);
  }

  .dark {
    --background: 220 25% 6%;
    --foreground: 220 5% 95%;

    --card: 220 22% 9%;
    --card-foreground: 220 5% 95%;

    --popover: 220 22% 9%;
    --popover-foreground: 220 5% 95%;

    --primary: 234 89% 57%;
    --primary-foreground: 0 0% 100%;

    --secondary: 220 20% 15%;
    --secondary-foreground: 220 5% 95%;

    --muted: 220 20% 15%;
    --muted-foreground: 220 10% 60%;

    --accent: 211 100% 50%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 20% 15%;
    --input: 220 20% 15%;
    --ring: 234 89% 57%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
  }

  /* Dark Section Utility Class */
  .dark-section {
    @apply bg-[hsl(var(--dark-bg))] text-[hsl(var(--dark-foreground))];
  }

  /* Gradient Text Utility Class */
  .gradient-text {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400;
  }
}
```

---

## Component Implementations

### 1. Logo Component (`src/components/Logo.tsx`)

This SVG logo component is used in the Footer.

```typescript
import { SVGProps } from "react";

interface LogoProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const Logo = ({ className = "h-10 w-auto", ...props }: LogoProps) => {
  return (
    <svg
      width="683"
      height="202"
      viewBox="0 0 683 202"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M32.8012 17.6754C51.5635 4.99353 76.3264 -1.10856 102.751 0.165586C124.17 1.1984 145.124 6.70186 164.441 15.9752C170.552 18.9091 176.508 22.1553 182.227 25.7905C184.609 27.3046 185.068 30.5502 183.3 32.7501L173.153 45.3755C172.205 46.5552 170.513 46.8069 169.236 45.9958C164.361 42.9018 159.277 40.1547 154.072 37.6534C137.663 29.77 119.874 25.0483 101.679 24.1583C79.3308 23.0653 59.959 28.3427 46.3334 37.5497C32.9459 46.5959 24.8966 59.5788 24.1729 75.7505C23.1159 99.3732 33.3423 114.318 48.4264 123.238C64.2303 132.583 86.1791 135.654 107.525 132.384C116.142 131.064 118.786 126.825 119.418 124.222C119.823 122.553 119.656 120.797 118.978 119.218C118.3 117.64 117.142 116.305 115.649 115.447C113.348 114.127 110.742 113.502 108.093 113.323C105.166 113.125 102.236 113.035 98.5414 113.035C97.1232 113.035 95.5925 113.033 93.9101 113.016C92.5448 113.002 91.6382 113.026 90.4136 113.025C86.3654 113.024 81.7715 112.951 77.6044 112.623C71.1209 112.113 64.8137 110.207 59.294 106.781C53.5732 103.23 49.1607 97.9289 46.6289 91.7069C44.0971 85.4848 43.5791 78.6247 45.1839 72.1041C48.4757 58.7283 60.0379 48.5221 76.813 45.9544C102.194 42.0695 130.119 45.3189 151.876 58.1806C174.349 71.466 189.368 94.6106 187.901 127.367C186.803 151.892 174.201 171.516 155.198 184.359C155.186 184.367 155.198 184.319 155.186 184.326C136.424 197.007 111.662 203.109 85.2374 201.834C63.8176 200.801 42.8659 195.292 23.5449 186.025C17.441 183.097 11.4867 179.868 5.77201 176.244C3.22551 174.629 2.74218 171.159 4.63125 168.809L14.338 156.732C15.4088 155.399 17.3197 155.12 18.7628 156.036C23.6372 159.13 28.7214 161.877 33.9274 164.378C50.3354 172.262 68.1246 176.983 86.3204 177.873C108.668 178.967 128.039 173.691 141.665 164.484C155.053 155.437 163.102 142.453 163.825 126.283C164.883 102.66 154.657 87.7129 139.573 78.7938C123.769 69.4497 101.822 66.3803 80.4741 69.649C71.855 70.9688 69.2131 75.2082 68.5822 77.8117C68.1778 79.4804 68.3434 81.2359 69.0212 82.8143C69.699 84.3926 70.8565 85.7294 72.3503 86.5859C74.6519 87.9056 77.2584 88.5292 79.9081 88.7089C82.8329 88.9073 85.7643 88.9968 89.457 88.9968C90.8753 88.9968 92.2803 88.9754 94.0889 88.9968C95.185 89.0097 96.3607 89.0098 97.5854 89.0098C101.634 89.0098 106.227 89.0813 110.395 89.4094C116.878 89.9198 123.185 91.8265 128.704 95.2524C134.425 98.8032 138.838 104.104 141.37 110.326C143.902 116.548 144.421 123.408 142.816 129.929C139.525 143.305 127.962 153.511 111.187 156.079C85.8077 159.964 57.8807 156.713 36.1258 143.853C13.6523 130.568 -1.36889 107.424 0.0987916 74.6657C1.19757 50.1427 13.7995 30.5191 32.8012 17.6754Z"
        fill="#007AFF"
      />
      <path
        d="M277.018 162.426C261.934 162.426 250.701 158.788 243.319 151.514C235.937 144.185 233.29 134.182 235.376 121.505H256.077C254.953 128.726 256.344 134.37 260.249 138.435C264.207 142.5 270.279 144.533 278.463 144.533C286.058 144.533 292.451 142.901 297.639 139.639C302.828 136.376 305.877 132.07 306.786 126.721C307.428 122.655 306.331 119.312 303.496 116.691C300.715 114.07 295.5 111.85 287.85 110.031L275.414 107.063C263.913 104.335 255.702 100.216 250.781 94.7062C245.914 89.1966 244.202 82.0824 245.646 73.3633C246.769 66.4095 249.524 60.3651 253.91 55.2299C258.35 50.0948 264.02 46.1097 270.921 43.2747C277.821 40.4397 285.577 39.0222 294.189 39.0222C307.669 39.0222 317.912 42.4189 324.92 49.2122C331.927 56.0056 334.601 65.3397 332.943 77.2147H312.884C313.473 70.8493 311.975 65.9014 308.391 62.371C304.86 58.7871 299.645 56.9951 292.745 56.9951C286.005 56.9951 280.174 58.5999 275.253 61.8093C270.386 65.0188 267.524 69.1376 266.668 74.1657C266.026 78.0705 267.096 81.2265 269.877 83.6336C272.659 85.9872 277.794 88.0466 285.283 89.8118L296.997 92.7003C308.926 95.4818 317.404 99.6809 322.432 105.297C327.46 110.86 329.226 118.189 327.728 127.282C326.551 134.503 323.716 140.762 319.223 146.057C314.73 151.3 308.872 155.338 301.651 158.173C294.483 161.008 286.272 162.426 277.018 162.426ZM325.086 194.039L344.664 75.7704H364.563L362.717 87.4047H362.798C366.114 82.644 370.126 79.2473 374.833 77.2147C379.54 75.1285 384.488 74.0855 389.677 74.0855C399.359 74.0855 406.954 77.2949 412.464 83.7138C418.027 90.0792 420.808 98.5041 420.808 108.988C420.808 115.514 419.819 121.96 417.84 128.325C415.861 134.637 412.999 140.361 409.254 145.496C405.51 150.577 400.937 154.643 395.534 157.692C390.185 160.687 384.087 162.185 377.24 162.185C371.463 162.185 366.462 160.901 362.236 158.334C358.064 155.713 355.041 151.941 353.169 147.02H353.089L345.306 194.039H325.086ZM372.988 145.255C378.925 145.255 383.926 143.463 387.992 139.879C392.111 136.295 395.213 131.749 397.299 126.239C399.439 120.73 400.509 115.113 400.509 109.389C400.509 103.291 399.064 98.6913 396.176 95.5888C393.287 92.4328 389.329 90.8549 384.301 90.8549C378.363 90.8549 373.282 92.6468 369.056 96.2307C364.83 99.7611 361.594 104.228 359.347 109.63C357.101 115.033 355.977 120.516 355.977 126.079C355.977 132.07 357.475 136.777 360.471 140.2C363.466 143.57 367.638 145.255 372.988 145.255ZM459.168 162.426C447.988 162.426 439.162 159.136 432.69 152.557C426.217 145.977 422.981 137.258 422.981 126.4C422.981 119.392 424.131 112.733 426.431 106.421C428.785 100.109 432.101 94.519 436.381 89.6513C440.713 84.7302 445.849 80.8788 451.786 78.0973C457.777 75.2623 464.383 73.8448 471.604 73.8448C482.838 73.8448 491.664 77.1612 498.082 83.7941C504.555 90.4269 507.791 99.1727 507.791 110.031C507.791 116.932 506.641 123.538 504.341 129.85C502.094 136.108 498.831 141.698 494.552 146.619C490.273 151.487 485.138 155.338 479.147 158.173C473.209 161.008 466.55 162.426 459.168 162.426ZM460.211 145.496C466.148 145.496 471.15 143.704 475.215 140.12C479.28 136.483 482.356 131.936 484.442 126.48C486.528 120.97 487.571 115.407 487.571 109.791C487.571 103.746 486.047 99.0657 482.998 95.7493C479.949 92.4328 475.803 90.7746 470.561 90.7746C464.731 90.7746 459.783 92.5666 455.718 96.1505C451.652 99.7344 448.55 104.281 446.41 109.791C444.324 115.247 443.281 120.89 443.281 126.721C443.281 132.658 444.779 137.285 447.774 140.601C450.823 143.864 454.969 145.496 460.211 145.496ZM566.45 75.7704L563.722 92.0584H546.471L539.17 136.188C538.688 139.237 538.956 141.35 539.972 142.527C541.042 143.65 543.208 144.212 546.471 144.212H555.137L552.489 160.5H540.293C531.628 160.5 525.503 158.762 521.919 155.285C518.389 151.808 517.212 146.432 518.389 139.157L526.172 92.0584H511.328L514.056 75.7704H528.9L532.751 52.6624H552.97L549.199 75.7704H566.45ZM610.747 75.7704L608.019 92.0584H590.768L583.467 136.188C582.985 139.237 583.253 141.35 584.269 142.527C585.339 143.65 587.505 144.212 590.768 144.212H599.434L596.786 160.5H584.59C575.924 160.5 569.8 158.762 566.216 155.285C562.685 151.808 561.509 146.432 562.685 139.157L570.468 92.0584H555.625L558.353 75.7704H573.196L577.048 52.6624H597.267L593.496 75.7704H610.747ZM635.306 162.506C625.463 162.506 617.386 160.313 611.074 155.927C604.762 151.54 601.607 145.148 601.607 136.75C601.607 136.376 601.607 136.001 601.607 135.627C601.607 135.199 601.633 134.771 601.687 134.343H621.666C621.184 143.008 625.891 147.341 635.787 147.341C640.655 147.341 644.907 146.218 648.545 143.971C652.236 141.725 654.081 138.756 654.081 135.065C654.081 133.032 653.252 131.428 651.594 130.251C649.989 129.021 647.689 128.058 644.693 127.362L630.732 124.394C616.29 121.291 609.069 114.177 609.069 103.051C609.069 97.2203 610.753 92.1386 614.123 87.8059C617.493 83.4196 622.013 80.023 627.683 77.6159C633.407 75.1553 639.772 73.925 646.78 73.925C656.301 73.925 663.95 76.0646 669.727 80.3439C675.558 84.6232 678.473 90.5072 678.473 97.9959C678.473 99.1192 678.366 100.51 678.152 102.168H659.136C659.671 98.0494 658.735 94.8399 656.328 92.5398C653.921 90.2397 650.577 89.0897 646.298 89.0897C641.431 89.0897 637.392 90.32 634.182 92.7805C631.027 95.1876 629.449 98.0761 629.449 101.446C629.449 105.244 632.498 107.811 638.595 109.149L653.279 112.278C667.668 115.38 674.862 122.12 674.862 132.498C674.862 138.595 673.07 143.891 669.486 148.384C665.956 152.878 661.195 156.354 655.204 158.815C649.213 161.276 642.581 162.506 635.306 162.506Z"
        fill="white"
      />
    </svg>
  );
};

export default Logo;
```

**Key Points:**
- SVG component with TypeScript props
- Accepts className for sizing/styling
- Default size: `h-10 w-auto`
- Fully scalable vector logo

---

### 2. PlayersBenefits Component (`src/components/PlayersBenefits.tsx`)

A stunning benefits section with three animated cards on a vibrant blue background.

```typescript
const benefits = [
  {
    number: 1,
    title: "24/7 Accessibility",
    description: "Players can book slots anytime, anywhere, without waiting for business hours or calling the facility.",
  },
  {
    number: 2,
    title: "Instant Confirmation",
    description: "No more uncertainty—players receive immediate confirmation of their booking via email, SMS, or app notification.",
  },
  {
    number: 3,
    title: "Flexible Payment Options",
    description: "Secure online payment gateways allow players to pay instantly via cards, UPI, wallets, or net banking.",
  },
];

const PlayersBenefits = () => {
  return (
    <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
      {/* Geometric Shapes Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/10 transform rotate-45"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="text-sm font-semibold text-white">Benefits</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white italic">
            Players Benefits
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold">
                  {benefit.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayersBenefits;
```

**Component Features:**
- **Background Effects**: Decorative blurred circles and geometric shapes for visual interest
- **Badge Header**: Small pill-shaped badge with "Benefits" label
- **Responsive Grid**: 1 column on mobile, 3 columns on desktop
- **Card Animations**:
  - Hover effect with shadow increase
  - Lift effect (`-translate-y-2`) on hover
  - Smooth transitions (300ms duration)
- **Numbered Icons**: Circular badges with accent color background
- **Typography**: Bold titles, relaxed descriptions

**Color Scheme:**
- Background: `bg-primary` (Blue: hsl(234 89% 57%))
- Cards: White (`bg-white`)
- Number badges: `bg-accent` (Bright blue: hsl(211 100% 50%))

---

### 3. Footer Component (`src/components/Footer.tsx`)

A comprehensive footer with navigation, social links, and branding.

```typescript
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="dark-section py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-4 group w-fit">
              <Logo className="h-10 w-auto sm:h-12 sm:w-auto transition-transform duration-300 group-hover:scale-110" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A sports and gym booking application designed to help you find and book sports facilities, gyms, and fitness centers in Abuja.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Menu</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Facility Booking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Gym Membership
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Personal Training
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  See all
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Help</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-gray-400 hover:text-accent transition-colors">
                  Location
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>Copyright© 2025. Spotts. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

**Component Features:**
- **Dark Theme**: Uses `.dark-section` utility class for dark background
- **Four Column Grid**:
  - Brand (logo + description + social icons)
  - Menu links
  - Services links
  - Help links
- **Responsive**: 1 column mobile, 2 on tablet, 4 on desktop
- **Social Media Icons**: From `lucide-react` library with circular accent backgrounds
- **Interactive Elements**:
  - Logo scales on hover (`group-hover:scale-110`)
  - Links change to accent color on hover
  - Social icons have opacity effect on hover
- **Bottom Bar**: Copyright and legal links with border separator

**Color Scheme:**
- Background: Dark blue-gray (`hsl(220 25% 6%)`)
- Text: Light gray (`text-gray-400`)
- Headings: White (`text-white`)
- Hover state: Accent blue (`hover:text-accent`)
- Social icons: Accent background (`bg-accent`)

---

## How to Implement

### Step 1: Setup Dependencies

```bash
npm install react react-router-dom lucide-react
npm install -D typescript tailwindcss tailwindcss-animate
npx tailwindcss init -p
```

### Step 2: Configure Tailwind CSS

1. Copy the `tailwind.config.ts` content above into your Tailwind config file
2. Copy the CSS variables from the `src/index.css` section into your global CSS file
3. Ensure the config includes the `tailwindcss-animate` plugin

### Step 3: Create Component Files

Create these files in your project:
```
src/
├── components/
│   ├── Logo.tsx
│   ├── PlayersBenefits.tsx
│   └── Footer.tsx
```

Copy the respective code into each file.

### Step 4: Import Path Configuration

Ensure you have path aliases configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

And in `vite.config.ts` (if using Vite):

```typescript
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Step 5: Use the Components

In your main page component:

```typescript
import PlayersBenefits from "@/components/PlayersBenefits";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div>
      {/* Other sections... */}

      <PlayersBenefits />

      <Footer />
    </div>
  );
};

export default HomePage;
```

---

## Visual Design Explanation

### PlayersBenefits Section

**Layout Flow:**
1. Blue gradient background with decorative blur circles
2. Centered "Benefits" badge
3. Large italic heading "Players Benefits"
4. Three-column grid of benefit cards

**Card Design:**
- White background for contrast against blue
- Circular numbered badge at top (accent color)
- Bold title
- Descriptive text in gray
- Hover animation: lifts up and adds shadow

**Responsive Behavior:**
- Mobile: Single column stack
- Tablet: May show 2 columns depending on screen size
- Desktop: 3 columns side-by-side

### Footer Section

**Layout Structure:**
1. **Top Section**: 4-column grid
   - Column 1: Branding (logo + description + social icons)
   - Columns 2-4: Navigation links
2. **Bottom Section**: Copyright and legal links

**Design Details:**
- Dark background for clear visual separation from page content
- White headings for hierarchy
- Gray text for readability without being harsh
- Accent color highlights on hover for interactivity
- Social icons in circular buttons with accent background

**Responsive Behavior:**
- Mobile: Single column, stacked sections
- Tablet: 2 columns
- Desktop: 4 columns

---

## Color Reference

| Element | Color Variable | HSL Value | Hex Approximation |
|---------|---------------|-----------|-------------------|
| Primary (Blue) | `--primary` | `234 89% 57%` | `#4169ff` |
| Accent (Bright Blue) | `--accent` | `211 100% 50%` | `#0096ff` |
| Dark Background | `--dark-bg` | `220 25% 6%` | `#0c0f17` |
| Dark Foreground | `--dark-foreground` | `220 5% 95%` | `#f0f1f2` |

---

## Customization Guide

### Modify Benefits Content

Edit the `benefits` array in `PlayersBenefits.tsx`:

```typescript
const benefits = [
  {
    number: 1,
    title: "Your Custom Title",
    description: "Your custom description here",
  },
  // Add more benefits...
];
```

### Change Footer Links

Edit the link sections in `Footer.tsx`. Update `to` props for React Router links or `href` for external links.

### Update Social Media Links

Replace `href="#"` with actual social media URLs:

```typescript
<a href="https://instagram.com/yourhandle" ...>
```

### Adjust Colors

Modify CSS variables in `src/index.css`:

```css
:root {
  --primary: 234 89% 57%;  /* Change these HSL values */
  --accent: 211 100% 50%;
}
```

---

## Accessibility Notes

- All interactive elements have hover states
- Semantic HTML structure (`<section>`, `<footer>`, `<nav>`)
- Keyboard navigable links
- Screen reader friendly icon usage (consider adding `aria-label` to social links)

---

## Performance Considerations

- SVG logo is inline for faster loading
- No external image dependencies
- CSS animations use `transform` for hardware acceleration
- Tailwind CSS purges unused styles in production

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- Backdrop blur may not work in older browsers (graceful degradation)

---

## Troubleshooting

**Issue**: Colors not appearing correctly
- **Solution**: Ensure CSS variables are defined in `index.css` and Tailwind config references them

**Issue**: Links not working
- **Solution**: Ensure `react-router-dom` is installed and `BrowserRouter` wraps your app

**Issue**: Icons not showing
- **Solution**: Install `lucide-react`: `npm install lucide-react`

**Issue**: Path alias not working (`@/components/...`)
- **Solution**: Configure path aliases in both `tsconfig.json` and your bundler config (Vite/Webpack)

---

## Final Notes for Implementation

This code is production-ready and follows best practices:
- TypeScript for type safety
- Responsive design with mobile-first approach
- Reusable components
- Clean, maintainable code structure
- Optimized for performance

Copy each component exactly as shown, ensure dependencies are installed, and the components should work immediately. The design system is cohesive and professional, suitable for a modern SaaS or booking platform.

**Good luck with your implementation!**
