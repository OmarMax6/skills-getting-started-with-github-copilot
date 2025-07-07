# Usage Guide

Complete reference for all Gemini CLI commands and options.

## Command Overview

```bash
gemini-cli [command] [options] [arguments]
```

## Global Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--help` | `-h` | Show help information | - |
| `--version` | `-v` | Show version information | - |
| `--config` | `-c` | Specify config file path | `~/.gemini-cli.json` |
| `--verbose` | `-V` | Enable verbose output | `false` |
| `--quiet` | `-q` | Suppress output | `false` |
| `--format` | `-f` | Output format (json, markdown, plain) | `plain` |

## Core Commands

### `generate`

Generate text based on prompts.

```bash
gemini-cli generate [prompt] [options]
```

**Options:**
- `--model` - Specify model to use
- `--temperature` - Control randomness (0.0-1.0)
- `--max-tokens` - Maximum tokens to generate
- `--top-p` - Nucleus sampling parameter
- `--top-k` - Top-k sampling parameter
- `--stop` - Stop sequences
- `--output` - Output file path

**Examples:**
```bash
# Basic generation
gemini-cli generate "Explain machine learning"

# With parameters
gemini-cli generate "Write a poem" --temperature 0.9 --max-tokens 100

# Save to file
gemini-cli generate "Technical documentation" --output docs.md
```

### `chat`

Start interactive chat session.

```bash
gemini-cli chat [options]
```

**Options:**
- `--system` - System message/prompt
- `--save-session` - Save conversation history
- `--load-session` - Load previous conversation

**Examples:**
```bash
# Start basic chat
gemini-cli chat

# Chat with system prompt
gemini-cli chat --system "You are a helpful coding assistant"

# Save session
gemini-cli chat --save-session my-session
```

### `analyze`

Analyze text content from files or stdin.

```bash
gemini-cli analyze [file] [options]
```

**Options:**
- `--type` - Analysis type (sentiment, keywords, summary)
- `--depth` - Analysis depth (brief, detailed, comprehensive)
- `--output` - Output file path

**Examples:**
```bash
# Analyze file
gemini-cli analyze document.txt

# Sentiment analysis
gemini-cli analyze reviews.txt --type sentiment

# Comprehensive analysis
gemini-cli analyze report.md --depth comprehensive
```

### `summarize`

Generate summaries of text content.

```bash
gemini-cli summarize [file] [options]
```

**Options:**
- `--length` - Summary length (short, medium, long)
- `--style` - Summary style (bullet, paragraph, outline)
- `--focus` - Focus areas (key-points, conclusions, recommendations)

**Examples:**
```bash
# Basic summary
gemini-cli summarize article.txt

# Short bullet points
gemini-cli summarize report.pdf --length short --style bullet

# Focus on key points
gemini-cli summarize meeting-notes.md --focus key-points
```

### `translate`

Translate text between languages.

```bash
gemini-cli translate [text] [options]
```

**Options:**
- `--from` - Source language code
- `--to` - Target language code
- `--detect` - Auto-detect source language
- `--formal` - Use formal tone

**Examples:**
```bash
# Basic translation
gemini-cli translate "Hello world" --to es

# Auto-detect source
gemini-cli translate "Bonjour le monde" --detect --to en

# Formal translation
gemini-cli translate "How are you?" --to de --formal
```

### `code`

Code generation and analysis commands.

```bash
gemini-cli code [subcommand] [options]
```

**Subcommands:**
- `generate` - Generate code
- `review` - Review code
- `test` - Generate tests
- `document` - Generate documentation
- `refactor` - Suggest refactoring

**Examples:**
```bash
# Generate code
gemini-cli code generate "Sort algorithm in Python"

# Review code
gemini-cli code review main.py

# Generate tests
gemini-cli code test calculator.js

# Document code
gemini-cli code document --file utils.py
```

### `image`

Image analysis and description.

```bash
gemini-cli image [subcommand] [file] [options]
```

**Subcommands:**
- `describe` - Describe image content
- `extract-text` - Extract text from image
- `analyze` - Analyze image composition

**Examples:**
```bash
# Describe image
gemini-cli image describe photo.jpg

# Extract text
gemini-cli image extract-text screenshot.png

# Analyze composition
gemini-cli image analyze artwork.jpg
```

## Configuration Commands

### `config`

Manage CLI configuration.

```bash
gemini-cli config [subcommand] [options]
```

**Subcommands:**
- `set` - Set configuration value
- `get` - Get configuration value
- `list` - List all configuration
- `reset` - Reset to defaults

**Examples:**
```bash
# Set API key
gemini-cli config set api-key YOUR_KEY

# Get current model
gemini-cli config get model

# List all settings
gemini-cli config list

# Reset to defaults
gemini-cli config reset
```

### `models`

Manage and list available models.

```bash
gemini-cli models [subcommand] [options]
```

**Subcommands:**
- `list` - List available models
- `info` - Get model information
- `test` - Test model connection

**Examples:**
```bash
# List models
gemini-cli models list

# Get model info
gemini-cli models info gemini-pro

# Test connection
gemini-cli models test
```

## Advanced Usage

### Pipeline Operations

```bash
# Chaining commands
echo "Input text" | gemini-cli analyze | gemini-cli summarize

# Multiple file processing
find . -name "*.md" | xargs -I {} gemini-cli analyze {}
```

### Batch Processing

```bash
# Process multiple files
gemini-cli batch --command "summarize" --input "*.txt" --output-dir summaries/

# Parallel processing
gemini-cli batch --command "analyze" --input "docs/*.md" --parallel 4
```

### Custom Templates

```bash
# Create template
gemini-cli template create "bug-report" "Create a bug report for: {issue}"

# Use template
gemini-cli template use "bug-report" --issue "Login button not working"

# List templates
gemini-cli template list
```

### Session Management

```bash
# Save session
gemini-cli chat --save-session project-discussion

# Load session
gemini-cli chat --load-session project-discussion

# List sessions
gemini-cli session list

# Delete session
gemini-cli session delete project-discussion
```

## Output Formats

### JSON Output

```bash
gemini-cli generate "Hello world" --format json
```

```json
{
  "response": "Hello! How can I help you today?",
  "model": "gemini-pro",
  "tokens_used": 12,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Markdown Output

```bash
gemini-cli generate "Write a guide" --format markdown
```

### Plain Text (Default)

```bash
gemini-cli generate "Simple response"
```

## Error Handling

### Exit Codes

- `0` - Success
- `1` - General error
- `2` - Configuration error
- `3` - API error
- `4` - File I/O error
- `5` - Network error

### Verbose Mode

```bash
gemini-cli generate "Test" --verbose
```

Shows detailed information about:
- API requests and responses
- Configuration loading
- File operations
- Error details

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | API key | `your-api-key` |
| `GEMINI_MODEL` | Default model | `gemini-pro` |
| `GEMINI_CONFIG` | Config file path | `/path/to/config.json` |
| `GEMINI_TEMPERATURE` | Default temperature | `0.7` |
| `GEMINI_MAX_TOKENS` | Default max tokens | `1000` |

## Best Practices

1. **Use specific prompts** for better results
2. **Adjust temperature** based on use case
3. **Use templates** for repeated tasks
4. **Save sessions** for ongoing conversations
5. **Monitor token usage** for cost control
6. **Use batch processing** for multiple files
7. **Implement error handling** in scripts

## Performance Tips

- Use `--quiet` mode for scripts
- Implement rate limiting for batch operations
- Cache responses when appropriate
- Use appropriate model for task complexity
- Monitor API usage and limits