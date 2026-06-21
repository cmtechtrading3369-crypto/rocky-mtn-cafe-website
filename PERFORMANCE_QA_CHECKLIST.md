# Performance QA Checklist - Rocky Mountain Cafe

## Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## Pre-Deployment Performance Checks

### LCP (Largest Contentful Paint)
- [ ] Hero background image loads within 2.5s on 4G
- [ ] Hero image has explicit dimensions (aspect-ratio set)
- [ ] No render-blocking resources delay LCP
- [ ] Critical CSS is inline (above-fold styles)
- [ ] Main CSS is loaded non-blocking (media="print" trick)
- [ ] Fonts load with font-display: swap strategy
- [ ] Logo image has fetchpriority="high"
- [ ] Hero image is optimized (compressed, proper format)

### CLS (Cumulative Layout Shift)
- [ ] All images have explicit width/height attributes
- [ ] Hero section has aspect-ratio set
- [ ] Gallery images have 800x600 dimensions
- [ ] No dynamic content injection without reserved space
- [ ] Fonts don't cause layout shift (font-display: swap)
- [ ] Ads/iframes have reserved space (if applicable)
- [ ] CLS score < 0.1 on mobile and desktop

### INP (Interaction to Next Paint)
- [ ] JavaScript execution doesn't block main thread
- [ ] Event handlers are efficient
- [ ] No long tasks (>50ms) blocking interactions
- [ ] Click handlers respond within 100ms
- [ ] Mobile menu opens smoothly without lag
- [ ] Form submissions don't block UI

---

## Resource Loading

### Images
- [ ] All below-fold images have loading="lazy"
- [ ] All images have decoding="async"
- [ ] All images have explicit width/height
- [ ] Hero image has fetchpriority="high"
- [ ] Gallery images are properly sized (800x600)
- [ ] Image formats are optimal (WebP where supported)
- [ ] No unnecessary large images (>500KB for above-fold)
- [ ] Images are compressed appropriately

### Fonts
- [ ] Google Fonts use preconnect
- [ ] Fonts load with media="print" trick (non-blocking)
- [ ] Font Awesome loads with media="print" trick
- [ ] font-display: swap is used
- [ ] Only necessary font weights are loaded
- [ ] No flash of unstyled text (FOUC) or invisible text (FOIT)

### CSS
- [ ] Critical CSS is inline for above-fold content
- [ ] Main CSS loads non-blocking (media="print" trick)
- [ ] No unused CSS rules
- [ ] CSS is minified in production
- [ ] No @import statements (blocking)
- [ ] CSS file size is reasonable (<100KB gzipped)

### JavaScript
- [ ] Scripts have defer attribute
- [ ] Non-critical scripts are deferred
- [ ] Square SDK is deferred (only needed for checkout)
- [ ] No inline scripts blocking render
- [ ] JavaScript is minified in production
- [ ] No long-running scripts blocking main thread
- [ ] Event delegation used where appropriate

---

## Mobile Performance

### Network Conditions (3G/4G)
- [ ] Page loads within 3 seconds on 4G
- [ ] Page loads within 5 seconds on 3G
- [ ] Total page weight < 2MB
- [ ] JavaScript bundle < 200KB
- [ ] CSS bundle < 100KB
- [ ] Images are optimized for mobile
- [ ] No unnecessary resources on mobile

### Mobile-Specific
- [ ] Touch targets are 44px minimum
- [ ] No horizontal scrolling
- [ ] Text is readable without zoom
- [ ] Images load progressively
- [ ] Layout is stable during load
- [ ] Battery usage is reasonable

---

## Perceived Performance

### Above-the-Fold Content
- [ ] Hero section renders immediately
- [ ] Navigation bar is visible immediately
- [ ] Logo loads quickly
- [ ] Critical content is prioritized
- [ ] Skeleton screens or loading states where appropriate
- [ ] Smooth loading animations

### Loading States
- [ ] Loading indicators for slow resources
- [ ] Graceful degradation for failed loads
- [ ] Placeholder images while loading
- [ ] Progressive image loading
- [ ] Smooth transitions between states

---

## Performance Monitoring

### Tools to Use
- [ ] Google PageSpeed Insights (mobile & desktop)
- [ ] Lighthouse (Chrome DevTools)
- [ ] WebPageTest (multiple locations)
- [ ] Chrome DevTools Performance tab
- [ ] Network tab for resource analysis

### Metrics to Track
- [ ] LCP score
- [ ] FID/INP score
- [ ] CLS score
- [ ] First Contentful Paint (FCP)
- [ ] Time to Interactive (TTI)
- [ ] Total Blocking Time (TBT)
- [ ] Speed Index
- [ ] Time to First Byte (TTFB)

---

## Optimization Checklist

### Image Optimization
- [ ] Compress all JPEG images (quality 80-85%)
- [ ] Convert PNG to WebP where appropriate
- [ ] Use responsive images with srcset
- [ ] Implement lazy loading for below-fold images
- [ ] Add explicit dimensions to all images
- [ ] Use modern image formats (WebP, AVIF)

### Code Optimization
- [ ] Minify HTML, CSS, JavaScript
- [ ] Remove unused CSS/JavaScript
- [ ] Split critical CSS
- [ ] Use tree shaking for JavaScript
- [ ] Code splitting for large bundles
- [ ] Remove console.log in production

### Server Optimization
- [ ] Enable Gzip/Brotli compression
- [ ] Use HTTP/2 or HTTP/3
- [ ] Implement caching headers
- [ ] Use CDN for static assets
- [ ] Optimize TTFB (<200ms)
- [ ] Enable HTTP cache headers

---

## Regression Testing

### Before/After Comparison
- [ ] Document baseline performance metrics
- [ ] Test after each optimization
- [ ] Compare LCP, FID, CLS scores
- [ ] Verify no performance regressions
- [ ] Test on multiple devices
- [ ] Test on multiple network conditions

### Continuous Monitoring
- [ ] Set up Real User Monitoring (RUM)
- [ ] Monitor Core Web Vitals in production
- [ ] Set up performance budgets
- [ ] Alert on performance regressions
- [ ] Regular performance audits

---

## Browser Compatibility

### Performance Across Browsers
- [ ] Test in Chrome (desktop & mobile)
- [ ] Test in Safari (desktop & mobile)
- [ ] Test in Firefox (desktop & mobile)
- [ ] Test in Edge (desktop & mobile)
- [ ] Verify lazy loading support
- [ ] Verify font-display support
- [ ] Verify async/defer support

---

## Accessibility & Performance

### Accessible Performance
- [ ] Screen readers work with lazy loading
- [ ] Alt text loads before images
- [ ] Keyboard navigation works during load
- [ ] ARIA labels don't depend on JavaScript
- [ ] Performance doesn't break accessibility
