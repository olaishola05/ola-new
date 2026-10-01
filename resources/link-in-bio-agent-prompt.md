# Agent Prompt: Build Link in Bio Page
## Oladipupo Ishola — Personal Brand

---

## CONTEXT

You are building a personal link in bio page for Oladipupo Ishola, a software engineer, product builder, and educator. This page replaces a third-party tool like Linktree. It is a standalone Next.js page deployed on Vercel that acts as the single URL placed in every social media bio across all platforms.

The page must feel like an extension of the personal brand, not a generic links page. It should be fast, clean, minimal, and immediately communicate who Oladipupo is and where to find him.

---

## BRAND IDENTITY

**Name:** Oladipupo Ishola
**Tagline:** Builder. Educator. Maker.
**Primary colour:** #392467 (deep purple)
**Dark background:** #0F172A (deep navy)
**Font:** Montserrat (Google Fonts — weights 400, 500, 600, 700)
**Handle across platforms:** _olaishola (Instagram, X, TikTok) | oladipupoishola (LinkedIn, YouTube)
**YouTube channel:** Build Ship Teach (@BuildShipTeach)
**Portfolio:** https://portfolio-phi-seven-88.vercel.app

---

## WHAT TO BUILD

Build a single responsive Next.js page at the route `/links` or as a standalone deployment. The page must work as a standalone file if needed (no database, no auth, no API calls). Pure static page.

---

## PAGE STRUCTURE

### 1. Header section
- Professional headshot (circular, bordered with brand purple)
- Full name: Oladipupo Ishola in Montserrat Bold
- Tagline: Builder. Educator. Maker. in lighter weight
- One-line bio: Software engineer, product builder, and educator helping developers and founders build, ship, and monetise with AI.
- Row of small social icons linking to all platforms (no text labels, icons only)

### 2. Links section
Build each link as a full-width button card. Ordered from most important to least important. Each card has:
- An icon on the left (relevant to the link type)
- A title in bold
- A short description in smaller text
- A right-pointing chevron on the far right
- Hover state: slight lift effect and border brightens to brand purple

**Links to include in this order:**

1. **Portfolio and Work**
   - Title: My Portfolio
   - Description: Projects, case studies, and what I have built
   - URL: https://portfolio-phi-seven-88.vercel.app
   - Icon: briefcase or code bracket

2. **YouTube**
   - Title: Build Ship Teach — YouTube
   - Description: Practical tutorials on AI development, product building, and making money with tech
   - URL: https://youtube.com/@BuildShipTeach
   - Icon: play circle

3. **LinkedIn**
   - Title: Connect on LinkedIn
   - Description: Thought leadership, career updates, and professional content
   - URL: https://linkedin.com/in/oladipupoishola
   - Icon: LinkedIn logo

4. **Edtech School**
   - Title: Learn With Me
   - Description: Mentorship-led coding education for aspiring developers
   - URL: [leave as placeholder: #coming-soon with a "Coming Soon" badge]
   - Icon: graduation cap
   - Badge: Coming Soon (small pill badge in brand purple)

5. **Brand System Builder**
   - Title: Brand System Builder
   - Description: Build your complete brand system in 90 minutes with AI
   - URL: [leave as placeholder: #coming-soon with a "Coming Soon" badge]
   - Icon: sparkles or wand
   - Badge: Coming Soon

6. **GitHub**
   - Title: GitHub
   - Description: Open source work and code repositories
   - URL: https://github.com/olaishola05
   - Icon: GitHub logo

7. **Medium**
   - Title: Technical Articles on Medium
   - Description: Deep dives on web development, AI, and software engineering
   - URL: https://medium.com/@olaishola
   - Icon: M logo or pen

8. **Contact**
   - Title: Work With Me
   - Description: Available for freelance projects and collaborations
   - URL: https://portfolio-phi-seven-88.vercel.app/#contact
   - Icon: envelope

### 3. Footer
- Copyright line: © 2026 Oladipupo Ishola
- Tiny text: Built by me, obviously.
- Dark background matching #0F172A

---

## DESIGN REQUIREMENTS

**Colour scheme:**
- Page background: #0F172A (deep navy dark mode by default)
- Card background: slightly lighter than page background, approximately #1E2A40
- Card border: rgba(255,255,255,0.08) default, #392467 on hover
- Primary text: #FFFFFF
- Secondary text: rgba(255,255,255,0.6)
- Accent: #392467 (brand purple)
- Coming Soon badge: #392467 background, white text

**Typography:**
- Import Montserrat from Google Fonts (weights 400, 500, 600, 700)
- Name: 24px, weight 700
- Tagline: 14px, weight 400, secondary colour
- Bio: 13px, weight 400, secondary colour
- Link card title: 15px, weight 600
- Link card description: 12px, weight 400, secondary colour

**Layout:**
- Max width: 480px, centred on screen
- Full viewport height minimum
- Padding: 24px horizontal on mobile, auto on desktop
- Cards: 16px padding, 12px border radius, full width
- Gap between cards: 10px
- Header section bottom margin: 32px

**Interactions:**
- Card hover: translateY(-2px), border colour transitions to #392467, subtle box shadow
- Transition duration: 0.2s ease
- Cursor pointer on all cards
- Coming Soon cards: reduced opacity (0.6), cursor not-allowed, no hover effect

**Mobile first:** The page must look perfect on a 375px wide screen. No horizontal scrolling.

---

## TECH REQUIREMENTS

- Next.js 14 with TypeScript
- Tailwind CSS for styling
- No database, no auth, no API routes needed
- No third-party UI libraries
- Use next/font for Montserrat
- Use next/image for the headshot
- All links open in a new tab (target="_blank" with rel="noopener noreferrer")
- Page metadata: title "Oladipupo Ishola — Links", description matching the bio line
- Open Graph tags for social sharing
- Favicon should use the OI monogram in brand purple

---

## FILE STRUCTURE

```
app/
  links/
    page.tsx          (the main page component)
  layout.tsx          (if standalone, include Montserrat font here)
components/
  links/
    LinkCard.tsx      (reusable card component)
    SocialIcons.tsx   (row of social platform icons)
    ProfileHeader.tsx (headshot, name, tagline, bio)
public/
  headshot.jpg        (professional headshot — to be added manually)
  og-links.png        (Open Graph image — can be generated or placeholder)
```

---

## HEADSHOT NOTE

The headshot file will be added manually to the `/public` folder. Use a placeholder div with the initials "OI" in brand purple as the fallback until the image is added. The placeholder should be a 96px circle with #392467 background and white 24px bold text centered inside it.

---

## COMING SOON BEHAVIOUR

For links marked as Coming Soon:
- The card is visible but not clickable
- Cursor is not-allowed
- Opacity is 0.6
- A small pill badge saying "Coming Soon" appears on the right side instead of the chevron
- Badge: 10px font, #392467 background, white text, 4px 10px padding, full border radius

---

## EXAMPLE CARD COMPONENT INTERFACE

```typescript
interface LinkCardProps {
  title: string
  description: string
  url: string
  icon: React.ReactNode
  comingSoon?: boolean
  isNew?: boolean
}
```

---

## WHAT GOOD LOOKS LIKE

When complete this page should:
- Load in under 1 second
- Look like it belongs to the same brand as the portfolio
- Feel premium and intentional, not like a generic Linktree clone
- Work perfectly on iPhone SE (375px) up to desktop
- Have smooth hover interactions on desktop
- Show clearly what Oladipupo does and where to find him without any explanation needed

---

## DEPLOYMENT NOTE

This page can be:
- A route at `/links` on the existing portfolio (preferred)
- A standalone Next.js project deployed to `links.oladipupoishola.com` or similar

The URL placed in all social media bios should be the final deployed URL of this page.

---

*Agent prompt prepared for: Oladipupo Ishola — Personal Brand System*
*Reference files: brand-foundation.md, brand-assets.md, brand-voice-tone.md*
