# Troubleshooting

Common issues and solutions for Gemini CLI.

## Installation Issues

### Command Not Found

**Problem:** `gemini-cli: command not found`

**Solutions:**

1. **Check if installed globally:**
   ```bash
   npm list -g @google-ai/gemini-cli
   ```

2. **Add npm global bin to PATH:**
   ```bash
   # Check npm global path
   npm config get prefix
   
   # Add to your shell profile (.bashrc, .zshrc, etc.)
   export PATH="$PATH:$(npm config get prefix)/bin"
   
   # Reload shell
   source ~/.bashrc
   ```

3. **Install with correct permissions:**
   ```bash
   # On Linux/macOS
   sudo npm install -g @google-ai/gemini-cli
   
   # Or use npm prefix
   npm config set prefix ~/.npm-global
   export PATH="$PATH:$HOME/.npm-global/bin"
   ```

4. **Alternative installation methods:**
   ```bash
   # Using npx (temporary)
   npx @google-ai/gemini-cli generate "test"
   
   # Using yarn
   yarn global add @google-ai/gemini-cli
   ```

### Permission Errors

**Problem:** Permission denied during installation

**Solutions:**

1. **Use npm prefix:**
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH="$PATH:$HOME/.npm-global/bin"
   npm install -g @google-ai/gemini-cli
   ```

2. **Use nvm (Node Version Manager):**
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Install and use latest Node
   nvm install node
   nvm use node
   
   # Install Gemini CLI
   npm install -g @google-ai/gemini-cli
   ```

3. **Fix npm permissions:**
   ```bash
   sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
   ```

## Configuration Issues

### API Key Problems

**Problem:** `API key not found` or `Invalid API key`

**Solutions:**

1. **Set API key:**
   ```bash
   gemini-cli config set api-key "your-api-key-here"
   ```

2. **Verify API key:**
   ```bash
   gemini-cli config get api-key
   ```

3. **Check API key format:**
   - Should start with `AIza` for Google AI API keys
   - Should be 39 characters long
   - No spaces or special characters

4. **Use environment variable:**
   ```bash
   export GEMINI_API_KEY="your-api-key-here"
   ```

5. **Get new API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create new API key
   - Copy and configure

### Configuration File Issues

**Problem:** Configuration not loading or corrupted

**Solutions:**

1. **Check configuration file location:**
   ```bash
   # Default location
   ls -la ~/.gemini-cli.json
   
   # Custom location
   gemini-cli config --config /path/to/config.json list
   ```

2. **Reset configuration:**
   ```bash
   gemini-cli config reset
   ```

3. **Fix file permissions:**
   ```bash
   chmod 600 ~/.gemini-cli.json
   ```

4. **Validate JSON format:**
   ```bash
   # Check for syntax errors
   python -m json.tool ~/.gemini-cli.json
   
   # Or use jq
   jq . ~/.gemini-cli.json
   ```

5. **Create new configuration:**
   ```bash
   cat > ~/.gemini-cli.json << EOF
   {
     "apiKey": "your-api-key",
     "model": "gemini-pro",
     "temperature": 0.7,
     "format": "plain"
   }
   EOF
   ```

## API and Network Issues

### Connection Errors

**Problem:** `Network error` or `Connection timeout`

**Solutions:**

1. **Check internet connection:**
   ```bash
   ping google.com
   curl -I https://generativelanguage.googleapis.com
   ```

2. **Proxy configuration:**
   ```bash
   # HTTP proxy
   export HTTP_PROXY=http://proxy.company.com:8080
   export HTTPS_PROXY=https://proxy.company.com:8080
   
   # Or in config
   gemini-cli config set proxy "http://proxy.company.com:8080"
   ```

3. **Firewall issues:**
   - Ensure ports 80 and 443 are open
   - Check corporate firewall rules
   - Try from different network

4. **DNS issues:**
   ```bash
   # Try different DNS
   nslookup generativelanguage.googleapis.com 8.8.8.8
   ```

5. **Increase timeout:**
   ```bash
   gemini-cli config set timeout 60000
   ```

### Rate Limiting

**Problem:** `Rate limit exceeded` or `Too many requests`

**Solutions:**

1. **Wait and retry:**
   ```bash
   # Wait 60 seconds and retry
   sleep 60
   gemini-cli generate "test"
   ```

2. **Add delays to scripts:**
   ```bash
   # Add delay between requests
   gemini-cli generate "test 1"
   sleep 2
   gemini-cli generate "test 2"
   ```

3. **Use batch processing with delays:**
   ```bash
   gemini-cli batch --command "generate" --input "*.txt" --delay 2000
   ```

4. **Check rate limits:**
   ```bash
   # Check current usage
   gemini-cli models test
   ```

5. **Upgrade API plan:**
   - Visit Google AI Studio
   - Check billing and usage
   - Upgrade to higher tier

### Authentication Errors

**Problem:** `Unauthorized` or `Invalid credentials`

**Solutions:**

1. **Verify API key:**
   ```bash
   # Test API key
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        "https://generativelanguage.googleapis.com/v1/models"
   ```

2. **Check API key permissions:**
   - Ensure API key has Generative AI permissions
   - Check IP restrictions
   - Verify domain restrictions

3. **Regenerate API key:**
   - Create new API key in Google AI Studio
   - Delete old key
   - Update configuration

4. **Regional restrictions:**
   - Check if Gemini API is available in your region
   - Use VPN if necessary (check terms of service)

## Usage and Command Issues

### Command Syntax Errors

**Problem:** `Invalid command` or `Unrecognized option`

**Solutions:**

1. **Check command syntax:**
   ```bash
   gemini-cli --help
   gemini-cli generate --help
   ```

2. **Common syntax fixes:**
   ```bash
   # Wrong
   gemini-cli generate --model=gemini-pro "text"
   
   # Correct
   gemini-cli generate --model gemini-pro "text"
   ```

3. **Quote arguments properly:**
   ```bash
   # Wrong
   gemini-cli generate Write a story about AI
   
   # Correct
   gemini-cli generate "Write a story about AI"
   ```

4. **Check model names:**
   ```bash
   # List available models
   gemini-cli models list
   ```

### Input/Output Issues

**Problem:** Empty responses, garbled text, or encoding issues

**Solutions:**

1. **Check input encoding:**
   ```bash
   # Check file encoding
   file -bi input.txt
   
   # Convert to UTF-8
   iconv -f ISO-8859-1 -t UTF-8 input.txt > input_utf8.txt
   ```

2. **Verify file permissions:**
   ```bash
   ls -la input.txt
   chmod 644 input.txt
   ```

3. **Check input size:**
   ```bash
   # Check file size
   wc -c input.txt
   
   # Gemini has token limits
   gemini-cli generate "summarize this large file" --max-tokens 4000
   ```

4. **Debug output:**
   ```bash
   # Enable verbose mode
   gemini-cli generate "test" --verbose
   
   # Check JSON output
   gemini-cli generate "test" --format json
   ```

### File Processing Issues

**Problem:** Cannot read files, permission denied, or format errors

**Solutions:**

1. **Check file exists:**
   ```bash
   ls -la filename.txt
   ```

2. **Check file permissions:**
   ```bash
   chmod 644 filename.txt
   ```

3. **Supported file formats:**
   - Text files: `.txt`, `.md`, `.json`
   - Code files: `.py`, `.js`, `.html`, etc.
   - Images: `.jpg`, `.png`, `.gif`, `.bmp`
   - Documents: `.pdf` (limited support)

4. **File size limits:**
   - Text files: Up to 30MB
   - Images: Up to 20MB
   - Token limits apply

5. **Convert unsupported formats:**
   ```bash
   # Convert Word to text
   pandoc document.docx -o document.txt
   
   # Extract text from PDF
   pdftotext document.pdf
   ```

## Model and Response Issues

### Poor Response Quality

**Problem:** Responses are irrelevant, repetitive, or low quality

**Solutions:**

1. **Improve prompts:**
   ```bash
   # Poor prompt
   gemini-cli generate "code"
   
   # Better prompt
   gemini-cli generate "Write a Python function to calculate the factorial of a number with error handling"
   ```

2. **Adjust temperature:**
   ```bash
   # More creative
   gemini-cli generate "Write a story" --temperature 0.9
   
   # More factual
   gemini-cli generate "Explain quantum physics" --temperature 0.3
   ```

3. **Use system prompts:**
   ```bash
   gemini-cli generate "Explain AI" --system "You are an expert computer scientist"
   ```

4. **Increase max tokens:**
   ```bash
   gemini-cli generate "Detailed explanation" --max-tokens 2000
   ```

### Model Selection Issues

**Problem:** Wrong model for task or model not available

**Solutions:**

1. **List available models:**
   ```bash
   gemini-cli models list
   ```

2. **Choose appropriate model:**
   ```bash
   # Text generation
   gemini-cli generate "text" --model gemini-pro
   
   # Image analysis
   gemini-cli image describe "image.jpg" --model gemini-pro-vision
   ```

3. **Check model capabilities:**
   ```bash
   gemini-cli models info gemini-pro
   ```

## Performance Issues

### Slow Response Times

**Problem:** Commands take too long to complete

**Solutions:**

1. **Reduce max tokens:**
   ```bash
   gemini-cli generate "text" --max-tokens 500
   ```

2. **Use faster model:**
   ```bash
   # Check model speeds
   gemini-cli models list
   ```

3. **Optimize network:**
   - Use wired connection
   - Close bandwidth-heavy applications
   - Try different times of day

4. **Enable streaming:**
   ```bash
   gemini-cli generate "long text" --stream
   ```

### Memory Issues

**Problem:** High memory usage or out of memory errors

**Solutions:**

1. **Process files in batches:**
   ```bash
   # Instead of processing all files at once
   find . -name "*.txt" | head -10 | xargs -I {} gemini-cli analyze {}
   ```

2. **Clear session history:**
   ```bash
   gemini-cli session delete old-session
   ```

3. **Reduce parallel processing:**
   ```bash
   gemini-cli batch --parallel 2 --command "analyze" --input "*.txt"
   ```

## Debug and Diagnostic Tools

### Enable Debug Mode

```bash
# Enable verbose logging
gemini-cli generate "test" --verbose

# Debug configuration
gemini-cli config list --format json

# Test API connection
gemini-cli models test
```

### Check System Information

```bash
# Node.js version
node --version

# npm version
npm --version

# Gemini CLI version
gemini-cli --version

# System information
uname -a
```

### Log Analysis

```bash
# Check logs (if available)
tail -f ~/.gemini-cli.log

# Enable request logging
gemini-cli config set debug true
```

## Getting Help

### Documentation

- [Usage Guide](./usage.md)
- [API Reference](./api.md)
- [Configuration](./configuration.md)
- [Examples](./examples.md)

### Community Resources

- GitHub Issues: Report bugs and request features
- Stack Overflow: Tag questions with `gemini-cli`
- Discord/Slack: Join community discussions

### Support Information

When reporting issues, include:

1. **System information:**
   ```bash
   gemini-cli --version
   node --version
   npm --version
   uname -a
   ```

2. **Error messages:**
   - Full error output
   - Stack traces
   - Log files

3. **Steps to reproduce:**
   - Commands used
   - Input files (if applicable)
   - Expected vs actual behavior

4. **Configuration:**
   ```bash
   gemini-cli config list --format json
   ```

### Quick Diagnostic Script

```bash
#!/bin/bash
# Quick diagnostic script

echo "=== Gemini CLI Diagnostics ==="
echo "Date: $(date)"
echo

echo "System Information:"
echo "OS: $(uname -s)"
echo "Node: $(node --version)"
echo "NPM: $(npm --version)"
echo "Gemini CLI: $(gemini-cli --version 2>/dev/null || echo 'Not installed')"
echo

echo "Configuration:"
gemini-cli config list 2>/dev/null || echo "Config not accessible"
echo

echo "API Test:"
gemini-cli models test 2>/dev/null || echo "API test failed"
echo

echo "Network Test:"
curl -I https://generativelanguage.googleapis.com 2>/dev/null || echo "Network test failed"
echo

echo "=== End Diagnostics ==="
```

Save this as `diagnose.sh`, make it executable (`chmod +x diagnose.sh`), and run it to gather diagnostic information.