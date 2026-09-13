/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Light mode surface palette ──────────────────────────────────
        'pearl-white':   '#FFFFFF',
        'silver-cloud':  '#F7F7FA',
        'silver-mist':   '#EEEFF4',
        'silver-border': '#D8D8E4',
        'ink-black':     '#111114',
        'ink-secondary': '#44444E',
        'ink-muted':     '#8888A0',
        // ── Legacy dark tokens (kept for Fleet Observatory stage) ───────
        obsidian: '#121214',
        'soft-black': '#1A1A1E',
        'warm-charcoal': '#242429',
        'dark-slate': '#2C2C32',
        // ── Ivory & Gold (unchanged) ────────────────────────────────────
        'warm-ivory': '#F5F2EB',
        'warm-ivory-light': '#FAF8F4',
        'champagne-gold': '#C9A45C',
        'champagne-gold-light': '#DFC484',
        'champagne-gold-dark': '#A37F35',
        'muted-gray': '#8E8E93',
        'subtle-gray': '#B0B0B0',
        'light-gray': '#E5E2DB',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cormorant', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'super-wide': '0.25em',
        'architectural': '0.18em',
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #DFC484 0%, #C9A45C 50%, #9D7A38 100%)',
        'gold-subtle': 'linear-gradient(180deg, rgba(201, 164, 92, 0.15) 0%, rgba(201, 164, 92, 0.03) 100%)',
        'dark-vignette': 'radial-gradient(circle at center, rgba(17,17,17,0) 0%, rgba(9,9,9,0.85) 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'luxury-gold': '0 10px 30px -10px rgba(201, 164, 92, 0.25)',
        'ivory-soft': '0 15px 35px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
