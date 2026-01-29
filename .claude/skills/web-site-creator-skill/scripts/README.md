# Web Site Creator Skill - Build & Deploy Scripts

This directory contains utility scripts for building and deploying websites created with the web-site-creator-skill.

## Scripts

### build.py
Automates the build process for static websites.

**Features:**
- Cleans build directory
- Copies source files
- Minifies CSS and JavaScript
- Creates deployment package (ZIP)
- Generates build report

**Usage:**
```bash
# Build current directory
python scripts/build.py

# Build specific project
python scripts/build.py /path/to/project
```

**Requirements:**
- Python 3.6+

**Output:**
- Builds to `dist/` directory
- Creates `website_YYYYMMDD_HHMMSS.zip` deployment package

---

### deploy.py
Deploys websites to various hosting platforms.

**Supported Platforms:**
- GitHub Pages
- Netlify
- Vercel
- Local preview server

**Usage:**
```bash
# Deploy to GitHub Pages
python scripts/deploy.py github

# Deploy to Netlify (requires Netlify CLI)
python scripts/deploy.py netlify

# Deploy to Vercel (requires Vercel CLI)
python scripts/deploy.py vercel

# Preview locally
python scripts/deploy.py preview
```

**Requirements:**
- Python 3.6+
- Platform-specific CLI tools (Netlify CLI, Vercel CLI, etc.)
- Git repository for GitHub Pages deployment

---

## Development Workflow

### 1. Create Website
Use the web-site-creator-skill to generate your website structure.

### 2. Build Website
```bash
python scripts/build.py
```

### 3. Preview Locally
```bash
python scripts/deploy.py preview
```
Then open http://localhost:8000 in your browser.

### 4. Deploy
```bash
# Choose your platform
python scripts/deploy.py github    # or netlify, vercel
```

---

## Advanced Configuration

### Build Options

Edit `build.py` to customize:
- File extensions to copy
- Minification settings
- Image optimization
- Build output directory

### Deployment Options

Edit `deploy.py` to customize:
- Deployment branches
- Remote paths
- Authentication methods

---

## Troubleshooting

### Build Issues
- Ensure all source files exist
- Check file permissions
- Verify Python version (3.6+)

### Deployment Issues
- Verify git repository for GitHub Pages
- Install required CLI tools (Netlify/Vercel)
- Check authentication credentials
- Ensure build directory exists

---

## Best Practices

1. **Test before deploying**: Always preview locally first
2. **Version control**: Commit changes before deploying
3. **Backup**: Keep backups of working deployments
4. **Monitor**: Check deployment status and logs
5. **Rollback**: Keep previous builds for quick rollback

---

## Additional Tools

For more advanced builds, consider:
- **Webpack**: Module bundling
- **PostCSS**: CSS processing
- **ESLint**: JavaScript linting
- **Stylelint**: CSS linting
- **Prettier**: Code formatting
- **ImageOptim**: Image optimization
- **Squoosh**: WebP conversion

---

## Support

For issues or questions, refer to the main web-site-creator-skill documentation.
