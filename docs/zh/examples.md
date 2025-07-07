# 示例

## Basic Text Generation

```bash
# Simple generation
gemini-cli generate "Explain quantum computing"

# Creative writing
gemini-cli generate "Write a short story about time travel" --temperature 0.9

# Technical 文档
gemini-cli generate "Create API 文档 for a REST endpoint" --max-tokens 500
```

## Code 示例

```bash
# Generate Python function
gemini-cli code "Create a function to calculate fibonacci numbers"

# Review existing code
gemini-cli code review main.py

# Generate unit tests
gemini-cli code test calculator.js
```

## Interactive Chat

```bash
# Start basic chat
gemini-cli chat

# Chat with system prompt
gemini-cli chat --system "You are a helpful coding assistant"

# Save conversation
gemini-cli chat --save-session debugging-session
```

## File Processing

```bash
# Analyze document
gemini-cli analyze report.pdf

# Summarize multiple files
gemini-cli summarize *.md --length short

# Translate content
gemini-cli translate "Hello world" --to spanish
```

## Advanced Workflows

### Content Pipeline

```bash
# Generate, analyze, and summarize
echo "Topic: AI ethics" | \
  gemini-cli generate | \
  gemini-cli analyze --type sentiment | \
  gemini-cli summarize --length brief
```

### Batch Processing

```bash
# Process all markdown files
find docs/ -name "*.md" | \
  xargs -I {} gemini-cli analyze {} --output {}.analysis
```

### 配置 示例

```bash
# Set up for creative writing
gemini-cli config set temperature 0.8
gemini-cli config set model gemini-pro
gemini-cli config set max-tokens 1000

# Set up for technical 文档
gemini-cli config set temperature 0.3
gemini-cli config set format markdown
```

## Output 示例

### JSON Output

```bash
gemini-cli generate "Hello" --format json
```

```json
{
  "response": "Hello! How can I help you today?",
  "model": "gemini-pro",
  "tokens": 12,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Markdown Output

```bash
gemini-cli generate "Create a task list" --format markdown
```

```markdown
# Task List

- [ ] Set up development environment
- [ ] Write unit tests
- [ ] Update 文档
- [ ] Review code changes
```
