# Givetastic TEAMSBOARD Design Guidelines

## Design Approach: Design System (Productivity Focus)
**Selected Systems**: Linear (modern productivity) + Notion (clean workspaces) + Duolingo (gamification patterns)

**Core Principles**:
- Clean, data-forward interfaces prioritizing usability
- Subtle gamification that motivates without distraction
- Role-specific visual hierarchy (Employee/Admin/Coach views)
- Sustainability theme through mindful green accents

---

## Color Palette

### Light Mode
- **Background**: 0 0% 99% (off-white)
- **Surface**: 0 0% 100% (white cards)
- **Primary (Green)**: 142 76% 36% (vibrant eco-green for CTAs, progress)
- **Secondary (Green)**: 142 50% 92% (soft green backgrounds)
- **Text Primary**: 220 13% 18% (near-black)
- **Text Secondary**: 220 9% 46% (muted gray)
- **Border**: 220 13% 91% (subtle dividers)

### Dark Mode
- **Background**: 222 47% 11% (deep navy-charcoal)
- **Surface**: 217 33% 17% (elevated cards)
- **Primary (Green)**: 142 76% 42% (brightened for dark mode)
- **Secondary (Green)**: 142 30% 25% (muted green surfaces)
- **Text Primary**: 210 40% 98% (near-white)
- **Text Secondary**: 215 20% 65% (medium gray)
- **Border**: 217 33% 24% (subtle contrast)

### Accent Colors (Gamification)
- **Achievement Gold**: 45 93% 58% (medals, milestones)
- **Progress Blue**: 217 91% 60% (streaks, completion)
- **Alert Red**: 0 84% 60% (challenges, urgency)

---

## Typography

**Font Stack**: 
- Primary: `'Inter', -apple-system, system-ui, sans-serif`
- Monospace: `'JetBrains Mono', monospace` (for metrics/codes)

**Scales**:
- Hero Title: `text-5xl md:text-6xl font-bold leading-tight`
- Page Heading: `text-3xl md:text-4xl font-semibold`
- Section Title: `text-2xl font-semibold`
- Card Title: `text-lg font-medium`
- Body: `text-base leading-relaxed`
- Caption/Metrics: `text-sm font-medium tracking-wide uppercase`

---

## Layout System

**Spacing Units**: Primarily use `2, 4, 6, 8, 12, 16, 20` for consistent rhythm
- Component padding: `p-6` to `p-8`
- Section spacing: `py-12` to `py-20`
- Grid gaps: `gap-6` to `gap-8`

**Container Strategy**:
- Max-width: `max-w-7xl` for dashboards
- Card max-width: `max-w-md` to `max-w-2xl` depending on content
- Two-column layouts for Admin/Coach dashboards: `grid grid-cols-1 lg:grid-cols-2`

---

## Component Library

### Navigation Header
- Sticky top header with logo, role indicator, dark mode toggle
- User avatar with dropdown (settings, logout)
- Transparent background with backdrop-blur on scroll
- Height: `h-16` with `px-6` padding

### Hero Sections (Role-Specific)
**Employee Hero**: 
- Welcoming gradient background (green-to-teal subtle)
- Large motivational headline with today's challenge
- Quick stats bar (streak, points, rank)
- Primary CTA: "Start Today's Challenge"
- Hero image: Team collaboration or nature scene (right-aligned, 40% width on desktop)

**Admin/Coach Heroes**:
- Dashboard-focused with metric cards immediately visible
- Tabbed navigation (Overview/Teams/Reports)
- No large hero image; prioritize data density

### Board Cards
- Rounded corners `rounded-xl` with soft shadow `shadow-md hover:shadow-lg`
- Green progress bars (rounded-full) showing completion %
- Icon badges for achievements (gold star, checkmark)
- Animated on hover (subtle lift, Framer Motion)
- Card layout: Image/icon left, content center, action button right

### Metrics Bar
- Horizontal row of stat cards: `grid grid-cols-2 md:grid-cols-4 gap-4`
- Each metric: Large number (text-3xl font-bold) + label (text-sm text-secondary)
- Background: Secondary green or surface color
- Borders: `border-2 border-primary` for highlighted metrics

### Forms (Login/Code Entry)
- Centered card layout `max-w-md`
- Input fields: `border-2 focus:border-primary` with dark mode consistency
- Submit button: Full-width primary green with hover lift
- Helper text: Below inputs in muted color

### Team Boards Grid
- Masonry-style or equal-height grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
- Each team card shows: Name, total impact, top performers (avatars), progress ring
- Click reveals team detail modal or page

### Dashboards (Admin/Coach)
- Two-column layout: Left (overview metrics), Right (detailed charts/tables)
- Charts: Use green gradient fills for area charts, simple bar charts for comparisons
- Tables: Zebra striping, sortable headers, row hover states

---

## Images

### Hero Image (Employee View)
- **Placement**: Right side of hero section (desktop), below headline (mobile)
- **Description**: Diverse team high-fiving or collaborating in bright office/outdoor setting; conveys positivity and teamwork
- **Style**: Natural photography with slight green color grading
- **Dimensions**: Aspect ratio 4:3, optimized for web

### Dashboard Icons
- Use Lucide React icon library throughout
- Eco-themed icons: Leaf, Recycle, Award, TrendingUp, Users, Target

---

## Animations

**Sparingly Used**:
- Page transitions: Fade-in with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
- Card hover: Subtle scale (1.02) and shadow increase
- Progress bars: Animated fill on mount (duration: 1s, ease-out)
- Metric counters: Count-up animation for numbers

**No Animations**: 
- Background gradients
- Button interactions (rely on built-in states)
- Text elements

---

## Accessibility & Consistency

- Maintain dark mode across all inputs, modals, dropdowns
- Focus states: `ring-2 ring-primary ring-offset-2`
- Button contrast: Ensure primary green passes WCAG AA on both themes
- Alt text for all images, ARIA labels for icon-only buttons

---

**Final Note**: Design prioritizes clarity and motivation. Green theme reinforces sustainability mission without overwhelming. Gamification elements (progress bars, badges, leaderboards) are prominent but refined—celebrating achievements without frivolous decoration.