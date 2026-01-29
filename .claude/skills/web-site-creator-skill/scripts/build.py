#!/usr/bin/env python3
"""
Build Automation Script for Website Projects

This script automates the build process for static websites:
- Minifies CSS files
- Minifies JavaScript files
- Optimizes images
- Generates deployment package
"""

import os
import sys
import json
import shutil
import subprocess
from pathlib import Path
from datetime import datetime

class WebsiteBuilder:
    """Build automation for website projects"""

    def __init__(self, project_path='.'):
        self.project_path = Path(project_path).resolve()
        self.build_dir = self.project_path / 'dist'
        self.timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    def clean_build_dir(self):
        """Clean the build directory"""
        if self.build_dir.exists():
            shutil.rmtree(self.build_dir)
        self.build_dir.mkdir(parents=True, exist_ok=True)
        print(f"✓ Cleaned build directory: {self.build_dir}")

    def copy_source_files(self):
        """Copy source files to build directory"""
        print("\n📄 Copying source files...")

        # Files to copy
        extensions = ['.html', '.css', '.js', '.json', '.xml', '.ico', '.txt']

        for ext in extensions:
            for file in self.project_path.rglob(f'*{ext}'):
                if 'node_modules' not in str(file):
                    relative_path = file.relative_to(self.project_path)
                    dest = self.build_dir / relative_path
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(file, dest)
                    print(f"  ✓ {relative_path}")

    def minify_css(self):
        """Minify CSS files (requires cssmin or similar)"""
        print("\n🎨 Minifying CSS...")

        css_files = list(self.build_dir.rglob('*.css'))

        for css_file in css_files:
            try:
                # Read file
                with open(css_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Simple minification (remove comments, extra whitespace)
                lines = content.split('\n')
                minified = []
                for line in lines:
                    # Remove comments
                    if '/*' in line and '*/' in line:
                        line = line[:line.index('/*')] + line[line.index('*/') + 2:]
                    # Remove extra whitespace
                    line = ' '.join(line.split())
                    if line and not line.strip().startswith('//'):
                        minified.append(line)

                minified_content = ' '.join(minified)

                # Write minified version
                with open(css_file, 'w', encoding='utf-8') as f:
                    f.write(minified_content)

                print(f"  ✓ {css_file.relative_to(self.build_dir)}")
            except Exception as e:
                print(f"  ✗ Error minifying {css_file}: {e}")

    def minify_js(self):
        """Minify JavaScript files (basic)"""
        print("\n📜 Minifying JavaScript...")

        js_files = list(self.build_dir.rglob('*.js'))

        for js_file in js_files:
            try:
                # Read file
                with open(js_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Simple minification
                lines = content.split('\n')
                minified = []
                for line in lines:
                    # Remove single-line comments
                    if '//' in line:
                        line = line[:line.index('//')]
                    # Remove extra whitespace
                    line = ' '.join(line.split())
                    if line:
                        minified.append(line)

                minified_content = ' '.join(minified)

                # Write minified version
                with open(js_file, 'w', encoding='utf-8') as f:
                    f.write(minified_content)

                print(f"  ✓ {js_file.relative_to(self.build_dir)}")
            except Exception as e:
                print(f"  ✗ Error minifying {js_file}: {e}")

    def optimize_images(self):
        """Placeholder for image optimization"""
        print("\n🖼️  Image optimization...")
        print("  ℹ️  Image optimization requires external tools like squoosh-cli or imagemin")
        print("  ℹ️  Skipping image optimization in this build")

    def create_deployment_package(self):
        """Create deployment package (zip)"""
        print("\n📦 Creating deployment package...")

        try:
            import zipfile

            zip_name = f"website_{self.timestamp}.zip"
            zip_path = self.project_path / zip_name

            with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for file in self.build_dir.rglob('*'):
                    if file.is_file():
                        arcname = file.relative_to(self.build_dir)
                        zipf.write(file, arcname)

            print(f"  ✓ Created: {zip_name}")
            return zip_path
        except Exception as e:
            print(f"  ✗ Error creating package: {e}")
            return None

    def generate_build_report(self):
        """Generate build report"""
        print("\n📊 Build Report:")
        print("=" * 50)

        # Count files
        html_files = len(list(self.build_dir.rglob('*.html')))
        css_files = len(list(self.build_dir.rglob('*.css')))
        js_files = len(list(self.build_dir.rglob('*.js')))

        # Calculate sizes
        total_size = sum(f.stat().st_size for f in self.build_dir.rglob('*') if f.is_file())
        total_size_mb = total_size / (1024 * 1024)

        print(f"  HTML Files: {html_files}")
        print(f"  CSS Files: {css_files}")
        print(f"  JavaScript Files: {js_files}")
        print(f"  Total Size: {total_size_mb:.2f} MB")
        print(f"  Build Time: {self.timestamp}")
        print("=" * 50)

    def build(self):
        """Run the complete build process"""
        print(f"\n🚀 Starting website build...")
        print(f"Project: {self.project_path}")
        print(f"Build Directory: {self.build_dir}")

        try:
            # Clean build directory
            self.clean_build_dir()

            # Copy source files
            self.copy_source_files()

            # Minify CSS and JS
            self.minify_css()
            self.minify_js()

            # Optimize images (placeholder)
            self.optimize_images()

            # Create deployment package
            self.create_deployment_package()

            # Generate report
            self.generate_build_report()

            print("\n✅ Build completed successfully!")
            return True

        except Exception as e:
            print(f"\n❌ Build failed: {e}")
            return False


def main():
    """Main entry point"""
    if len(sys.argv) > 1:
        project_path = sys.argv[1]
    else:
        project_path = '.'

    builder = WebsiteBuilder(project_path)
    success = builder.build()

    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
