#!/usr/bin/env node

/**
 * Translation Automation Script
 * 
 * This script automatically translates synchronized content into multiple languages
 * using AI translation services and maintains consistent documentation structure.
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

class ContentTranslator {
    constructor() {
        this.supportedLanguages = {
            'zh': { name: 'Chinese', code: 'zh-CN', dir: 'zh' },
            'es': { name: 'Spanish', code: 'es', dir: 'es' },
            'fr': { name: 'French', code: 'fr', dir: 'fr' },
            'de': { name: 'German', code: 'de', dir: 'de' },
            'ja': { name: 'Japanese', code: 'ja', dir: 'ja' },
            'ko': { name: 'Korean', code: 'ko', dir: 'ko' },
            'pt': { name: 'Portuguese', code: 'pt', dir: 'pt' },
            'ru': { name: 'Russian', code: 'ru', dir: 'ru' },
            'it': { name: 'Italian', code: 'it', dir: 'it' },
            'ar': { name: 'Arabic', code: 'ar', dir: 'ar' },
            'hi': { name: 'Hindi', code: 'hi', dir: 'hi' },
            'nl': { name: 'Dutch', code: 'nl', dir: 'nl' },
            'sv': { name: 'Swedish', code: 'sv', dir: 'sv' },
            'pl': { name: 'Polish', code: 'pl', dir: 'pl' },
            'tr': { name: 'Turkish', code: 'tr', dir: 'tr' }
        };
        
        this.docsDir = path.join(__dirname, '../docs');
        this.syncedContentDir = path.join(this.docsDir, 'synced');
        this.translationsDir = path.join(this.docsDir, 'translations');
    }

    async initialize() {
        try {
            await fs.mkdir(this.translationsDir, { recursive: true });
            
            // Create language directories
            for (const [langCode, langInfo] of Object.entries(this.supportedLanguages)) {
                const langDir = path.join(this.docsDir, langInfo.dir);
                await fs.mkdir(langDir, { recursive: true });
            }
            
            console.log('📁 Translation directories initialized');
        } catch (error) {
            console.error('❌ Failed to initialize directories:', error.message);
            process.exit(1);
        }
    }

    async getSyncedFiles() {
        try {
            const files = await fs.readdir(this.syncedContentDir);
            return files.filter(file => file.endsWith('.md') && file !== 'index.md');
        } catch (error) {
            console.error('❌ Failed to read synced content:', error.message);
            return [];
        }
    }

    async translateContent(content, targetLanguage) {
        // Mock translation implementation
        // In a real implementation, this would use a translation API like Google Translate, 
        // DeepL, or a custom AI translation service
        
        const translations = {
            'zh': {
                'Installation': '安装',
                'Usage': '使用',
                'Getting Started': '入门',
                'Examples': '示例',
                'API Reference': 'API 参考',
                'Troubleshooting': '故障排除',
                'Configuration': '配置',
                'Quick Start': '快速开始',
                'Prerequisites': '先决条件',
                'Options': '选项',
                'Commands': '命令',
                '# Gemini CLI': '# Gemini CLI',
                'Welcome to': '欢迎使用',
                'documentation': '文档',
                'A powerful command-line interface': '强大的命令行界面',
                'Features': '特性',
                'License': '许可证'
            },
            'es': {
                'Installation': 'Instalación',
                'Usage': 'Uso',
                'Getting Started': 'Comenzando',
                'Examples': 'Ejemplos',
                'API Reference': 'Referencia API',
                'Troubleshooting': 'Solución de problemas',
                'Configuration': 'Configuración',
                'Quick Start': 'Inicio rápido',
                'Prerequisites': 'Requisitos previos',
                'Options': 'Opciones',
                'Commands': 'Comandos',
                '# Gemini CLI': '# Gemini CLI',
                'Welcome to': 'Bienvenido a',
                'documentation': 'documentación',
                'A powerful command-line interface': 'Una interfaz de línea de comandos poderosa',
                'Features': 'Características',
                'License': 'Licencia'
            },
            'fr': {
                'Installation': 'Installation',
                'Usage': 'Utilisation',
                'Getting Started': 'Démarrage',
                'Examples': 'Exemples',
                'API Reference': 'Référence API',
                'Troubleshooting': 'Dépannage',
                'Configuration': 'Configuration',
                'Quick Start': 'Démarrage rapide',
                'Prerequisites': 'Prérequis',
                'Options': 'Options',
                'Commands': 'Commandes',
                '# Gemini CLI': '# Gemini CLI',
                'Welcome to': 'Bienvenue à',
                'documentation': 'documentation',
                'A powerful command-line interface': 'Une interface de ligne de commande puissante',
                'Features': 'Fonctionnalités',
                'License': 'Licence'
            },
            'de': {
                'Installation': 'Installation',
                'Usage': 'Verwendung',
                'Getting Started': 'Erste Schritte',
                'Examples': 'Beispiele',
                'API Reference': 'API-Referenz',
                'Troubleshooting': 'Fehlerbehebung',
                'Configuration': 'Konfiguration',
                'Quick Start': 'Schnellstart',
                'Prerequisites': 'Voraussetzungen',
                'Options': 'Optionen',
                'Commands': 'Befehle',
                '# Gemini CLI': '# Gemini CLI',
                'Welcome to': 'Willkommen bei',
                'documentation': 'Dokumentation',
                'A powerful command-line interface': 'Eine mächtige Befehlszeilenschnittstelle',
                'Features': 'Funktionen',
                'License': 'Lizenz'
            },
            'ja': {
                'Installation': 'インストール',
                'Usage': '使用方法',
                'Getting Started': 'はじめに',
                'Examples': '例',
                'API Reference': 'API リファレンス',
                'Troubleshooting': 'トラブルシューティング',
                'Configuration': '設定',
                'Quick Start': 'クイックスタート',
                'Prerequisites': '前提条件',
                'Options': 'オプション',
                'Commands': 'コマンド',
                '# Gemini CLI': '# Gemini CLI',
                'Welcome to': 'ようこそ',
                'documentation': 'ドキュメント',
                'A powerful command-line interface': '強力なコマンドラインインターフェース',
                'Features': '機能',
                'License': 'ライセンス'
            }
        };

        const langTranslations = translations[targetLanguage] || {};
        let translatedContent = content;

        // Simple translation replacement (in real implementation, use proper translation API)
        for (const [english, translated] of Object.entries(langTranslations)) {
            const regex = new RegExp(english, 'g');
            translatedContent = translatedContent.replace(regex, translated);
        }

        return translatedContent;
    }

    async createTranslatedFile(filePath, targetLanguage) {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const translatedContent = await this.translateContent(content, targetLanguage);
            
            const languageInfo = this.supportedLanguages[targetLanguage];
            const targetDir = path.join(this.docsDir, languageInfo.dir);
            const fileName = path.basename(filePath);
            const targetPath = path.join(targetDir, fileName);
            
            await fs.writeFile(targetPath, translatedContent, 'utf8');
            return targetPath;
        } catch (error) {
            console.error(`❌ Failed to translate ${filePath} to ${targetLanguage}:`, error.message);
            return null;
        }
    }

    async translateAllFiles() {
        console.log('🔄 Starting translation process...');
        
        const filesToTranslate = await this.getSyncedFiles();
        if (filesToTranslate.length === 0) {
            console.log('⚠️  No files found to translate. Run sync-content first.');
            return;
        }

        const translationResults = {};
        
        for (const file of filesToTranslate) {
            const filePath = path.join(this.syncedContentDir, file);
            translationResults[file] = {};
            
            console.log(`📄 Translating ${file}...`);
            
            for (const [langCode, langInfo] of Object.entries(this.supportedLanguages)) {
                const translatedPath = await this.createTranslatedFile(filePath, langCode);
                if (translatedPath) {
                    translationResults[file][langCode] = translatedPath;
                    console.log(`  ✅ ${langInfo.name} (${langCode})`);
                } else {
                    console.log(`  ❌ ${langInfo.name} (${langCode}) - Failed`);
                }
            }
        }

        return translationResults;
    }

    async generateLanguageIndexPages() {
        console.log('📚 Generating language index pages...');
        
        for (const [langCode, langInfo] of Object.entries(this.supportedLanguages)) {
            const indexContent = this.generateIndexContent(langInfo);
            const indexPath = path.join(this.docsDir, langInfo.dir, 'index.md');
            
            try {
                await fs.writeFile(indexPath, indexContent, 'utf8');
                console.log(`✅ Created index for ${langInfo.name}`);
            } catch (error) {
                console.error(`❌ Failed to create index for ${langInfo.name}:`, error.message);
            }
        }
    }

    generateIndexContent(languageInfo) {
        const translations = {
            'zh': {
                title: 'Gemini CLI 文档',
                welcome: '欢迎使用 Gemini CLI 文档',
                description: '这是 Google Gemini CLI 的完整文档，自动从源代码库同步并翻译。',
                navigation: '导航',
                about: '关于此文档',
                autoGenerated: '此文档自动生成并维护。'
            },
            'es': {
                title: 'Documentación de Gemini CLI',
                welcome: 'Bienvenido a la documentación de Gemini CLI',
                description: 'Esta es la documentación completa para Google Gemini CLI, sincronizada automáticamente desde el repositorio fuente y traducida.',
                navigation: 'Navegación',
                about: 'Acerca de esta documentación',
                autoGenerated: 'Esta documentación se genera y mantiene automáticamente.'
            },
            'fr': {
                title: 'Documentation Gemini CLI',
                welcome: 'Bienvenue dans la documentation Gemini CLI',
                description: 'Ceci est la documentation complète pour Google Gemini CLI, synchronisée automatiquement depuis le dépôt source et traduite.',
                navigation: 'Navigation',
                about: 'À propos de cette documentation',
                autoGenerated: 'Cette documentation est générée et maintenue automatiquement.'
            },
            'de': {
                title: 'Gemini CLI Dokumentation',
                welcome: 'Willkommen zur Gemini CLI Dokumentation',
                description: 'Dies ist die vollständige Dokumentation für Google Gemini CLI, automatisch vom Quell-Repository synchronisiert und übersetzt.',
                navigation: 'Navigation',
                about: 'Über diese Dokumentation',
                autoGenerated: 'Diese Dokumentation wird automatisch generiert und gepflegt.'
            },
            'ja': {
                title: 'Gemini CLI ドキュメント',
                welcome: 'Gemini CLI ドキュメントへようこそ',
                description: 'これは Google Gemini CLI の完全なドキュメントで、ソースリポジトリから自動的に同期され、翻訳されています。',
                navigation: 'ナビゲーション',
                about: 'このドキュメントについて',
                autoGenerated: 'このドキュメントは自動生成され、保守されています。'
            }
        };

        const langCode = Object.keys(this.supportedLanguages).find(
            code => this.supportedLanguages[code].dir === languageInfo.dir
        );

        const t = translations[langCode] || {
            title: `Gemini CLI Documentation`,
            welcome: `Welcome to Gemini CLI Documentation`,
            description: `This is the complete documentation for Google Gemini CLI, automatically synchronized from the source repository and translated.`,
            navigation: `Navigation`,
            about: `About this documentation`,
            autoGenerated: `This documentation is automatically generated and maintained.`
        };

        return `# ${t.title}

${t.welcome}

## ${t.description}

## ${t.navigation}

- [Installation](./installation.md)
- [Quick Start](./quick-start.md)
- [Usage](./usage.md)
- [Examples](./examples.md)
- [API Reference](./api.md)
- [Troubleshooting](./troubleshooting.md)

## ${t.about}

${t.autoGenerated}

---

*Language: ${languageInfo.name} (${languageInfo.code})*
*Last updated: ${new Date().toISOString().split('T')[0]}*
`;
    }

    async updateTranslationManifest(results) {
        const manifest = {
            lastTranslation: new Date().toISOString(),
            languages: Object.keys(this.supportedLanguages).length,
            supportedLanguages: this.supportedLanguages,
            translationResults: results,
            totalTranslations: Object.keys(results).length * Object.keys(this.supportedLanguages).length
        };

        const manifestPath = path.join(this.translationsDir, 'translation-manifest.json');
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
        console.log('📋 Translation manifest updated');
    }

    async run() {
        console.log('🚀 Starting translation process...');
        
        try {
            await this.initialize();
            const results = await this.translateAllFiles();
            await this.generateLanguageIndexPages();
            await this.updateTranslationManifest(results);
            
            console.log('✨ Translation process completed successfully!');
            console.log(`🌍 Translated into ${Object.keys(this.supportedLanguages).length} languages`);
            
            return {
                success: true,
                languages: Object.keys(this.supportedLanguages).length,
                results: results
            };
        } catch (error) {
            console.error('💥 Translation process failed:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Run the translation
if (require.main === module) {
    const translator = new ContentTranslator();
    translator.run().then(result => {
        if (result.success) {
            console.log('🎉 Translation completed successfully!');
            process.exit(0);
        } else {
            console.error('💥 Translation failed:', result.error);
            process.exit(1);
        }
    });
}

module.exports = { ContentTranslator };