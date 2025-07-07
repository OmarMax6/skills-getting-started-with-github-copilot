# Installation

## System Requirements

- Node.js 18.x or higher
- npm or yarn package manager
- Git (for development)

## Installation Options

### Option 1: NPM Installation (Recommended)

```bash
npm install -g @google-ai/gemini-cli
```

### Option 2: Yarn Installation

```bash
yarn global add @google-ai/gemini-cli
```

### Option 3: Download Binary

Download the appropriate binary for your operating system from the [releases page](https://github.com/google-gemini/gemini-cli/releases).

#### Windows
```powershell
# Download and install using PowerShell
Invoke-WebRequest -Uri "https://github.com/google-gemini/gemini-cli/releases/latest/download/gemini-cli-windows.exe" -OutFile "gemini-cli.exe"
```

#### macOS
```bash
# Download and install using curl
curl -L "https://github.com/google-gemini/gemini-cli/releases/latest/download/gemini-cli-macos" -o gemini-cli
chmod +x gemini-cli
sudo mv gemini-cli /usr/local/bin/
```

#### Linux
```bash
# Download and install using wget
wget "https://github.com/google-gemini/gemini-cli/releases/latest/download/gemini-cli-linux"
chmod +x gemini-cli-linux
sudo mv gemini-cli-linux /usr/local/bin/gemini-cli
```

## Verification

After installation, verify that the CLI is working correctly:

```bash
gemini-cli --version
```

You should see output similar to:
```
Gemini CLI v1.0.0
```

## Configuration

### API Key Setup

Before using the CLI, you need to configure your Google AI API key:

```bash
# Set your API key
gemini-cli config set api-key YOUR_API_KEY

# Verify configuration
gemini-cli config list
```

### Alternative Configuration Methods

#### Environment Variable
```bash
export GEMINI_API_KEY="your-api-key-here"
```

#### Configuration File
Create a `.gemini-cli.json` file in your home directory:

```json
{
  "apiKey": "your-api-key-here",
  "model": "gemini-pro",
  "temperature": 0.7
}
```

## Getting Your API Key

1. Visit the [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Configure it using one of the methods above

## Troubleshooting Installation

### Common Issues

#### Permission Denied (macOS/Linux)
```bash
sudo npm install -g @google-ai/gemini-cli
```

#### PATH Issues
If the command is not found after installation, add the npm global bin directory to your PATH:

```bash
# Check npm global bin path
npm config get prefix

# Add to your shell profile (.bashrc, .zshrc, etc.)
export PATH="$PATH:$(npm config get prefix)/bin"
```

#### Windows Execution Policy
If you encounter execution policy errors on Windows:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Updating

To update to the latest version:

```bash
# Using npm
npm update -g @google-ai/gemini-cli

# Using yarn
yarn global upgrade @google-ai/gemini-cli
```

## Next Steps

Once installed, check out the [Quick Start guide](/quick-start) to begin using Gemini CLI.