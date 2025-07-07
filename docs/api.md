# API Reference

Complete API reference for Gemini CLI commands and options.

## Global Commands

### `generate`

Generate text based on a prompt.

```bash
gemini-cli generate [prompt] [options]
```

**Arguments:**
- `prompt` - Text prompt for generation (required)

**Options:**
- `--model <string>` - Model to use (default: gemini-pro)
- `--temperature <number>` - Control randomness 0.0-1.0 (default: 0.7)
- `--max-tokens <number>` - Maximum tokens to generate (default: 1000)
- `--top-p <number>` - Nucleus sampling parameter (default: 0.9)
- `--top-k <number>` - Top-k sampling parameter (default: 40)
- `--stop <string>` - Stop sequence (can be used multiple times)
- `--system <string>` - System prompt
- `--format <string>` - Output format: plain, json, markdown (default: plain)
- `--output <path>` - Save output to file
- `--stream` - Stream response in real-time

**Examples:**
```bash
# Basic generation
gemini-cli generate "Explain machine learning"

# With custom parameters
gemini-cli generate "Write a poem" --temperature 0.9 --max-tokens 200

# Save to file
gemini-cli generate "Create documentation" --output docs.md --format markdown

# Stream response
gemini-cli generate "Tell a long story" --stream
```

**Output:**
```json
{
  "response": "Generated text...",
  "model": "gemini-pro",
  "tokens_used": 156,
  "finish_reason": "stop",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### `chat`

Start an interactive chat session.

```bash
gemini-cli chat [options]
```

**Options:**
- `--model <string>` - Model to use
- `--system <string>` - System message
- `--temperature <number>` - Response randomness
- `--save-session <string>` - Save conversation with name
- `--load-session <string>` - Load previous conversation
- `--max-history <number>` - Maximum conversation history (default: 10)

**Interactive Commands:**
- `/help` - Show help
- `/clear` - Clear conversation history
- `/save <name>` - Save current session
- `/load <name>` - Load saved session
- `/model <name>` - Switch model
- `/temp <value>` - Change temperature
- `/exit` - Exit chat

**Examples:**
```bash
# Basic chat
gemini-cli chat

# With system prompt
gemini-cli chat --system "You are a helpful coding assistant"

# Save session
gemini-cli chat --save-session debugging-session
```

### `analyze`

Analyze text content from files or stdin.

```bash
gemini-cli analyze [file] [options]
```

**Arguments:**
- `file` - File to analyze (optional, uses stdin if not provided)

**Options:**
- `--type <string>` - Analysis type: sentiment, keywords, summary, structure
- `--depth <string>` - Analysis depth: brief, detailed, comprehensive
- `--format <string>` - Output format
- `--output <path>` - Save results to file

**Analysis Types:**
- `sentiment` - Sentiment analysis
- `keywords` - Extract key terms
- `summary` - Generate summary
- `structure` - Analyze document structure
- `language` - Detect language
- `readability` - Readability metrics

**Examples:**
```bash
# Analyze file
gemini-cli analyze document.txt

# Sentiment analysis
gemini-cli analyze reviews.txt --type sentiment

# Comprehensive analysis
gemini-cli analyze report.md --depth comprehensive --format json
```

### `summarize`

Generate summaries of text content.

```bash
gemini-cli summarize [file] [options]
```

**Arguments:**
- `file` - File to summarize

**Options:**
- `--length <string>` - Summary length: short, medium, long
- `--style <string>` - Summary style: bullet, paragraph, outline
- `--focus <string>` - Focus area: key-points, conclusions, recommendations
- `--ratio <number>` - Compression ratio (0.1-0.9)

**Examples:**
```bash
# Basic summary
gemini-cli summarize article.txt

# Short bullet points
gemini-cli summarize report.pdf --length short --style bullet

# Focus on conclusions
gemini-cli summarize research.md --focus conclusions
```

### `translate`

Translate text between languages.

```bash
gemini-cli translate [text] [options]
```

**Arguments:**
- `text` - Text to translate

**Options:**
- `--from <code>` - Source language code
- `--to <code>` - Target language code (required)
- `--detect` - Auto-detect source language
- `--formal` - Use formal tone
- `--preserve-format` - Preserve markdown/HTML formatting

**Supported Languages:**
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `ja` - Japanese
- `ko` - Korean
- `zh` - Chinese
- `ar` - Arabic
- `hi` - Hindi
- `pt` - Portuguese
- `ru` - Russian
- `it` - Italian
- And more...

**Examples:**
```bash
# Basic translation
gemini-cli translate "Hello world" --to es

# Auto-detect source
gemini-cli translate "Bonjour le monde" --detect --to en

# Formal translation
gemini-cli translate "How are you?" --to de --formal
```

## Code Commands

### `code generate`

Generate code based on description.

```bash
gemini-cli code generate [description] [options]
```

**Arguments:**
- `description` - Code description or requirement

**Options:**
- `--language <string>` - Programming language
- `--framework <string>` - Framework to use
- `--style <string>` - Code style: clean, optimized, verbose
- `--tests` - Include unit tests
- `--docs` - Include documentation

**Examples:**
```bash
# Generate Python function
gemini-cli code generate "Sort array using quicksort" --language python

# Generate with tests
gemini-cli code generate "API endpoint for user management" --language typescript --tests

# Generate with framework
gemini-cli code generate "React component for file upload" --language javascript --framework react
```

### `code review`

Review code for issues and improvements.

```bash
gemini-cli code review [file] [options]
```

**Arguments:**
- `file` - Code file to review

**Options:**
- `--focus <string>` - Review focus: bugs, performance, security, style
- `--severity <string>` - Minimum severity: low, medium, high, critical
- `--format <string>` - Output format
- `--suggestions` - Include improvement suggestions

**Examples:**
```bash
# Basic review
gemini-cli code review main.py

# Security-focused review
gemini-cli code review app.js --focus security

# Comprehensive review
gemini-cli code review utils.ts --suggestions --format json
```

### `code test`

Generate test cases for code.

```bash
gemini-cli code test [file] [options]
```

**Arguments:**
- `file` - Code file to test

**Options:**
- `--framework <string>` - Test framework: jest, pytest, mocha, etc.
- `--coverage <string>` - Coverage level: basic, comprehensive
- `--mock` - Include mock objects
- `--edge-cases` - Include edge case tests

**Examples:**
```bash
# Generate tests
gemini-cli code test calculator.js --framework jest

# Comprehensive tests
gemini-cli code test api.py --framework pytest --coverage comprehensive --edge-cases
```

## Image Commands

### `image describe`

Describe image content.

```bash
gemini-cli image describe [file] [options]
```

**Arguments:**
- `file` - Image file path

**Options:**
- `--detail <string>` - Detail level: brief, detailed, comprehensive
- `--focus <string>` - Focus area: objects, text, colors, composition
- `--format <string>` - Output format

**Examples:**
```bash
# Basic description
gemini-cli image describe photo.jpg

# Detailed analysis
gemini-cli image describe artwork.png --detail comprehensive --focus composition
```

### `image extract-text`

Extract text from images (OCR).

```bash
gemini-cli image extract-text [file] [options]
```

**Arguments:**
- `file` - Image file path

**Options:**
- `--language <code>` - Text language
- `--format <string>` - Output format
- `--preserve-layout` - Preserve text layout

**Examples:**
```bash
# Extract text
gemini-cli image extract-text screenshot.png

# Preserve layout
gemini-cli image extract-text document.jpg --preserve-layout --format markdown
```

## Configuration Commands

### `config set`

Set configuration values.

```bash
gemini-cli config set <key> <value>
```

**Examples:**
```bash
gemini-cli config set api-key "your-api-key"
gemini-cli config set model "gemini-pro"
gemini-cli config set temperature 0.8
```

### `config get`

Get configuration values.

```bash
gemini-cli config get <key>
```

**Examples:**
```bash
gemini-cli config get model
gemini-cli config get temperature
```

### `config list`

List all configuration.

```bash
gemini-cli config list [options]
```

**Options:**
- `--format <string>` - Output format: table, json, yaml

### `config reset`

Reset configuration to defaults.

```bash
gemini-cli config reset [options]
```

**Options:**
- `--confirm` - Skip confirmation prompt

## Template Commands

### `template create`

Create a new template.

```bash
gemini-cli template create <name> <content>
```

**Arguments:**
- `name` - Template name
- `content` - Template content with placeholders

**Examples:**
```bash
gemini-cli template create "code-review" "Review this code: {code}"
gemini-cli template create "summarize" "Summarize in {length} sentences: {text}"
```

### `template use`

Use a template.

```bash
gemini-cli template use <name> [options]
```

**Arguments:**
- `name` - Template name

**Options:**
- `--<placeholder> <value>` - Set placeholder values

**Examples:**
```bash
gemini-cli template use "code-review" --code "$(cat main.py)"
gemini-cli template use "summarize" --text "Long article..." --length 3
```

### `template list`

List available templates.

```bash
gemini-cli template list
```

## Batch Commands

### `batch`

Process multiple files or inputs.

```bash
gemini-cli batch [options]
```

**Options:**
- `--command <string>` - Command to run on each input
- `--input <pattern>` - Input file pattern
- `--output-dir <path>` - Output directory
- `--parallel <number>` - Number of parallel processes
- `--delay <ms>` - Delay between requests

**Examples:**
```bash
# Analyze all text files
gemini-cli batch --command "analyze" --input "*.txt" --output-dir results/

# Parallel processing
gemini-cli batch --command "summarize" --input "docs/*.md" --parallel 4
```

## Session Commands

### `session list`

List saved sessions.

```bash
gemini-cli session list
```

### `session show`

Show session details.

```bash
gemini-cli session show <name>
```

### `session delete`

Delete a session.

```bash
gemini-cli session delete <name>
```

## Model Commands

### `models list`

List available models.

```bash
gemini-cli models list [options]
```

**Options:**
- `--format <string>` - Output format

### `models info`

Get model information.

```bash
gemini-cli models info <model>
```

### `models test`

Test model connection.

```bash
gemini-cli models test [model]
```

## Exit Codes

- `0` - Success
- `1` - General error
- `2` - Configuration error
- `3` - API error
- `4` - File I/O error
- `5` - Network error
- `6` - Authentication error
- `7` - Rate limit error
- `8` - Invalid input error

## Error Handling

All commands return structured error information:

```json
{
  "error": {
    "code": "API_ERROR",
    "message": "Request failed",
    "details": "Rate limit exceeded",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## Rate Limits

- **Free tier**: 60 requests per minute
- **Paid tier**: 1000 requests per minute
- **Burst allowance**: 10 requests
- **Daily limits**: Vary by plan

Rate limit headers are included in responses:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`