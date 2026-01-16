# Retro UI/UX Guidelines
> **Theme**: 8-Bit Arcade / Pixel Art "Soft & Premium"

## 1. Core Philosophy
*   **Authentic Retro**: Use pixelated fonts and hard edges, but keep it readable.
*   **Modern Feel**: Smooth animations (Framer Motion) and high performance.
*   **"Soft" Hardness**: While edges are sharp (0px radius), outlines are kept subtle (2px width, reduced opacity) to avoid visual fatigue.

## 2. Design Tokens (`globals.css`)

### A. Colors (CSS Variables)
*   **Primary (Yellow)**: `#FACC15` (Used for accents, buttons, highlights).
*   **Destructive (Red)**: `#EF4444` (Used for warnings, pixel hearts/invaders).
*   **Background**: `#0a0a0a` (Deep dark, almost black).
*   **Foreground**: `#ededed` (Off-white text).

### B. Shadows (Retro)
Hard, non-blurred shadows that mimic 3D buttons.
*   `--shadow-retro`: `3px 3px 0 0 #FFFFFF` (Standard elements).
*   `--shadow-retro-sm`: `1px 1px 0 0 #FFFFFF` (Small items, borders).
*   `--shadow-retro-lg`: `6px 6px 0 0 #333333` (Large containers).

### C. Borders
*   **Standard**: `border-2` (Width 2px).
*   **Dividers/Layout**: `border-white/10` or `border-white/20` (Subtle).
*   **Interactive**: Solid `border-white` or `border-primary` depending on state.

### D. Typography
*   **Headings**: `Press Start 2P` (`font-heading`). Use `text-balance` for H1s.
*   **Body**: `Inter` (`font-sans`). Readable, clean, good contrast.
*   **Rendering**: `font-smooth: never` applied to pixel fonts for crisp edges.

## 3. Component Patterns

### Buttons (`Button.tsx`)
*   **Shape**: Rectangular, 2px border.
*   **Behavior**: On click, translates X/Y by 2px and removes shadow to simulate "pressing".
*   **Variants**: `default` (Solid/Primary), `outline` (Transparent), `pixel` (Chunky text).

### Cards (`GameCard.tsx`)
*   **Effect**: Hover lifts the card (-3px) and reveals exact shadow.
*   **Image**: `image-rendering: pixelated` class for sharp pixel art scaling.
*   **Overlay**: Hover reveals "Details" button with backdrop blur.

### Navigation
*   **Header**: Sticky with `backdrop-blur`.
*   **Links**: Pixel-button style or simple uppercase text.
*   **Language Switcher**: Discrete "EN / RU" text buttons.

## 4. Animation
*   **Transitions**: Fast (150ms-300ms).
*   **Page Load**: `nprogress` yellow bar at top.
*   **Decorations**: Floating/bouncing pixel art icons (👾, ⭐) with reduced opacity.
