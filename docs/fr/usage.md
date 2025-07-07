# Utilisation Guide

## Basic Commandes

### Text Generation

```bash
gemini-cli generate "Write a haiku about coding"
```

### Interactive Chat

```bash
gemini-cli chat
```

### Code Generation

```bash
gemini-cli code "Create a sorting function in Python"
```

## Advanced Utilisation

### Configuration

```bash
gemini-cli config set model gemini-pro
gemini-cli config set temperature 0.7
```

### File Processing

```bash
gemini-cli analyze document.txt
gemini-cli summarize report.md
```

### Batch Operations

```bash
gemini-cli batch --input "*.txt" --command summarize
```

## Options

- `--model` - Specify model to use
- `--temperature` - Control randomness (0.0-1.0)
- `--max-tokens` - Maximum tokens to generate
- `--format` - Output format (json, markdown, plain)

## Exemples

See [examples.md](./examples.md) for more detailed examples.
