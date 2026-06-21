---
name: testing-rocky-mtn-cafe
description: Test the Rocky Mountain Cafe website end-to-end. Use when verifying UI changes, navigation, or button behavior.
---

# Testing the Rocky Mountain Cafe Website

## Stack
- Static HTML/CSS/JS site (no build step)
- Deployed via Vercel (multiple projects may be connected)
- No pre-commit hooks, no linter, no test suite

## Running Locally
```bash
cd /path/to/rocky-mtn-cafe-website
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Testing Environments
- **Vercel production:** Check the Vercel bot comment on PRs for preview URLs
- **Local:** Use `python3 -m http.server 8000` from the repo root
- Vercel may deploy to multiple projects (e.g. `rocky-mtn-cafe-website.vercel.app`, `rocky-mtn-cafe-website-pro.vercel.app`). Check the PR's Vercel comment for the exact preview URL.

## Key Page Sections & IDs
The site is a single-page layout (`index.html`) with these sections:
- **Hero** (top): Contains "Order Now" (`href="#menu"`) and "Order via DoorDash" (external link) buttons
- **Menu** (`id="menu"`): "Our Menu" heading with Drinks/Food/Pastries tabs
- **About** (`id="about"`): Business info and hours
- **Reviews** (`id="reviews"`): Customer testimonials
- **Posts** (`id="posts"`): Facebook-style updates
- **Contact** (`id="contact"`): "Get In Touch" form
- **Footer**: Hours, location, social links

## Smooth Scroll Behavior
All `a[href^="#"]` links use JavaScript smooth scrolling via `initSmoothScroll()` in `script.js`. The function uses `window.scrollTo()` with an offset for the navbar height. When testing navigation links, wait ~1 second for the scroll animation to complete before verifying the target section.

## Common Test Scenarios
1. **Hero CTA buttons:** Verify "Order Now" scrolls to `#menu` and "Order via DoorDash" opens DoorDash externally
2. **Navbar links:** Home, Menu, About, Contact should scroll to their respective sections
3. **Menu tabs:** Drinks/Food/Pastries tabs should switch displayed items
4. **Cart system:** "+ Add" buttons add items to cart; cart modal opens via cart icon
5. **Contact form:** Form validation (required fields, email format)

## Tips
- The DoorDash link may show a Cloudflare verification page when accessed from a VM — this is normal and confirms correct navigation
- No CI pipeline beyond Vercel deployment checks — focus testing on visual/functional verification
- The site has no authentication or secrets requirements
