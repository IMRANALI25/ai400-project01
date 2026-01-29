#!/usr/bin/env python3
"""
Deployment Script for Website Projects

This script helps deploy websites to various platforms:
- GitHub Pages
- Netlify
- Vercel
- FTP/SFTP servers
"""

import os
import sys
import subprocess
from pathlib import Path

class WebsiteDeployer:
    """Website deployment automation"""

    def __init__(self, project_path='.'):
        self.project_path = Path(project_path).resolve()
        self.build_dir = self.project_path / 'dist'

    def deploy_to_github_pages(self, branch='gh-pages'):
        """Deploy to GitHub Pages"""
        print("\n🚀 Deploying to GitHub Pages...")

        try:
            # Check if git repository
            if not (self.project_path / '.git').exists():
                print("  ✗ Not a git repository")
                return False

            # Build project first
            print("\n📦 Building project...")
            subprocess.run(['python', 'scripts/build.py'], cwd=self.project_path, check=True)

            # Deploy using subtree
            print("\n📤 Deploying to gh-pages branch...")
            subprocess.run([
                'git', 'subtree', 'push',
                '--prefix', 'dist',
                'origin', branch
            ], cwd=self.project_path, check=True)

            print("✅ Deployed to GitHub Pages!")
            return True

        except subprocess.CalledProcessError as e:
            print(f"❌ Deployment failed: {e}")
            return False

    def deploy_to_netlify(self):
        """Deploy to Netlify using Netlify CLI"""
        print("\n🚀 Deploying to Netlify...")

        try:
            # Check if netlify CLI is installed
            result = subprocess.run(['netlify', '--version'],
                                  capture_output=True, text=True)

            if result.returncode != 0:
                print("  ℹ️  Netlify CLI not found")
                print("  💡 Install it: npm install -g netlify-cli")
                return False

            # Deploy
            subprocess.run(['netlify', 'deploy', '--prod', '--dir=dist'],
                         cwd=self.project_path, check=True)

            print("✅ Deployed to Netlify!")
            return True

        except subprocess.CalledProcessError as e:
            print(f"❌ Deployment failed: {e}")
            return False

    def deploy_to_vercel(self):
        """Deploy to Vercel using Vercel CLI"""
        print("\n🚀 Deploying to Vercel...")

        try:
            # Check if vercel CLI is installed
            result = subprocess.run(['vercel', '--version'],
                                  capture_output=True, text=True)

            if result.returncode != 0:
                print("  ℹ️  Vercel CLI not found")
                print("  💡 Install it: npm install -g vercel")
                return False

            # Deploy
            subprocess.run(['vercel', '--prod'],
                         cwd=self.project_path, check=True)

            print("✅ Deployed to Vercel!")
            return True

        except subprocess.CalledProcessError as e:
            print(f"❌ Deployment failed: {e}")
            return False

    def deploy_to_ftp(self, host, username, password, remote_path='/'):
        """Deploy to FTP server"""
        print(f"\n🚀 Deploying to FTP: {host}...")

        try:
            # Check if ftp exists
            result = subprocess.run(['ftp', '--version'],
                                  capture_output=True, text=True)

            if result.returncode != 0:
                print("  ℹ️  FTP client not found")
                print("  💡 Install FTP client or use Python's ftplib")
                return False

            print("  ℹ️  FTP deployment requires manual configuration")
            print("  💡 Consider using rsync or a deployment service")

            return False

        except Exception as e:
            print(f"❌ Deployment failed: {e}")
            return False

    def preview_deployment(self):
        """Preview deployment before publishing"""
        print("\n👁️  Previewing deployment...")

        try:
            # Start local server
            import http.server
            import socketserver

            port = 8000
            handler = http.server.SimpleHTTPRequestHandler
            os.chdir(self.build_dir)

            with socketserver.TCPServer(("", port), handler) as httpd:
                print(f"✅ Server started at http://localhost:{port}")
                print("Press Ctrl+C to stop")
                httpd.serve_forever()

        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
        except Exception as e:
            print(f"❌ Preview failed: {e}")


def main():
    """Main entry point"""
    if len(sys.argv) < 2:
        print("Usage: deploy.py <platform> [options]")
        print("\nPlatforms:")
        print("  github   - Deploy to GitHub Pages")
        print("  netlify  - Deploy to Netlify")
        print("  vercel   - Deploy to Vercel")
        print("  preview  - Preview deployment locally")
        print("\nExamples:")
        print("  python scripts/deploy.py github")
        print("  python scripts/deploy.py netlify")
        sys.exit(1)

    platform = sys.argv[1].lower()
    project_path = sys.argv[2] if len(sys.argv) > 2 else '.'

    deployer = WebsiteDeployer(project_path)

    if platform == 'github':
        deployer.deploy_to_github_pages()
    elif platform == 'netlify':
        deployer.deploy_to_netlify()
    elif platform == 'vercel':
        deployer.deploy_to_vercel()
    elif platform == 'preview':
        deployer.preview_deployment()
    else:
        print(f"❌ Unknown platform: {platform}")
        sys.exit(1)


if __name__ == '__main__':
    main()
