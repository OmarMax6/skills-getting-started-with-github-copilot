# Automated Multi-Language Documentation Site

A complete solution for automatically synchronizing, translating, and deploying documentation from external repositories using VitePress and Cloudflare Pages.

## 🚀 Features

- **📂 Automatic Content Sync**: Monitors and syncs content from `google-gemini/gemini-cli` repository
- **🌍 Multi-Language Support**: Translates documentation into 15+ languages
- **⚡ VitePress Integration**: Fast, modern documentation site generation
- **☁️ Cloudflare Pages Deployment**: Global CDN distribution and hosting
- **🤖 GitHub Actions Automation**: Fully automated CI/CD pipeline
- **🔄 Zero-Cost Operation**: Optimized to use free tiers and minimize costs

## 📁 Project Structure

```
├── docs/                          # VitePress documentation
│   ├── .vitepress/
│   │   ├── config.mjs            # VitePress configuration
│   │   └── dist/                 # Built site (auto-generated)
│   ├── synced/                   # Synchronized source content
│   ├── translations/             # Translation manifests
│   ├── zh/                       # Chinese documentation
│   ├── es/                       # Spanish documentation
│   ├── fr/                       # French documentation
│   └── [other languages]/        # Additional language directories
├── scripts/
│   ├── sync-content.js           # Content synchronization
│   ├── translate-content.js      # Translation automation
│   └── deploy-cloudflare.js      # Deployment preparation
├── .github/workflows/
│   └── auto-sync-docs.yml        # GitHub Actions workflow
├── src/                          # Original FastAPI application
└── package.json                  # Node.js dependencies
```

## 🌐 Supported Languages

1. **English** (en) - Source language
2. **Chinese Simplified** (zh) - 简体中文
3. **Chinese Traditional** (zh-tw) - 繁體中文
4. **Spanish** (es) - Español
5. **French** (fr) - Français
6. **German** (de) - Deutsch
7. **Japanese** (ja) - 日本語
8. **Korean** (ko) - 한국어
9. **Portuguese** (pt) - Português
10. **Russian** (ru) - Русский
11. **Italian** (it) - Italiano
12. **Arabic** (ar) - العربية
13. **Hindi** (hi) - हिंदी
14. **Indonesian** (id) - Bahasa Indonesia
15. **Tamil** (ta) - தமிழ்
16. **Turkish** (tr) - Türkçe
13. **Dutch** (nl) - Nederlands
14. **Swedish** (sv) - Svenska
15. **Polish** (pl) - Polski
16. **Turkish** (tr) - Türkçe

## 🛠️ Setup and Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git
- Cloudflare account (for deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OmarMax6/skills-getting-started-with-github-copilot.git
   cd skills-getting-started-with-github-copilot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Sync initial content:**
   ```bash
   npm run sync:content
   ```

4. **Generate translations:**
   ```bash
   npm run translate:all
   ```

5. **Start development server:**
   ```bash
   npm run docs:dev
   ```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run docs:dev` | Start development server |
| `npm run docs:build` | Build production site |
| `npm run docs:preview` | Preview built site |
| `npm run sync:content` | Sync content from source repository |
| `npm run translate:all` | Translate content to all languages |
| `npm run deploy` | Build and deploy to Cloudflare Pages |

## 🔄 Automation Workflow

The system operates through a fully automated pipeline:

### 1. Content Synchronization
- **Trigger**: Daily at 6 AM UTC, or on manual trigger
- **Process**: 
  - Fetches latest content from `google-gemini/gemini-cli`
  - Downloads documentation files (README, installation guides, etc.)
  - Creates synchronized content in `docs/synced/`

### 2. Translation
- **Process**:
  - Processes synchronized content
  - Translates to 15 target languages
  - Maintains consistent structure across languages
  - Generates language-specific index pages

### 3. Site Generation
- **Process**:
  - Builds VitePress static site
  - Optimizes for performance and SEO
  - Generates sitemap, robots.txt, and redirects

### 4. Deployment
- **Process**:
  - Deploys to Cloudflare Pages
  - Configures global CDN distribution
  - Sets up custom headers and caching rules

## ⚙️ Configuration

### GitHub Actions Secrets

Required secrets for full automation:

```
CLOUDFLARE_API_TOKEN     # Cloudflare API token
CLOUDFLARE_ACCOUNT_ID    # Cloudflare account ID
GITHUB_TOKEN            # GitHub personal access token (automatic)
```

### Optional API Keys

For enhanced translation quality:

```
GOOGLE_TRANSLATE_API_KEY # Google Translate API
DEEPL_API_KEY           # DeepL API
```

### Environment Variables

```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
VITE_APP_VERSION=1.0.0
VITE_BUILD_DATE=2024-01-15T10:30:00Z
```

## 🚦 Manual Operations

### Sync Content Manually

```bash
# Sync from source repository
node scripts/sync-content.js

# Check sync status
ls -la docs/synced/
cat docs/synced/sync-manifest.json
```

### Translate Content Manually

```bash
# Translate all content
node scripts/translate-content.js

# Check translation status
ls -la docs/translations/
cat docs/translations/translation-manifest.json
```

### Build and Test Locally

```bash
# Development server (with hot reload)
npm run docs:dev

# Production build
npm run docs:build

# Preview production build
npm run docs:preview
```

### Deploy to Cloudflare Pages

```bash
# Prepare deployment files
node scripts/deploy-cloudflare.js

# Build and deploy (requires Cloudflare credentials)
npm run deploy
```

## 📊 Monitoring and Maintenance

### Health Checks

The system includes several health checks:

1. **Content Sync Status**: Verifies successful synchronization
2. **Translation Quality**: Monitors translation completeness
3. **Build Status**: Ensures successful site generation
4. **Deployment Status**: Confirms successful deployment

### Logs and Debugging

- **GitHub Actions**: View workflow logs in GitHub Actions tab
- **Build Logs**: Available in workflow artifacts
- **Error Reporting**: Automatic issue creation on failures
- **Performance Metrics**: Cloudflare Analytics dashboard

## 🎯 Use Cases

This system is perfect for:

- **Open Source Projects**: Automatic multi-language documentation
- **API Documentation**: Keep docs in sync with code changes
- **Product Documentation**: Multi-market product launches
- **Educational Content**: Reach global audiences
- **Technical Writing**: Streamline translation workflows

## 🔧 Customization

### Adding New Languages

1. **Update VitePress config:**
   ```javascript
   // docs/.vitepress/config.mjs
   locales: {
     // Add new language
     'new-lang': {
       label: 'New Language',
       lang: 'new-lang-code',
       dir: '/new-lang/',
       title: 'Title in New Language'
     }
   }
   ```

2. **Update translation script:**
   ```javascript
   // scripts/translate-content.js
   supportedLanguages: {
     'new-lang': { 
       name: 'New Language', 
       code: 'new-lang-code', 
       dir: 'new-lang' 
     }
   }
   ```

### Changing Source Repository

1. **Update sync script:**
   ```javascript
   // scripts/sync-content.js
   this.sourceRepo = 'owner/repo-name';
   ```

2. **Update workflow:**
   ```yaml
   # .github/workflows/auto-sync-docs.yml
   # Update repository references
   ```

### Custom Translation Providers

Replace the mock translation in `scripts/translate-content.js` with:

- Google Translate API
- DeepL API
- Azure Translator
- Custom translation service

## 📈 Performance Optimization

### Caching Strategy

- **Static Assets**: 1 year cache with immutable headers
- **HTML Pages**: 1 hour cache
- **API Responses**: Cached based on content freshness

### Build Optimization

- **Code Splitting**: Automatic by VitePress
- **Image Optimization**: WebP format with fallbacks
- **Minification**: CSS and JavaScript minification
- **Compression**: Gzip and Brotli compression

### CDN Configuration

- **Global Distribution**: Cloudflare's global network
- **Edge Caching**: Intelligent caching rules
- **DDoS Protection**: Built-in protection
- **SSL/TLS**: Automatic HTTPS with modern protocols

## 🔐 Security Considerations

- **API Key Management**: Secure storage in GitHub Secrets
- **Content Security Policy**: Strict CSP headers
- **Input Validation**: Sanitized content processing
- **Access Control**: Repository and deployment permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **VitePress**: For the excellent documentation framework
- **Cloudflare Pages**: For global hosting and CDN
- **Google Gemini**: For AI-powered content generation
- **GitHub Actions**: For automation and CI/CD

---

## Quick Start

```bash
# Clone and setup
git clone https://github.com/OmarMax6/skills-getting-started-with-github-copilot.git
cd skills-getting-started-with-github-copilot
npm install

# Sync and translate content
npm run sync:content
npm run translate:all

# Start development
npm run docs:dev

# Visit http://localhost:5173
```

**Live Demo**: [https://gemini-cli-docs.pages.dev](https://gemini-cli-docs.pages.dev) (when deployed)

For detailed instructions, see the [Installation Guide](docs/installation.md) and [Usage Documentation](docs/usage.md).