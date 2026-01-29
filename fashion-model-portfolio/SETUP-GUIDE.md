# Fashion Model Portfolio - Quick Setup Guide

This guide will help you quickly set up and launch your fashion model portfolio website.

## 🚀 Quick Start (5 Minutes)

### 1. Update Your Information

Open `index.html` and find/replace these placeholders:

- **"Fashion Model"** → Your name
- **"booking@modelportfolio.com"** → Your email
- **"+1 (555) 123-4567"** → Your phone
- **"Elite Model Management"** → Your agency (if applicable)
- **Social media links** → Your actual profiles

### 2. Add Your Photos

Place images in `assets/images/optimized/`:

**Required Images:**
```
model-about.jpg       (Portrait for About section)
portfolio-1.jpg       (Gallery image 1)
portfolio-2.jpg       (Gallery image 2)
portfolio-3.jpg       (Gallery image 3)
portfolio-4.jpg       (Gallery image 4)
portfolio-5.jpg       (Gallery image 5)
portfolio-6.jpg       (Gallery image 6)
```

**Image Specifications:**
- Format: JPG or WebP (WebP recommended)
- Size: 1500x2000px (vertical), 2000x1500px (horizontal)
- File size: Under 500KB each
- Quality: High (80-90%)
- Aspect ratio: 3:4 for portfolio images

### 3. Test Locally

**Option A: Simple HTTP Server (Python)**
```bash
cd fashion-model-portfolio
python -m http.server 8000
```
Then open: http://localhost:8000

**Option B: Using Node.js (if installed)**
```bash
npm install
npm start
```
Then open: http://localhost:3000

**Option C: Using VS Code**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### 4. Deploy Online

Choose a hosting platform:

#### **Option 1: Netlify (Recommended - Free)**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `fashion-model-portfolio` folder
3. Your site is live instantly!

#### **Option 2: GitHub Pages (Free)**
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```
Then enable GitHub Pages in repository settings.

#### **Option 3: Vercel (Free)**
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Deploy automatically

#### **Option 4: Traditional Hosting**
1. Upload files via FTP to your hosting
2. Ensure `.htaccess` file is uploaded (for Apache)
3. Point your domain to the hosting

## 📝 Content Customization

### Update Portfolio Items

Find the portfolio grid in `index.html` (around line 150):

```html
<div class="col-md-6 col-lg-4 portfolio-item editorial" data-category="editorial">
    <div class="portfolio-card position-relative overflow-hidden rounded-3">
        <img src="assets/images/optimized/portfolio-1.jpg" alt="Editorial Fashion Shoot" class="portfolio-image img-fluid w-100" loading="lazy">
        <div class="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <div class="portfolio-info text-center">
                <h4 class="font-playfair text-xl font-semibold mb-2">Vogue Italia</h4>
                <p class="text-sm text-gray-300 mb-3">Editorial Shoot 2024</p>
                <button class="btn btn-light btn-sm view-gallery" data-index="0">
                    <i class="fas fa-expand-alt me-2"></i>View Gallery
                </button>
            </div>
        </div>
    </div>
</div>
```

**To add more items:**
1. Copy a portfolio-item div
2. Change `data-category` to match your category
3. Update image src, title, and description
4. Update `data-index` sequentially (0, 1, 2, 3...)

### Update Model Statistics

Find the model stats section (around line 125) and update:

```html
<div class="col-6 col-md-3">
    <p class="text-gray-300 text-sm mb-1">Height</p>
    <p class="font-semibold">5'11" (180cm)</p>
</div>
```

Replace with your actual measurements.

### Update Experience Section

Add or modify:
- Brand collaborations
- Fashion weeks
- Magazine features

Each section is clearly marked in `index.html`.

## 🎨 Design Customization

### Change Colors

Edit `assets/css/main.css` (line 8):

```css
:root {
    --primary-pink: #ec4899;        /* Change this */
    --primary-purple: #a855f7;      /* Change this */
    --dark-bg: #0a0a0a;             /* Background color */
    /* ... */
}
```

**Popular color combinations:**
- Rose Gold: `#b76e79`, `#e8b4b8`
- Royal Blue: `#1e3a8a`, `#3b82f6`
- Emerald Green: `#064e3b`, `#10b981`
- Classic Black: `#000000`, `#ffffff`

### Change Fonts

Currently using:
- **Headings**: Playfair Display (elegant serif)
- **Body**: Montserrat (modern sans-serif)

To change:
1. Visit [fonts.google.com](https://fonts.google.com/)
2. Select fonts
3. Update Google Fonts link in `index.html` (line 35)
4. Update font-family in `assets/css/main.css`

## 📧 Contact Form Setup

### Option 1: Formspree (Easiest - Free tier available)

1. Go to [formspree.io](https://formspree.io)
2. Create account and get your form ID
3. Update form in `index.html`:

```html
<form id="contactForm" class="contact-form" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
```

### Option 2: Netlify Forms (if using Netlify)

Add `netlify` attribute to form:

```html
<form id="contactForm" class="contact-form" netlify>
```

### Option 3: Custom Backend

Contact your developer to set up a backend API.

## 🔍 SEO Optimization

### Update Meta Tags

In `index.html` (lines 6-28):

```html
<title>Your Name | Fashion Model Portfolio</title>
<meta name="description" content="Your professional bio and keywords">
<meta property="og:title" content="Your Name | Fashion Model">
<!-- ... -->
```

### Update Sitemap

Edit `public/sitemap.xml`:

```xml
<loc>https://yourdomain.com/</loc>
```

Replace with your actual domain.

### Submit to Google

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Upload `sitemap.xml` location
4. Request indexing

## 📱 Mobile Testing

Before launching, test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad/Tablet
- [ ] Desktop (Chrome, Firefox, Safari, Edge)

## ✅ Launch Checklist

- [ ] All placeholder text replaced with your information
- [ ] All images uploaded and optimized
- [ ] Contact form tested and working
- [ ] All links verified and working
- [ ] Mobile responsiveness tested
- [ ] Page speed tested (aim for 90+ on PageSpeed Insights)
- [ ] SEO meta tags updated
- [ ] Google Analytics configured (optional)
- [ ] Social media links updated
- [ ] Privacy policy added (if collecting data)
- [ ] Domain configured
- [ ] SSL/HTTPS enabled
- [ ] Sitemap submitted to search engines

## 🆘 Troubleshooting

### Images not loading
- Check file paths are correct
- Ensure images are in `assets/images/optimized/`
- Verify image filenames match exactly

### Styles not working
- Clear browser cache
- Check CSS file is linked correctly
- Verify Bootstrap and TailwindCDN are loading

### Contact form not working
- Check form action URL
- Verify JavaScript console for errors
- Test form submission service

### Mobile layout issues
- Clear browser cache
- Test in different mobile browsers
- Check viewport meta tag is present

## 📚 Additional Resources

- **Image Optimization**: [squoosh.app](https://squoosh.app)
- **Performance Testing**: [pagespeed.web.dev](https://pagespeed.web.dev)
- **SEO Analysis**: [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)
- **HTML Validation**: [validator.w3.org](https://validator.w3.org)
- **Accessibility**: [wave.webaim.org](https://wave.webaim.org)

## 🎉 You're Ready!

Once you've completed the above steps, your portfolio is ready to share with the world!

Share your portfolio link on:
- Instagram bio
- Business cards
- LinkedIn profile
- Agency website
- Comp cards
- Social media posts

---

**Need Help?**
- Check the README.md for detailed documentation
- Review HTML comments in index.html
- Test in browser console for errors

**Good luck with your modeling career! 🌟**