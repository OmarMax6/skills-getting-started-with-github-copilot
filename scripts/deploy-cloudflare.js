#!/usr/bin/env node

/**
 * Cloudflare Pages Deployment Script
 * 
 * This script handles deployment to Cloudflare Pages with proper configuration
 * for multi-language documentation sites.
 */

const fs = require('fs').promises;
const path = require('path');

class CloudflareDeployer {
    constructor() {
        this.projectName = 'gemini-cli-docs';
        this.buildDir = path.join(__dirname, '../docs/.vitepress/dist');
        this.deploymentConfig = {
            compatibility_date: '2024-01-15',
            compatibility_flags: ['nodejs_compat'],
            build: {
                command: 'npm run docs:build',
                destination: 'docs/.vitepress/dist',
                root_dir: '.'
            },
            deployment: {
                environment_variables: {
                    NODE_VERSION: '18',
                    NPM_VERSION: '9'
                }
            },
            routes: [
                {
                    pattern: '/*',
                    destination: '/index.html'
                }
            ],
            headers: [
                {
                    source: '/*',
                    headers: [
                        {
                            key: 'X-Frame-Options',
                            value: 'DENY'
                        },
                        {
                            key: 'X-Content-Type-Options',
                            value: 'nosniff'
                        },
                        {
                            key: 'Referrer-Policy',
                            value: 'strict-origin-when-cross-origin'
                        },
                        {
                            key: 'Permissions-Policy',
                            value: 'camera=(), microphone=(), geolocation=()'
                        }
                    ]
                },
                {
                    source: '*.html',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=3600'
                        }
                    ]
                },
                {
                    source: '*.js',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=31536000, immutable'
                        }
                    ]
                },
                {
                    source: '*.css',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'public, max-age=31536000, immutable'
                        }
                    ]
                }
            ],
            redirects: [
                {
                    source: '/docs/*',
                    destination: '/:splat',
                    status: 301
                }
            ]
        };
    }

    async generateWranglerConfig() {
        const wranglerConfig = {
            name: this.projectName,
            compatibility_date: this.deploymentConfig.compatibility_date,
            compatibility_flags: this.deploymentConfig.compatibility_flags,
            pages_build_output_dir: './docs/.vitepress/dist',
            
            // Environment variables for build
            vars: {
                NODE_ENV: 'production',
                VITE_APP_VERSION: process.env.GITHUB_SHA?.slice(0, 7) || 'dev',
                VITE_BUILD_DATE: new Date().toISOString()
            },

            // Custom headers for security and performance
            pages_headers: {
                '/*': {
                    'X-Frame-Options': 'DENY',
                    'X-Content-Type-Options': 'nosniff',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
                },
                '*.html': {
                    'Cache-Control': 'public, max-age=3600'
                },
                '*.js': {
                    'Cache-Control': 'public, max-age=31536000, immutable'
                },
                '*.css': {
                    'Cache-Control': 'public, max-age=31536000, immutable'
                },
                '*.woff2': {
                    'Cache-Control': 'public, max-age=31536000, immutable'
                },
                '*.png': {
                    'Cache-Control': 'public, max-age=86400'
                },
                '*.jpg': {
                    'Cache-Control': 'public, max-age=86400'
                },
                '*.svg': {
                    'Cache-Control': 'public, max-age=86400'
                }
            },

            // Redirects for legacy URLs
            pages_redirects: [
                {
                    from: '/docs/*',
                    to: '/:splat',
                    status: 301
                },
                {
                    from: '/documentation/*',
                    to: '/:splat',
                    status: 301
                }
            ]
        };

        const configPath = path.join(__dirname, '../wrangler.toml');
        const tomlContent = this.generateTOML(wranglerConfig);
        
        await fs.writeFile(configPath, tomlContent);
        console.log('✅ Wrangler configuration generated');
        
        return configPath;
    }

    generateTOML(config) {
        return `name = "${config.name}"
compatibility_date = "${config.compatibility_date}"
compatibility_flags = ${JSON.stringify(config.compatibility_flags)}
pages_build_output_dir = "${config.pages_build_output_dir}"

[vars]
NODE_ENV = "${config.vars.NODE_ENV}"
VITE_APP_VERSION = "${config.vars.VITE_APP_VERSION}"
VITE_BUILD_DATE = "${config.vars.VITE_BUILD_DATE}"

# Custom headers for security and performance
[[headers]]
for = "/*"
  [headers.values]
  X-Frame-Options = "DENY"
  X-Content-Type-Options = "nosniff"
  Referrer-Policy = "strict-origin-when-cross-origin"
  Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"

[[headers]]
for = "*.html"
  [headers.values]
  Cache-Control = "public, max-age=3600"

[[headers]]
for = "*.js"
  [headers.values]
  Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "*.css"
  [headers.values]
  Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "*.woff2"
  [headers.values]
  Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "*.png"
  [headers.values]
  Cache-Control = "public, max-age=86400"

[[headers]]
for = "*.jpg"
  [headers.values]
  Cache-Control = "public, max-age=86400"

[[headers]]
for = "*.svg"
  [headers.values]
  Cache-Control = "public, max-age=86400"

# Redirects for legacy URLs
[[redirects]]
from = "/docs/*"
to = "/:splat"
status = 301

[[redirects]]
from = "/documentation/*"
to = "/:splat"
status = 301
`;
    }

    async generateDeploymentManifest() {
        const manifest = {
            project: this.projectName,
            deployment: {
                timestamp: new Date().toISOString(),
                commit: process.env.GITHUB_SHA || 'unknown',
                branch: process.env.GITHUB_REF_NAME || 'main',
                buildNumber: process.env.GITHUB_RUN_NUMBER || '0',
                environment: 'production'
            },
            site: {
                languages: 16,
                totalPages: 0, // Will be calculated
                features: [
                    'Multi-language support',
                    'Automatic content sync',
                    'AI-powered translations',
                    'VitePress static generation',
                    'Cloudflare Pages hosting',
                    'Global CDN distribution'
                ]
            },
            performance: {
                buildTime: 'TBD',
                cacheStrategy: 'aggressive',
                compressionEnabled: true,
                cdnEnabled: true
            }
        };

        const manifestPath = path.join(this.buildDir, 'deployment-manifest.json');
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
        console.log('📋 Deployment manifest generated');
        
        return manifest;
    }

    async optimizeBuild() {
        console.log('🔧 Optimizing build for production...');
        
        try {
            // Generate sitemap.xml
            await this.generateSitemap();
            
            // Generate robots.txt
            await this.generateRobotsTxt();
            
            // Generate _redirects file for Cloudflare Pages
            await this.generateRedirects();
            
            // Generate _headers file for Cloudflare Pages
            await this.generateHeaders();
            
            console.log('✅ Build optimization completed');
        } catch (error) {
            console.error('❌ Build optimization failed:', error.message);
            throw error;
        }
    }

    async generateSitemap() {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gemini-cli-docs.pages.dev/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://gemini-cli-docs.pages.dev/installation</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://gemini-cli-docs.pages.dev/quick-start</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://gemini-cli-docs.pages.dev/usage</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>
  <!-- Additional language versions -->
  <url>
    <loc>https://gemini-cli-docs.pages.dev/zh/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://gemini-cli-docs.pages.dev/es/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://gemini-cli-docs.pages.dev/fr/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://gemini-cli-docs.pages.dev/de/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://gemini-cli-docs.pages.dev/ja/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.9</priority>
  </url>
</urlset>`;

        const sitemapPath = path.join(this.buildDir, 'sitemap.xml');
        await fs.writeFile(sitemapPath, sitemap);
        console.log('🗺️  Sitemap generated');
    }

    async generateRobotsTxt() {
        const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://gemini-cli-docs.pages.dev/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow crawling of build artifacts
Disallow: /assets/
Disallow: /.vitepress/
Disallow: /node_modules/
`;

        const robotsPath = path.join(this.buildDir, 'robots.txt');
        await fs.writeFile(robotsPath, robots);
        console.log('🤖 Robots.txt generated');
    }

    async generateRedirects() {
        const redirects = `# Legacy redirects
/docs/* /:splat 301
/documentation/* /:splat 301

# Language redirects (if needed)
/cn/* /zh/:splat 301
/chinese/* /zh/:splat 301
/spanish/* /es/:splat 301
/french/* /fr/:splat 301
/german/* /de/:splat 301
/japanese/* /ja/:splat 301
/korean/* /ko/:splat 301
/portuguese/* /pt/:splat 301
/russian/* /ru/:splat 301
/italian/* /it/:splat 301
/arabic/* /ar/:splat 301
/hindi/* /hi/:splat 301
/dutch/* /nl/:splat 301
/swedish/* /sv/:splat 301
/polish/* /pl/:splat 301
/turkish/* /tr/:splat 301
`;

        const redirectsPath = path.join(this.buildDir, '_redirects');
        await fs.writeFile(redirectsPath, redirects);
        console.log('🔄 Redirects configuration generated');
    }

    async generateHeaders() {
        const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
  X-XSS-Protection: 1; mode=block

/*.html
  Cache-Control: public, max-age=3600

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=86400

/*.jpg
  Cache-Control: public, max-age=86400

/*.svg
  Cache-Control: public, max-age=86400

/manifest.json
  Cache-Control: public, max-age=86400
`;

        const headersPath = path.join(this.buildDir, '_headers');
        await fs.writeFile(headersPath, headers);
        console.log('📋 Headers configuration generated');
    }

    async run() {
        console.log('🚀 Starting Cloudflare Pages deployment preparation...');
        
        try {
            await this.generateWranglerConfig();
            await this.optimizeBuild();
            await this.generateDeploymentManifest();
            
            console.log('✅ Deployment preparation completed successfully!');
            console.log('🔗 Ready for deployment to Cloudflare Pages');
            
            return {
                success: true,
                projectName: this.projectName,
                buildDir: this.buildDir
            };
        } catch (error) {
            console.error('💥 Deployment preparation failed:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Run the deployment preparation
if (require.main === module) {
    const deployer = new CloudflareDeployer();
    deployer.run().then(result => {
        if (result.success) {
            console.log('🎉 Deployment preparation completed successfully!');
            process.exit(0);
        } else {
            console.error('💥 Deployment preparation failed:', result.error);
            process.exit(1);
        }
    });
}

module.exports = { CloudflareDeployer };