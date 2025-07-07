# Examples

Comprehensive examples for common Gemini CLI use cases.

## Basic Usage Examples

### Simple Text Generation

```bash
# Generate a simple response
gemini-cli generate "What is artificial intelligence?"

# Generate with specific parameters
gemini-cli generate "Write a haiku about coding" --temperature 0.8 --max-tokens 50
```

### Creative Writing

```bash
# Generate a story
gemini-cli generate "Write a short story about a robot learning to paint" --temperature 0.9 --max-tokens 500

# Generate poetry
gemini-cli generate "Create a sonnet about the beauty of mathematics" --format markdown
```

### Technical Documentation

```bash
# Explain a concept
gemini-cli generate "Explain REST API principles for beginners" --temperature 0.3 --format markdown

# Create documentation
gemini-cli generate "Write API documentation for a user authentication endpoint" --max-tokens 1000
```

## Code Generation Examples

### Python Examples

```bash
# Generate a function
gemini-cli code generate "Create a Python function to calculate the factorial of a number"

# Generate with tests
gemini-cli code generate "Create a Python class for a binary search tree" --tests --docs

# Generate with specific framework
gemini-cli code generate "Create a FastAPI endpoint for user registration" --framework fastapi
```

### JavaScript Examples

```bash
# Generate React component
gemini-cli code generate "Create a React component for a todo list" --language javascript --framework react

# Generate Node.js API
gemini-cli code generate "Create an Express.js route for file upload" --language javascript --framework express

# Generate async function
gemini-cli code generate "Create a JavaScript function that fetches data from multiple APIs concurrently"
```

### TypeScript Examples

```bash
# Generate typed interface
gemini-cli code generate "Create TypeScript interfaces for an e-commerce product catalog" --language typescript

# Generate class with decorators
gemini-cli code generate "Create a TypeScript class for user authentication with decorators" --language typescript --framework nestjs
```

## Code Review Examples

### Security Review

```bash
# Review for security issues
gemini-cli code review auth.py --focus security

# Comprehensive security analysis
gemini-cli code review api.js --focus security --severity high --suggestions
```

### Performance Review

```bash
# Review for performance issues
gemini-cli code review data-processor.py --focus performance

# Database query optimization
gemini-cli code review queries.sql --focus performance --suggestions
```

### Code Style Review

```bash
# Review code style
gemini-cli code review main.js --focus style

# Comprehensive style review
gemini-cli code review utils.py --focus style --suggestions --format json
```

## File Processing Examples

### Document Analysis

```bash
# Analyze document sentiment
gemini-cli analyze customer-feedback.txt --type sentiment

# Extract keywords
gemini-cli analyze research-paper.pdf --type keywords --depth comprehensive

# Analyze document structure
gemini-cli analyze report.md --type structure --format json
```

### Content Summarization

```bash
# Create brief summary
gemini-cli summarize long-article.txt --length short

# Create bullet point summary
gemini-cli summarize meeting-notes.md --style bullet --focus key-points

# Create executive summary
gemini-cli summarize quarterly-report.pdf --length medium --focus conclusions
```

### Translation Examples

```bash
# Translate to Spanish
gemini-cli translate "Hello, how are you today?" --to es

# Translate document
gemini-cli translate --file document.txt --to fr --preserve-format

# Auto-detect and translate
gemini-cli translate "¿Cómo estás?" --detect --to en
```

## Interactive Chat Examples

### Coding Assistant

```bash
# Start coding session
gemini-cli chat --system "You are an expert Python developer" --save-session python-help

# Continue previous session
gemini-cli chat --load-session python-help
```

### Creative Writing Assistant

```bash
# Start creative writing session
gemini-cli chat --system "You are a creative writing coach" --temperature 0.8 --save-session writing-session
```

### Technical Support

```bash
# Start technical support session
gemini-cli chat --system "You are a helpful technical support specialist" --save-session tech-support
```

## Batch Processing Examples

### Analyze Multiple Files

```bash
# Analyze all markdown files
gemini-cli batch --command "analyze --type summary" --input "docs/*.md" --output-dir summaries/

# Process with parallel execution
gemini-cli batch --command "summarize --length short" --input "articles/*.txt" --parallel 4 --output-dir summaries/
```

### Code Review Batch

```bash
# Review all Python files
gemini-cli batch --command "code review --focus bugs" --input "src/*.py" --output-dir reviews/

# Security review for JavaScript files
gemini-cli batch --command "code review --focus security" --input "**/*.js" --output-dir security-reviews/
```

### Translation Batch

```bash
# Translate all documentation to Spanish
gemini-cli batch --command "translate --to es" --input "docs/*.md" --output-dir docs-es/

# Multi-language translation
for lang in es fr de ja; do
  gemini-cli batch --command "translate --to $lang" --input "docs/*.md" --output-dir "docs-$lang/"
done
```

## Template Examples

### Create Custom Templates

```bash
# Create bug report template
gemini-cli template create "bug-report" "Create a detailed bug report for: {issue}. Include steps to reproduce, expected behavior, and actual behavior."

# Create code documentation template
gemini-cli template create "doc-function" "Generate comprehensive documentation for this function: {code}. Include parameters, return values, and examples."

# Create email template
gemini-cli template create "professional-email" "Write a professional email about: {topic}. Tone should be {tone}. Include: {details}"
```

### Use Custom Templates

```bash
# Use bug report template
gemini-cli template use "bug-report" --issue "Login button not working on mobile devices"

# Use documentation template
gemini-cli template use "doc-function" --code "$(cat utils.py)"

# Use email template
gemini-cli template use "professional-email" --topic "Project deadline extension" --tone "polite" --details "Need 2 extra days due to technical issues"
```

## Advanced Workflow Examples

### Content Creation Pipeline

```bash
#!/bin/bash
# Content creation and optimization pipeline

# 1. Generate initial content
gemini-cli generate "Write an article about machine learning basics" --max-tokens 2000 --output draft.md

# 2. Analyze and improve
gemini-cli analyze draft.md --type structure --output analysis.json

# 3. Create summary
gemini-cli summarize draft.md --length short --output summary.md

# 4. Translate to multiple languages
for lang in es fr de ja; do
  gemini-cli translate --file draft.md --to $lang --output "draft-$lang.md"
done

echo "Content pipeline completed!"
```

### Code Quality Pipeline

```bash
#!/bin/bash
# Code quality and documentation pipeline

# 1. Review code for issues
gemini-cli code review src/main.py --focus bugs --output review.md

# 2. Generate documentation
gemini-cli code generate "Generate comprehensive documentation for this Python module" --code "$(cat src/main.py)" --output docs.md

# 3. Create unit tests
gemini-cli code test src/main.py --framework pytest --coverage comprehensive --output tests.py

# 4. Analyze code complexity
gemini-cli analyze src/main.py --type structure --output complexity.json

echo "Code quality pipeline completed!"
```

### Multi-language Documentation

```bash
#!/bin/bash
# Multi-language documentation generation

# Source files
SOURCE_DIR="docs-source"
LANGUAGES=("es" "fr" "de" "ja" "ko" "zh")

# Create documentation for each language
for lang in "${LANGUAGES[@]}"; do
  echo "Generating documentation for $lang..."
  
  # Create language directory
  mkdir -p "docs-$lang"
  
  # Translate each file
  for file in $SOURCE_DIR/*.md; do
    filename=$(basename "$file")
    gemini-cli translate --file "$file" --to "$lang" --preserve-format --output "docs-$lang/$filename"
  done
  
  # Generate language-specific index
  gemini-cli generate "Create an index page for $lang documentation" --format markdown --output "docs-$lang/index.md"
done

echo "Multi-language documentation completed!"
```

## Image Processing Examples

### Image Description

```bash
# Describe image content
gemini-cli image describe photo.jpg

# Detailed analysis
gemini-cli image describe artwork.png --detail comprehensive --focus composition

# Extract and describe multiple images
for image in *.jpg; do
  gemini-cli image describe "$image" --output "${image%.jpg}-description.txt"
done
```

### OCR Examples

```bash
# Extract text from image
gemini-cli image extract-text screenshot.png

# Extract and preserve layout
gemini-cli image extract-text document.jpg --preserve-layout --format markdown

# Batch OCR processing
gemini-cli batch --command "image extract-text" --input "scans/*.png" --output-dir extracted-text/
```

## Configuration Examples

### Development Environment

```bash
# Set up development configuration
gemini-cli config set model "gemini-pro"
gemini-cli config set temperature 0.7
gemini-cli config set format "markdown"
gemini-cli config set save-output true
gemini-cli config set output-dir "./dev-output"
```

### Production Environment

```bash
# Set up production configuration
gemini-cli config set model "gemini-pro"
gemini-cli config set temperature 0.3
gemini-cli config set format "json"
gemini-cli config set timeout 60000
gemini-cli config set max-tokens 2000
```

### Profile Management

```bash
# Create profiles for different use cases
gemini-cli profile create "creative" --temperature 0.9 --max-tokens 1500
gemini-cli profile create "technical" --temperature 0.3 --format markdown
gemini-cli profile create "coding" --system-prompt "You are a senior software engineer"

# Use profiles
gemini-cli --profile creative generate "Write a creative story"
gemini-cli --profile technical generate "Explain blockchain technology"
gemini-cli --profile coding generate "Create a REST API design"
```

## Integration Examples

### Git Hooks

```bash
# Pre-commit hook for code review
#!/bin/bash
# .git/hooks/pre-commit

echo "Running AI code review..."
git diff --cached --name-only --diff-filter=ACM | grep -E "\.(py|js|ts)$" | while read file; do
  gemini-cli code review "$file" --focus bugs --format json > "reviews/$file.json"
done
```

### CI/CD Integration

```yaml
# GitHub Actions workflow
name: AI Code Review
on: [pull_request]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Install Gemini CLI
      run: npm install -g @google-ai/gemini-cli
    - name: Review changed files
      run: |
        git diff --name-only origin/main..HEAD | grep -E "\.(py|js|ts)$" | while read file; do
          gemini-cli code review "$file" --focus security --format json > "review-$file.json"
        done
```

### VS Code Integration

```json
{
  "tasks": [
    {
      "label": "AI Code Review",
      "type": "shell",
      "command": "gemini-cli",
      "args": ["code", "review", "${file}", "--focus", "bugs"],
      "group": "build"
    },
    {
      "label": "Generate Documentation",
      "type": "shell",
      "command": "gemini-cli",
      "args": ["code", "generate", "Generate documentation for this file", "--code", "${file}"],
      "group": "build"
    }
  ]
}
```

## Error Handling Examples

### Robust Script with Error Handling

```bash
#!/bin/bash
# Robust Gemini CLI script with error handling

set -euo pipefail

# Function to handle errors
handle_error() {
    echo "Error: $1" >&2
    exit 1
}

# Check if API key is set
if ! gemini-cli config get api-key > /dev/null 2>&1; then
    handle_error "API key not configured. Run: gemini-cli config set api-key YOUR_KEY"
fi

# Process files with error handling
for file in *.txt; do
    if [[ -f "$file" ]]; then
        echo "Processing $file..."
        if ! gemini-cli summarize "$file" --output "${file%.txt}-summary.md" 2>/dev/null; then
            echo "Warning: Failed to process $file" >&2
            continue
        fi
        echo "✓ Processed $file"
    fi
done

echo "Processing completed successfully!"
```

### Retry Logic

```bash
#!/bin/bash
# Script with retry logic for API calls

retry_command() {
    local cmd="$1"
    local max_attempts=3
    local delay=5
    
    for ((i=1; i<=max_attempts; i++)); do
        if eval "$cmd"; then
            return 0
        else
            echo "Attempt $i failed. Retrying in $delay seconds..."
            sleep $delay
            delay=$((delay * 2))
        fi
    done
    
    echo "Command failed after $max_attempts attempts"
    return 1
}

# Use retry logic
retry_command "gemini-cli generate 'Complex analysis task' --max-tokens 2000"
```

## Performance Optimization Examples

### Parallel Processing

```bash
#!/bin/bash
# Parallel processing for better performance

# Function to process a single file
process_file() {
    local file="$1"
    echo "Processing $file..."
    gemini-cli analyze "$file" --type summary --output "${file%.txt}-analysis.json"
}

# Export function for parallel execution
export -f process_file

# Process files in parallel
find . -name "*.txt" | xargs -P 4 -I {} bash -c 'process_file "$@"' _ {}
```

### Rate Limiting

```bash
#!/bin/bash
# Script with rate limiting

rate_limit_delay=1 # 1 second between requests

for file in *.md; do
    echo "Processing $file..."
    gemini-cli summarize "$file" --output "${file%.md}-summary.txt"
    
    # Rate limiting
    sleep $rate_limit_delay
done
```

These examples demonstrate the versatility and power of Gemini CLI across various use cases and scenarios. Each example can be modified to fit specific requirements and workflows.