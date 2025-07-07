# Quick Start

Get up and running with Gemini CLI in just a few minutes.

## Prerequisites

- Gemini CLI installed ([Installation Guide](/installation))
- Google AI API key configured
- Basic command line knowledge

## Your First Command

Let's start with a simple text generation example:

```bash
gemini-cli generate "Write a haiku about artificial intelligence"
```

Expected output:
```
Silicon neurons
Learning patterns in the void
Dreams of tomorrow
```

## Basic Usage Patterns

### 1. Simple Text Generation

```bash
# Basic text generation
gemini-cli generate "Explain quantum computing in simple terms"

# Generate with specific parameters
gemini-cli generate "Write a story about space exploration" --temperature 0.8 --max-tokens 200
```

### 2. Interactive Mode

Start an interactive session:

```bash
gemini-cli interactive
```

In interactive mode, you can:
- Have ongoing conversations
- Maintain context across queries
- Use special commands like `/help`, `/clear`, `/exit`

### 3. File Processing

Process content from files:

```bash
# Analyze a text file
gemini-cli analyze document.txt

# Generate summary from multiple files
gemini-cli summarize *.md --output summary.txt
```

### 4. Vision Capabilities

Analyze images (if supported by your model):

```bash
# Describe an image
gemini-cli vision describe image.jpg

# Extract text from image
gemini-cli vision extract-text screenshot.png
```

## Common Use Cases

### Code Generation

```bash
# Generate code
gemini-cli code "Create a Python function to calculate fibonacci numbers"

# Code review
gemini-cli review main.py

# Generate tests
gemini-cli test-gen calculator.js
```

### Content Creation

```bash
# Blog post generation
gemini-cli blog "10 Tips for Remote Work Productivity"

# Social media content
gemini-cli social "Product launch announcement for our new AI tool"

# Email drafts
gemini-cli email "Professional follow-up after job interview"
```

### Data Analysis

```bash
# Analyze CSV data
gemini-cli analyze-data sales_data.csv

# Generate insights
gemini-cli insights user_behavior.json

# Create visualizations
gemini-cli visualize --data metrics.csv --type line-chart
```

## Configuration Quick Setup

### Essential Settings

```bash
# Set your preferred model
gemini-cli config set model gemini-pro

# Set default temperature
gemini-cli config set temperature 0.7

# Set output format
gemini-cli config set format markdown
```

### View Current Configuration

```bash
gemini-cli config list
```

## Tips for Better Results

### 1. Be Specific
Instead of:
```bash
gemini-cli generate "Write code"
```

Try:
```bash
gemini-cli generate "Write a Python function that validates email addresses using regex"
```

### 2. Use Context

```bash
# Provide context for better results
gemini-cli generate "As a senior developer, explain the benefits of TypeScript over JavaScript for large projects"
```

### 3. Adjust Parameters

```bash
# For creative writing (higher temperature)
gemini-cli generate "Write a creative story" --temperature 0.9

# For factual content (lower temperature)
gemini-cli generate "Explain photosynthesis" --temperature 0.3
```

### 4. Use Templates

```bash
# Create reusable templates
gemini-cli template create "code-review" "Review this code for bugs, performance, and best practices: {code}"

# Use templates
gemini-cli template use "code-review" --code "$(cat my-script.py)"
```

## Common Command Patterns

### Output Redirection

```bash
# Save output to file
gemini-cli generate "Market analysis report" > report.md

# Append to existing file
gemini-cli generate "Additional insights" >> report.md

# Pipe to other tools
gemini-cli generate "List of tasks" | grep -i "urgent"
```

### Batch Processing

```bash
# Process multiple files
for file in *.txt; do
    gemini-cli summarize "$file" > "${file%.txt}_summary.md"
done

# Using xargs
find . -name "*.py" | xargs -I {} gemini-cli review {}
```

## Error Handling

### Common Errors and Solutions

1. **API Key Not Set**
   ```bash
   Error: No API key found
   Solution: gemini-cli config set api-key YOUR_KEY
   ```

2. **Rate Limit Exceeded**
   ```bash
   Error: Rate limit exceeded
   Solution: Wait a moment and try again, or use --delay option
   ```

3. **Invalid Model**
   ```bash
   Error: Model not found
   Solution: gemini-cli models list
   ```

## Next Steps

Now that you're familiar with the basics:

1. Explore the [Usage Guide](/usage) for detailed command reference
2. Check out [Examples](/examples) for real-world use cases
3. Review [Configuration](/configuration) for advanced settings
4. Visit [API Reference](/api) for programmatic usage

## Getting Help

- Use `gemini-cli --help` for command help
- Visit [Troubleshooting](/troubleshooting) for common issues
- Check the [GitHub repository](https://github.com/google-gemini/gemini-cli) for updates