# API 参考

## CLI 命令

### generate

Generate text based on prompts.

```bash
gemini-cli generate [prompt] [options]
```

**选项:**
- `--model <string>` - Model to use
- `--temperature <number>` - Temperature (0.0-1.0)
- `--max-tokens <number>` - Maximum tokens

### chat

Start interactive chat session.

```bash
gemini-cli chat [options]
```

**选项:**
- `--system <string>` - System message
- `--save-session <string>` - Save session name

### analyze

Analyze text content.

```bash
gemini-cli analyze [file] [options]
```

**选项:**
- `--type <string>` - Analysis type
- `--depth <string>` - Analysis depth

## 配置 API

### config set

Set configuration values.

```bash
gemini-cli config set <key> <value>
```

### config get

Get configuration values.

```bash
gemini-cli config get <key>
```

### config list

List all configuration.

```bash
gemini-cli config list
```

## Exit Codes

- `0` - Success
- `1` - General error
- `2` - 配置 error
- `3` - API error
