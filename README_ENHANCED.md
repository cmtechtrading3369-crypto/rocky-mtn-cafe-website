# Rocky Mountain Cafe Website 🏔️☕

A modern, fully-featured website for Rocky Mountain Cafe in LaPorte, Indiana. Built with HTML5, CSS3, and vanilla JavaScript with a beautiful coffee-themed design.

**Live Site:** Once deployed to GitHub Pages, your site will be live at: `https://YOUR_USERNAME.github.io/rocky-mtn-cafe-website`

---

## ✨ Features

### 🎨 Modern Design
- **Beautiful Coffee-Themed Color Scheme** - Brown and orange gradient design inspired by mountain coffee culture
- **Responsive Layout** - Fully optimized for mobile, tablet, and desktop devices (768px and 480px breakpoints)
- **Smooth Animations** - Elegant transitions and scroll animations throughout
- **Premium Shadow Effects** - Modern depth and layering using CSS shadows

### 🧭 Navigation & UX
- **Sticky Navigation Bar** - Always accessible navigation with smooth active link highlighting
- **Smooth Scroll Behavior** - Click navigation items to smoothly scroll to sections
- **Live Status Indicator** - Real-time "Open/Closed" status that updates automatically
- **Mountain Icon Branding** - Professional logo integration in nav bar

### ☕ Content Sections

#### 1. **Header & Hero**
- Gradient background with cafe branding
- Live open/closed status with pulse animation
- Five-star rating display (4.9 stars, 98% recommend)
- Quick action buttons: Call Us, Email, Facebook

#### 2. **Today's Specials** 🔥
- Featured flavor of the day (Jamaican Me Crazy)
- Rotating seasonal drinks
- Price displays
- Special badges and indicators

#### 3. **About Section**
- Business description and philosophy
- 4 feature cards highlighting: Music, Gaming, Drive-Thru, Community
- Complete contact information with icons
- Address, phone, email, and hours

#### 4. **Menu System** 🍽️
- **Interactive Tab System**
  - Drinks Menu (6+ items)
  - Food Menu (4+ items)
  - Pastries Menu (3+ items)
- Menu items include:
  - Item names with descriptions
  - Pricing
  - "Most Popular" and "Must Try" badges
  - Smooth tab switching

#### 5. **Updates/Posts** 📰
- Latest news from the cafe
- Social media-style posts
- Timestamps and author info
- Link to view more on Facebook

#### 6. **Contact Form** 📧
- Full contact form with validation
- Fields: Name, Email, Phone, Message
- Real-time validation feedback
- Success/error messages
- Contact detail cards with icons

#### 7. **Customer Reviews** ⭐
- Grid layout of customer testimonials
- Individual star ratings
- Overall rating summary (4.9 stars)
- Review timestamp information
- Call-to-action for Facebook reviews

#### 8. **Footer**
- Business branding
- Quick navigation links
- Contact information
- Social media links with icons
- Copyright and operating hours

### 🎯 Interactive Features

#### JavaScript Functionality
- **Menu Tab Switching** - Click to filter menu by category with smooth transitions
- **Live Status Updates** - Automatically updates open/closed status every minute
- **Form Validation** - Email and required field validation
- **Scroll Navigation** - Active link highlighting based on scroll position
- **Smooth Scrolling** - All anchor links smoothly scroll to target sections
- **Animation on Scroll** - Cards fade in as they enter viewport
- **Responsive Behavior** - Adapts gracefully to all screen sizes

### 📱 Mobile Optimization
- Touch-friendly buttons and spacing
- Responsive grid layouts
- Optimized navigation for mobile devices
- Fast loading with minimal dependencies
- Mobile-first design approach

---

## 📋 Business Information

- **Name:** Rocky Mountain Cafe
- **Address:** 209 Lincolnway, LaPorte, IN 46350
- **Phone:** (219) 570-1234
- **Email:** rockymountaincoffee@yahoo.com
- **Hours:** 6:00 AM - 5:00 PM, 7 Days a Week
- **Rating:** 4.9 stars (98% recommend, 84 reviews)

### Featured Menu Items
- **Peanut Butter Avalanche** - Signature drink ($5.49)
- **Moose Tracks Glacier Latte** - Dark Chocolate, White Chocolate Caramel & Peanut Butter ($5.99)
- **Asiago Cheddar Bagel** - Turkey, bacon, egg, garlic & sriracha ($6.99)
- **Toasted Marshmallow Latte** - Returning favorite ($5.99)
- **Jamaican Me Crazy** - Flavor of the day (Ask in-store)

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox, grid, gradients, animations
- **JavaScript (Vanilla)** - No frameworks, pure interactive features
- **Font Awesome 6** - Professional icons (30+ icons used)
- **Google Fonts Integration** - System font stack for fast loading

### Architecture
- Mobile-first responsive design
- CSS custom properties (variables) for easy theming
- Semantic HTML structure
- No external JavaScript dependencies
- Fast loading and performance optimized

---

## 🚀 Getting Started

### Local Development
1. Clone or download this repository
2. Navigate to the project directory
3. Start a local server:
   ```bash
   python3 -m http.server 8000
   # or
   python -m http.server 8000
   ```
4. Open `http://localhost:8000` in your browser

### Project Structure
```
rocky-mtn-cafe-website/
├── index.html          # Main HTML file
├── styles.css          # All styling (1000+ lines)
├── script.js           # Interactive features and JavaScript
├── images/
│   ├── logo.png        # Cafe logo
│   ├── placeholder_1.png
│   ├── placeholder_2.png
│   ├── placeholder_3.png
│   └── placeholder_4.png
├── .gitignore          # Git ignore file
└── README.md           # This file
```

---

## 📦 Deploy to GitHub Pages

### Steps to Deploy
1. **Create a GitHub Repository**
   - Go to github.com/new
   - Name it: `rocky-mtn-cafe-website`
   - Keep it public
   - Don't initialize with README (you already have one)

2. **Connect Your Local Repository**
   ```bash
   cd /path/to/rocky-mtn-cafe-website
   git remote add origin https://github.com/YOUR_USERNAME/rocky-mtn-cafe-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to `main` branch, `/` (root) folder
   - Click Save
   - Your site will be live at: `https://YOUR_USERNAME.github.io/rocky-mtn-cafe-website/`

### Custom Domain (Optional)
- In GitHub Pages settings, add your custom domain
- Update your domain's DNS settings to point to GitHub Pages

---

## 🎨 Design Features

### Color Palette
- **Primary:** #8B4513 (Saddle Brown) - Coffee inspired
- **Accent:** #D2691E (Chocolate) - Warm accent
- **Success:** #27ae60 (Green) - Status and prices
- **Light Background:** #f0f2f5 - Easy on the eyes

### Typography
- **Font Family:** System fonts (optimized for all platforms)
- **Headlines:** 700-800 font weight, large sizes
- **Body:** Regular 400-600 weight, 0.95-1rem size
- **Line Height:** 1.6 for excellent readability

### Animations
- **Hover Effects** - Smooth transforms on interactive elements
- **Scroll Animations** - Cards fade in as they enter viewport
- **Transitions** - All 0.3s cubic-bezier for smooth motion
- **Pulse Animation** - Status indicator pulses when open

---

## 📸 Screenshots

### Desktop View
- Full navigation bar with "Order Now" button
- Beautiful coffee-colored header
- Menu tabs with smooth switching
- Contact form with side details
- Grid-based layout for all sections

### Mobile View
- Responsive navigation adapts to small screens
- Single-column layouts for easy scrolling
- Touch-optimized buttons and spacing
- Full functionality preserved on all devices

---

## ✅ Features Checklist

- [x] Modern, professional design
- [x] Fully responsive (mobile, tablet, desktop)
- [x] Live open/closed status indicator
- [x] Interactive menu tabs
- [x] Contact form with validation
- [x] Customer reviews section
- [x] Social media integration
- [x] Smooth animations and transitions
- [x] No external JS dependencies
- [x] Git version control setup
- [x] GitHub Pages ready
- [x] SEO optimized HTML structure
- [x] Accessibility considerations
- [x] Fast loading performance

---

## 🔄 Version Control

This project uses Git for version control. Initial commits include:
1. Initial project structure
2. Major enhancement with modern design and features

### To make changes
```bash
git add .
git commit -m "Your descriptive message"
git push
```

---

## 📝 Customization

### Easy to Customize
- Update business info in HTML
- Change colors in CSS variables (`:root` section)
- Modify menu items by editing HTML
- Add/remove sections as needed
- Update images in the `images/` folder

### Adding Your Own Images
- Replace `images/logo.png` with your cafe logo
- Update placeholder images with real photos
- Ensure images are optimized for web (compressed)

---

## 🎯 Future Enhancements

Potential additions:
- Photo gallery with lightbox
- Reservation system
- Online ordering integration
- Blog/news section
- Newsletter signup
- Staff profiles
- Google Maps integration
- Dark mode toggle
- Multi-language support

---

## 📞 Support

For questions about the website:
- **Email:** rockymountaincoffee@yahoo.com
- **Phone:** (219) 570-1234
- **Facebook:** facebook.com/rockymountaincafe219

---

## 📄 License

This website template is provided as-is for Rocky Mountain Cafe's use. Feel free to modify and customize it for your business needs.

---

**Last Updated:** June 19, 2026  
**Version:** 2.0 - Modern Enhanced Design

🏔️ Built with ☕ and 💙 for Rocky Mountain Cafe
