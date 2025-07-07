# Configuration

Configure Gemini CLI to suit your needs and workflow.

## Configuration File

Gemini CLI can be configured through multiple methods:

### 1. Configuration File

Create a `.gemini-cli.json` file in your home directory:

```json
{
  "apiKey": "your-api-key-here",
  "model": "gemini-pro",
  "temperature": 0.7,
  "maxTokens": 1000,
  "format": "markdown",
  "language": "en",
  "outputDir": "./output",
  "templates": {
    "default": "Be helpful and concise",
    "creative": "Be creative and engaging",
    "technical": "Be precise and technical"
  }
}
```

### 2. Environment Variables

Set configuration through environment variables:

```bash
export GEMINI_API_KEY="your-api-key-here"
export GEMINI_MODEL="gemini-pro"
export GEMINI_TEMPERATURE="0.7"
export GEMINI_MAX_TOKENS="1000"
export GEMINI_FORMAT="markdown"
```

### 3. Command Line Options

Override configuration with command line options:

```bash
gemini-cli generate "Hello" --model gemini-pro --temperature 0.8
```

## Configuration Options

### Core Settings

| Option | Description | Default | Values |
|--------|-------------|---------|---------|
| `apiKey` | Your Google AI API key | - | String |
| `model` | AI model to use | `gemini-pro` | See [Models](#models) |
| `temperature` | Response randomness | `0.7` | 0.0 - 1.0 |
| `maxTokens` | Maximum tokens per response | `1000` | Integer |
| `format` | Output format | `plain` | `plain`, `json`, `markdown` |

### Advanced Settings

| Option | Description | Default | Values |
|--------|-------------|---------|---------|
| `topP` | Nucleus sampling parameter | `0.9` | 0.0 - 1.0 |
| `topK` | Top-k sampling parameter | `40` | Integer |
| `stopSequences` | Stop sequences | `[]` | Array of strings |
| `systemPrompt` | Default system prompt | - | String |
| `timeout` | Request timeout (ms) | `30000` | Integer |

### Output Settings

| Option | Description | Default | Values |
|--------|-------------|---------|---------|
| `outputDir` | Output directory | `./output` | Path |
| `saveOutput` | Auto-save responses | `false` | Boolean |
| `timestampFiles` | Add timestamp to filenames | `false` | Boolean |
| `filePrefix` | Prefix for output files | `gemini-` | String |

## Models

Available models and their characteristics:

### Gemini Pro
- **ID**: `gemini-pro`
- **Best for**: General text generation
- **Max tokens**: 30,720
- **Features**: Text input/output

### Gemini Pro Vision
- **ID**: `gemini-pro-vision`
- **Best for**: Image and text analysis
- **Max tokens**: 12,288
- **Features**: Image + text input, text output

### Gemini Ultra (Coming Soon)
- **ID**: `gemini-ultra`
- **Best for**: Most complex tasks
- **Max tokens**: TBD
- **Features**: Advanced reasoning

## Templates

Create reusable templates for common tasks:

### Creating Templates

```bash
gemini-cli template create "code-review" "Review this code for bugs and improvements: {code}"
gemini-cli template create "summarize" "Summarize the following text in {length} sentences: {text}"
gemini-cli template create "translate" "Translate the following text to {language}: {text}"
```

### Using Templates

```bash
gemini-cli template use "code-review" --code "$(cat main.py)"
gemini-cli template use "summarize" --text "$(cat article.txt)" --length 3
gemini-cli template use "translate" --text "Hello world" --language "Spanish"
```

### Built-in Templates

Pre-configured templates for common use cases:

- `explain` - Explain a concept
- `debug` - Debug code issues
- `optimize` - Optimize code performance
- `document` - Generate documentation
- `test` - Generate test cases

## Profiles

Create different configuration profiles for different use cases:

### Creating Profiles

```bash
gemini-cli profile create "creative" --temperature 0.9 --model gemini-pro
gemini-cli profile create "technical" --temperature 0.3 --format markdown
gemini-cli profile create "coding" --model gemini-pro --system-prompt "You are a coding assistant"
```

### Using Profiles

```bash
gemini-cli --profile creative generate "Write a story"
gemini-cli --profile technical generate "Explain quantum computing"
gemini-cli --profile coding generate "Create a Python function"
```

### Managing Profiles

```bash
# List profiles
gemini-cli profile list

# Show profile details
gemini-cli profile show creative

# Update profile
gemini-cli profile update creative --temperature 0.8

# Delete profile
gemini-cli profile delete creative
```

## Security

### API Key Security

Best practices for handling API keys:

1. **Never commit API keys to version control**
2. **Use environment variables in production**
3. **Rotate keys regularly**
4. **Use least privilege access**

### Configuration File Security

```bash
# Secure configuration file permissions
chmod 600 ~/.gemini-cli.json

# Use environment variables for sensitive data
export GEMINI_API_KEY="$(cat ~/.gemini-api-key)"
```

## Troubleshooting Configuration

### Common Issues

1. **API key not found**
   ```bash
   gemini-cli config set api-key YOUR_KEY
   ```

2. **Configuration file not loaded**
   ```bash
   gemini-cli config list
   ```

3. **Permission denied**
   ```bash
   chmod 600 ~/.gemini-cli.json
   ```

### Debug Configuration

```bash
# Show current configuration
gemini-cli config list

# Validate configuration
gemini-cli config validate

# Reset to defaults
gemini-cli config reset
```

## Migration

### From v0.x to v1.x

Breaking changes and migration guide:

1. **Configuration format changed**
   - Old: `~/.gemini-config.json`
   - New: `~/.gemini-cli.json`

2. **Environment variables renamed**
   - Old: `GEMINI_KEY`
   - New: `GEMINI_API_KEY`

3. **Model names updated**
   - Old: `gemini-pro-latest`
   - New: `gemini-pro`

### Migration Script

```bash
# Run migration helper
gemini-cli migrate --from v0.x --to v1.x

# Manual migration
cp ~/.gemini-config.json ~/.gemini-cli.json
# Edit file to update format
```

## Examples

### Development Configuration

```json
{
  "apiKey": "${GEMINI_API_KEY}",
  "model": "gemini-pro",
  "temperature": 0.7,
  "format": "markdown",
  "saveOutput": true,
  "outputDir": "./dev-output",
  "systemPrompt": "You are a helpful development assistant"
}
```

### Production Configuration

```json
{
  "apiKey": "${GEMINI_API_KEY}",
  "model": "gemini-pro",
  "temperature": 0.3,
  "format": "json",
  "timeout": 60000,
  "maxTokens": 2000,
  "systemPrompt": "Provide accurate and concise responses"
}
```

### Creative Writing Configuration

```json
{
  "apiKey": "${GEMINI_API_KEY}",
  "model": "gemini-pro",
  "temperature": 0.9,
  "format": "markdown",
  "maxTokens": 4000,
  "systemPrompt": "You are a creative writing assistant"
}
```