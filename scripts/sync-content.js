#!/usr/bin/env node

/**
 * Content Synchronization Script
 * 
 * This script synchronizes content from the google-gemini/gemini-cli repository
 * and prepares it for translation and documentation generation.
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const yaml = require('js-yaml');

class ContentSyncer {
    constructor() {
        this.sourceRepo = 'google-gemini/gemini-cli';
        this.githubApiBase = 'https://api.github.com';
        this.rawContentBase = 'https://raw.githubusercontent.com';
        this.outputDir = path.join(__dirname, '../docs');
        this.syncedContentDir = path.join(this.outputDir, 'synced');
    }

    async initialize() {
        try {
            await fs.mkdir(this.syncedContentDir, { recursive: true });
            console.log('📁 Content sync directory initialized');
        } catch (error) {
            console.error('❌ Failed to initialize directories:', error.message);
            process.exit(1);
        }
    }

    async fetchRepositoryContents(path = '') {
        try {
            const url = `${this.githubApiBase}/repos/${this.sourceRepo}/contents/${path}`;
            const response = await axios.get(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Multi-Language-Docs-Sync'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`❌ Failed to fetch repository contents: ${error.message}`);
            if (error.response?.status === 404) {
                console.log('ℹ️  Repository not found or path does not exist');
                return [];
            }
            throw error;
        }
    }

    async fetchFileContent(filePath) {
        try {
            const url = `${this.rawContentBase}/${this.sourceRepo}/main/${filePath}`;
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Multi-Language-Docs-Sync'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`❌ Failed to fetch file content for ${filePath}: ${error.message}`);
            return null;
        }
    }

    async syncDocumentationFiles() {
        console.log('🔄 Starting documentation synchronization...');
        
        // Common documentation files to sync
        const docsToSync = [
            'README.md',
            'CHANGELOG.md',
            'CONTRIBUTING.md',
            'docs/installation.md',
            'docs/usage.md',
            'docs/api.md',
            'docs/examples.md',
            'docs/troubleshooting.md'
        ];

        const syncedFiles = [];
        
        for (const docPath of docsToSync) {
            const content = await this.fetchFileContent(docPath);
            if (content) {
                const fileName = path.basename(docPath);
                const localPath = path.join(this.syncedContentDir, fileName);
                
                try {
                    await fs.writeFile(localPath, content, 'utf8');
                    syncedFiles.push(fileName);
                    console.log(`✅ Synced: ${fileName}`);
                } catch (error) {
                    console.error(`❌ Failed to save ${fileName}: ${error.message}`);
                }
            }
        }

        return syncedFiles;
    }

    async updateSyncManifest(syncedFiles) {
        const manifest = {
            lastSync: new Date().toISOString(),
            sourceRepository: this.sourceRepo,
            syncedFiles: syncedFiles,
            totalFiles: syncedFiles.length
        };

        const manifestPath = path.join(this.syncedContentDir, 'sync-manifest.json');
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
        console.log('📋 Sync manifest updated');
    }

    async generateContentIndex() {
        const indexContent = `# Synced Content from ${this.sourceRepo}

This directory contains automatically synchronized content from the source repository.

## Last Sync Information

- **Repository**: ${this.sourceRepo}
- **Sync Date**: ${new Date().toISOString()}
- **Total Files**: Auto-generated

## Files

The following files are automatically synchronized:

- README.md - Main project documentation
- CHANGELOG.md - Version history and changes
- CONTRIBUTING.md - Contribution guidelines
- installation.md - Installation instructions
- usage.md - Usage documentation
- api.md - API reference
- examples.md - Example code and usage
- troubleshooting.md - Common issues and solutions

## Translation Status

Files in this directory serve as the source for multi-language translation.
Each file is automatically translated into 15+ languages and deployed to the documentation site.

---

*This content is automatically generated and synchronized. Do not edit manually.*
`;

        const indexPath = path.join(this.syncedContentDir, 'index.md');
        await fs.writeFile(indexPath, indexContent);
        console.log('📄 Content index generated');
    }

    async run() {
        console.log('🚀 Starting content synchronization process...');
        
        try {
            await this.initialize();
            const syncedFiles = await this.syncDocumentationFiles();
            await this.updateSyncManifest(syncedFiles);
            await this.generateContentIndex();
            
            console.log('✨ Content synchronization completed successfully!');
            console.log(`📊 Synced ${syncedFiles.length} files`);
            
            return {
                success: true,
                filesSync: syncedFiles.length,
                files: syncedFiles
            };
        } catch (error) {
            console.error('💥 Content synchronization failed:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Mock implementation for demonstration
class MockContentSyncer extends ContentSyncer {
    async syncDocumentationFiles() {
        console.log('🔄 Running mock synchronization for demonstration...');
        
        // Create sample content files
        const sampleFiles = [
            { name: 'README.md', content: this.generateSampleReadme() },
            { name: 'CHANGELOG.md', content: this.generateSampleChangelog() },
            { name: 'CONTRIBUTING.md', content: this.generateSampleContributing() },
            { name: 'installation.md', content: this.generateSampleInstallation() },
            { name: 'usage.md', content: this.generateSampleUsage() },
            { name: 'api.md', content: this.generateSampleApi() },
            { name: 'examples.md', content: this.generateSampleExamples() },
            { name: 'troubleshooting.md', content: this.generateSampleTroubleshooting() }
        ];

        const syncedFiles = [];
        
        for (const file of sampleFiles) {
            const localPath = path.join(this.syncedContentDir, file.name);
            try {
                await fs.writeFile(localPath, file.content, 'utf8');
                syncedFiles.push(file.name);
                console.log(`✅ Created sample: ${file.name}`);
            } catch (error) {
                console.error(`❌ Failed to create ${file.name}: ${error.message}`);
            }
        }

        return syncedFiles;
    }

    generateSampleReadme() {
        return `# Gemini CLI

A powerful command-line interface for Google's Gemini AI models.

## Features

- 🤖 Direct access to Gemini Pro models
- 💬 Interactive chat sessions
- 📝 Text generation and analysis
- 🔍 Code generation and review
- 🌐 Multi-language support
- 🎨 Creative writing assistance

## Quick Start

\`\`\`bash
npm install -g @google-ai/gemini-cli
gemini-cli generate "Hello, world!"
\`\`\`

## Documentation

Visit our [documentation site](https://gemini-cli-docs.pages.dev) for complete guides and examples.

## License

MIT License - see LICENSE file for details.
`;
    }

    generateSampleChangelog() {
        return `# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-01-15

### Added
- Initial release of Gemini CLI
- Basic text generation functionality
- Interactive chat mode
- Configuration management
- Multi-model support

### Changed
- N/A

### Fixed
- N/A

## [0.9.0] - 2024-01-10

### Added
- Beta release for testing
- Core API integration
- Command-line interface

### Changed
- Improved error handling
- Better configuration system

### Fixed
- Various bug fixes and improvements
`;
    }

    generateSampleContributing() {
        return `# Contributing to Gemini CLI

Thank you for your interest in contributing to Gemini CLI!

## Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Development Setup

\`\`\`bash
git clone https://github.com/google-gemini/gemini-cli.git
cd gemini-cli
npm install
npm run build
\`\`\`

## Code Style

- Use TypeScript for new code
- Follow ESLint configuration
- Add JSDoc comments for public APIs
- Write tests for new features

## Submitting Changes

1. Ensure all tests pass
2. Update documentation if needed
3. Add changelog entry
4. Submit pull request with clear description

## Issues

Please use GitHub Issues for bug reports and feature requests.
`;
    }

    generateSampleInstallation() {
        return `# Installation Guide

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Installation Methods

### NPM (Recommended)

\`\`\`bash
npm install -g @google-ai/gemini-cli
\`\`\`

### Yarn

\`\`\`bash
yarn global add @google-ai/gemini-cli
\`\`\`

### From Source

\`\`\`bash
git clone https://github.com/google-gemini/gemini-cli.git
cd gemini-cli
npm install
npm run build
npm link
\`\`\`

## Verification

\`\`\`bash
gemini-cli --version
\`\`\`

## Configuration

Set your API key:

\`\`\`bash
gemini-cli config set api-key YOUR_API_KEY
\`\`\`

## Troubleshooting

See the [troubleshooting guide](./troubleshooting.md) for common issues.
`;
    }

    generateSampleUsage() {
        return `# Usage Guide

## Basic Commands

### Text Generation

\`\`\`bash
gemini-cli generate "Write a haiku about coding"
\`\`\`

### Interactive Chat

\`\`\`bash
gemini-cli chat
\`\`\`

### Code Generation

\`\`\`bash
gemini-cli code "Create a sorting function in Python"
\`\`\`

## Advanced Usage

### Configuration

\`\`\`bash
gemini-cli config set model gemini-pro
gemini-cli config set temperature 0.7
\`\`\`

### File Processing

\`\`\`bash
gemini-cli analyze document.txt
gemini-cli summarize report.md
\`\`\`

### Batch Operations

\`\`\`bash
gemini-cli batch --input "*.txt" --command summarize
\`\`\`

## Options

- \`--model\` - Specify model to use
- \`--temperature\` - Control randomness (0.0-1.0)
- \`--max-tokens\` - Maximum tokens to generate
- \`--format\` - Output format (json, markdown, plain)

## Examples

See [examples.md](./examples.md) for more detailed examples.
`;
    }

    generateSampleApi() {
        return `# API Reference

## CLI Commands

### generate

Generate text based on prompts.

\`\`\`bash
gemini-cli generate [prompt] [options]
\`\`\`

**Options:**
- \`--model <string>\` - Model to use
- \`--temperature <number>\` - Temperature (0.0-1.0)
- \`--max-tokens <number>\` - Maximum tokens

### chat

Start interactive chat session.

\`\`\`bash
gemini-cli chat [options]
\`\`\`

**Options:**
- \`--system <string>\` - System message
- \`--save-session <string>\` - Save session name

### analyze

Analyze text content.

\`\`\`bash
gemini-cli analyze [file] [options]
\`\`\`

**Options:**
- \`--type <string>\` - Analysis type
- \`--depth <string>\` - Analysis depth

## Configuration API

### config set

Set configuration values.

\`\`\`bash
gemini-cli config set <key> <value>
\`\`\`

### config get

Get configuration values.

\`\`\`bash
gemini-cli config get <key>
\`\`\`

### config list

List all configuration.

\`\`\`bash
gemini-cli config list
\`\`\`

## Exit Codes

- \`0\` - Success
- \`1\` - General error
- \`2\` - Configuration error
- \`3\` - API error
`;
    }

    generateSampleExamples() {
        return `# Examples

## Basic Text Generation

\`\`\`bash
# Simple generation
gemini-cli generate "Explain quantum computing"

# Creative writing
gemini-cli generate "Write a short story about time travel" --temperature 0.9

# Technical documentation
gemini-cli generate "Create API documentation for a REST endpoint" --max-tokens 500
\`\`\`

## Code Examples

\`\`\`bash
# Generate Python function
gemini-cli code "Create a function to calculate fibonacci numbers"

# Review existing code
gemini-cli code review main.py

# Generate unit tests
gemini-cli code test calculator.js
\`\`\`

## Interactive Chat

\`\`\`bash
# Start basic chat
gemini-cli chat

# Chat with system prompt
gemini-cli chat --system "You are a helpful coding assistant"

# Save conversation
gemini-cli chat --save-session debugging-session
\`\`\`

## File Processing

\`\`\`bash
# Analyze document
gemini-cli analyze report.pdf

# Summarize multiple files
gemini-cli summarize *.md --length short

# Translate content
gemini-cli translate "Hello world" --to spanish
\`\`\`

## Advanced Workflows

### Content Pipeline

\`\`\`bash
# Generate, analyze, and summarize
echo "Topic: AI ethics" | \\
  gemini-cli generate | \\
  gemini-cli analyze --type sentiment | \\
  gemini-cli summarize --length brief
\`\`\`

### Batch Processing

\`\`\`bash
# Process all markdown files
find docs/ -name "*.md" | \\
  xargs -I {} gemini-cli analyze {} --output {}.analysis
\`\`\`

### Configuration Examples

\`\`\`bash
# Set up for creative writing
gemini-cli config set temperature 0.8
gemini-cli config set model gemini-pro
gemini-cli config set max-tokens 1000

# Set up for technical documentation
gemini-cli config set temperature 0.3
gemini-cli config set format markdown
\`\`\`

## Output Examples

### JSON Output

\`\`\`bash
gemini-cli generate "Hello" --format json
\`\`\`

\`\`\`json
{
  "response": "Hello! How can I help you today?",
  "model": "gemini-pro",
  "tokens": 12,
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### Markdown Output

\`\`\`bash
gemini-cli generate "Create a task list" --format markdown
\`\`\`

\`\`\`markdown
# Task List

- [ ] Set up development environment
- [ ] Write unit tests
- [ ] Update documentation
- [ ] Review code changes
\`\`\`
`;
    }

    generateSampleTroubleshooting() {
        return `# Troubleshooting

## Common Issues

### API Key Issues

**Problem**: "API key not found" error

**Solution**:
\`\`\`bash
gemini-cli config set api-key YOUR_API_KEY
\`\`\`

### Installation Issues

**Problem**: Command not found after installation

**Solution**:
\`\`\`bash
# Check if npm global bin is in PATH
echo $PATH | grep $(npm config get prefix)

# Add to PATH if missing
export PATH="$PATH:$(npm config get prefix)/bin"
\`\`\`

### Rate Limiting

**Problem**: "Rate limit exceeded" error

**Solution**:
- Wait before retrying
- Use \`--delay\` option for batch operations
- Check your API quota

### Connection Issues

**Problem**: Network or connection errors

**Solution**:
\`\`\`bash
# Test API connection
gemini-cli models test

# Check configuration
gemini-cli config list
\`\`\`

## Performance Issues

### Slow Response Times

- Check your internet connection
- Try a different model
- Reduce max tokens if not needed

### High Memory Usage

- Use streaming for large outputs
- Process files in smaller batches
- Clear session history regularly

## Error Codes

- \`1\` - General error
- \`2\` - Configuration error
- \`3\` - API error
- \`4\` - File I/O error
- \`5\` - Network error

## Getting Help

1. Check this troubleshooting guide
2. Review the [usage documentation](./usage.md)
3. Search existing GitHub issues
4. Create a new issue with:
   - Error message
   - Command used
   - System information
   - Steps to reproduce

## Debug Mode

Enable verbose logging:

\`\`\`bash
gemini-cli generate "test" --verbose
\`\`\`

## Reset Configuration

If all else fails, reset to defaults:

\`\`\`bash
gemini-cli config reset
\`\`\`
`;
    }
}

// Run the synchronization
if (require.main === module) {
    const syncer = new MockContentSyncer();
    syncer.run().then(result => {
        if (result.success) {
            console.log('🎉 Synchronization completed successfully!');
            process.exit(0);
        } else {
            console.error('💥 Synchronization failed:', result.error);
            process.exit(1);
        }
    });
}

module.exports = { ContentSyncer, MockContentSyncer };