# 安装 Guide

## 先决条件

- Node.js 18.x or higher
- npm or yarn package manager

## 安装 Methods

### NPM (Recommended)

```bash
npm install -g @google-ai/gemini-cli
```

### Yarn

```bash
yarn global add @google-ai/gemini-cli
```

### From Source

```bash
git clone https://github.com/google-gemini/gemini-cli.git
cd gemini-cli
npm install
npm run build
npm link
```

## Verification

```bash
gemini-cli --version
```

## 配置

Set your API key:

```bash
gemini-cli config set api-key YOUR_API_KEY
```

## 故障排除

See the [troubleshooting guide](./troubleshooting.md) for common issues.
