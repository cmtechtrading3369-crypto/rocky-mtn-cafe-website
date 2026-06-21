# Mobile QA Checklist - Rocky Mountain Cafe

## Test Devices
- **iPhone SE (375px)**
- **iPhone 12/13/14 (390px)**
- **iPad/Tablet (768px-1024px)**

---

## Navigation

### 375px / 390px (Small Phones)
- [ ] Hamburger menu is visible and tappable (min 44x44px)
- [ ] Cart button appears in mobile menu when opened
- [ ] Cart button has proper touch target (min 44x44px)
- [ ] Menu opens/closes smoothly without lag
- [ ] All nav links are tappable with adequate spacing
- [ ] Logo doesn't overflow or get cut off
- [ ] Theme toggle is hidden on mobile (as designed)

### Tablet (768px-1024px)
- [ ] Full navigation is visible (no hamburger needed)
- [ ] Cart button visible in navbar
- [ ] Theme toggle visible in navbar
- [ ] All links have adequate touch targets
- [ ] Navigation doesn't crowd the content

---

## Hero Section

### 375px / 390px
- [ ] "Est. 2010" badge is readable and not too small
- [ ] "Rocky Mountain Cafe" title fits on 1-2 lines max
- [ ] Coffee cup accent icon is visible
- [ ] Tagline is readable (not too small)
- [ ] Hours badge with green dot is visible
- [ ] Social proof stacks vertically
- [ ] "View Our Menu" button is prominent and full-width
- [ ] Secondary CTAs stack vertically
- [ ] All buttons have min 44px touch targets
- [ ] No horizontal scrolling on hero
- [ ] Background image loads properly
- [ ] Text is readable over background (good contrast)

### Tablet
- [ ] Hero content is centered and balanced
- [ ] Social proof displays horizontally
- [ ] CTAs display in proper hierarchy
- [ ] No awkward spacing or gaps

---

## Info Section (Hours, Location, Contact)

### 375px / 390px
- [ ] Info cards stack vertically (1 column)
- [ ] Each card has reduced padding (not too spacious)
- [ ] Icons are appropriately sized (not too large)
- [ ] Text is readable (not too small)
- [ ] "Get Directions" link has 44px min touch target
- [ ] Phone number is tappable
- [ ] Email address is tappable
- [ ] No horizontal overflow

### Tablet
- [ ] Info cards display in appropriate grid (2-3 columns)
- [ ] Cards have proper spacing
- [ ] Links and contact info are easily tappable

---

## Menu Section

### 375px / 390px
- [ ] Menu tabs stack vertically or are scrollable
- [ ] Active tab is clearly visible
- [ ] Menu items stack in single column
- [ ] Menu items have reduced padding (not too spacious)
- [ ] Item names are readable
- [ ] Descriptions are readable (not too small)
- [ ] Prices are clearly visible
- [ ] "Add" buttons have min 44px touch targets
- [ ] "Add" buttons are easily tappable
- [ ] No horizontal scrolling on menu items
- [ ] Cart count updates when items added

### Tablet
- [ ] Menu displays in 2-3 column grid
- [ ] Menu tabs display horizontally
- [ ] All touch targets are adequate

---

## About Section & Gallery

### 375px / 390px
- [ ] Feature cards stack in single column
- [ ] Feature cards have reduced padding
- [ ] Icons are appropriately sized
- [ ] Text is readable
- [ ] **Gallery shows only 3 images** (not all 9)
- [ ] Gallery images load properly
- [ ] Gallery images are tappable (if intended)
- [ ] No excessive vertical scroll from gallery

### Tablet
- [ ] Features display in 2-3 column grid
- [ ] Gallery shows all 9 images in grid
- [ ] Gallery images load properly

---

## Reviews Section

### 375px / 390px
- [ ] Review cards stack in single column
- [ ] Review cards have reduced padding
- [ ] Star ratings are visible and readable
- [ ] Review text is readable (not too small)
- [ ] Review author names are visible
- [ ] No horizontal overflow
- [ ] "Read more reviews" link is tappable

### Tablet
- [ ] Reviews display in 2-3 column grid
- [ ] All content is easily readable

---

## Contact Form

### 375px / 390px
- [ ] Form has adequate padding (not too cramped)
- [ ] Input fields have min 48px height
- [ ] Input fields have adequate padding
- [ ] Text is readable inside inputs
- [ ] Textarea has min 120px height
- [ ] Submit button is full-width
- [ ] Submit button has min 48px height
- [ ] Submit button is easily tappable
- [ ] Form validation works on mobile
- [ ] Keyboard doesn't overlap form fields

### Tablet
- [ ] Form displays appropriately
- [ ] All fields are easily accessible

---

## Footer

### 375px / 390px
- [ ] Footer columns stack vertically
- [ ] Footer has reduced padding (not too spacious)
- [ ] Headings are readable
- [ ] Links have min 44px touch targets
- [ ] Links are easily tappable
- [ ] Social media icons have min 44px touch targets
- [ ] Social icons are easily tappable
- [ ] Copyright text is readable
- [ ] No horizontal overflow

### Tablet
- [ ] Footer displays in appropriate grid
- [ ] All links and icons are easily tappable

---

## General Mobile UX

### All Screen Sizes
- [ ] No horizontal scrolling anywhere (except intentional)
- [ ] All text is readable (minimum 16px body text)
- [ ] All interactive elements have min 44x44px touch targets
- [ ] No elements are too close together (finger-friendly spacing)
- [ ] Zoom is not required to read content
- [ ] Page loads quickly on mobile data
- [ ] Images load and display properly
- [ ] No broken layouts or overlapping content
- [ ] Scroll behavior is smooth
- [ ] No content is cut off at screen edges
- [ ] Safe areas respected (notch, home indicator)

---

## Performance

### All Devices
- [ ] Page loads within 3 seconds on 4G
- [ ] Images are optimized for mobile
- [ ] No layout shift (CLS)
- [ ] Smooth scrolling
- [ ] No janky animations

---

## Accessibility

### All Devices
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Screen reader friendly
- [ ] Color contrast meets WCAG AA standards
- [ ] Text alternatives for images

---

## Browser Testing

### 375px / 390px
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Firefox (Android)

### Tablet
- [ ] Safari (iPad)
- [ ] Chrome (Android tablet)
