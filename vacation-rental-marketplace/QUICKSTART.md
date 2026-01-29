# StayConnect - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Test Locally

```bash
cd vacation-rental-marketplace
python -m http.server 8000
```

Open: http://localhost:8000

### 2. Customize

**Edit `index.html`:**
- Replace "StayConnect" with your brand name
- Update property listings
- Change contact info

**Edit `assets/css/main.css`:**
- Change primary color (line 9): `--primary-color: #0066CC`

### 3. Deploy

**Netlify (Recommended):**
1. Go to netlify.com
2. Drag & drop folder
3. Done!

## 📸 Add Your Images

Place in `assets/images/properties/`:
- `property-1.jpg` through `property-6.jpg`
- Size: 1200x800px
- Format: JPG or WebP

## ✅ Test These Features

- [ ] Search by location
- [ ] Filter by price/type
- [ ] Save favorites
- [ ] View property details
- [ ] Test booking form
- [ ] View map
- [ ] Mobile responsive

## 🔧 Customization

### Change Color Scheme

In `assets/css/main.css`:
```css
:root {
    --primary-color: #YOUR_COLOR;
}
```

### Add Properties

Copy a property card in `index.html` and update:
- Image
- Title
- Price
- Location
- Link

## 📱 What's Included

✅ Homepage with search
✅ 6 Sample properties
✅ Advanced filtering
✅ Interactive map
✅ Property detail pages
✅ Booking system
✅ Favorites (localStorage)
✅ Responsive design
✅ Modern UI

## 🎯 Next Steps

1. Add real property images
2. Update content with your data
3. Deploy to hosting
4. Add backend (optional)
5. Integrate payments (optional)

## 🆘 Need Help?

- Read README.md for full documentation
- Check code comments
- Test in browser console (F12)

---

**Ready to launch! 🎉**