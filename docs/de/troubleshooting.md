# Fehlerbehebung

## Common Issues

### API Key Issues

**Problem**: "API key not found" error

**Solution**:
```bash
gemini-cli config set api-key YOUR_API_KEY
```

### Installation Issues

**Problem**: Command not found after installation

**Solution**:
```bash
# Check if npm global bin is in PATH
echo $PATH | grep $(npm config get prefix)

# Add to PATH if missing
export PATH="$PATH:$(npm config get prefix)/bin"
```

### Rate Limiting

**Problem**: "Rate limit exceeded" error

**Solution**:
- Wait before retrying
- Use `--delay` option for batch operations
- Check your API quota

### Connection Issues

**Problem**: Network or connection errors

**Solution**:
```bash
# Test API connection
gemini-cli models test

# Check configuration
gemini-cli config list
```

## Performance Issues

### Slow Response Times

- Check your internet connection
- Try a different model
- Reduce max tokens if not needed

### High Memory Verwendung

- Use streaming for large outputs
- Process files in smaller batches
- Clear session history regularly

## Error Codes

- `1` - General error
- `2` - Konfiguration error
- `3` - API error
- `4` - File I/O error
- `5` - Network error

## Getting Help

1. Check this troubleshooting guide
2. Review the [usage Dokumentation](./usage.md)
3. Search existing GitHub issues
4. Create a new issue with:
   - Error message
   - Command used
   - System information
   - Steps to reproduce

## Debug Mode

Enable verbose logging:

```bash
gemini-cli generate "test" --verbose
```

## Reset Konfiguration

If all else fails, reset to defaults:

```bash
gemini-cli config reset
```
