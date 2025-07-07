# API リファレンス

## CLI コマンド

### generate

Generate text based on prompts.

```bash
gemini-cli generate [prompt] [options]
```

**オプション:**
- `--model <string>` - Model to use
- `--temperature <number>` - Temperature (0.0-1.0)
- `--max-tokens <number>` - Maximum tokens

### chat

Start interactive chat session.

```bash
gemini-cli chat [options]
```

**オプション:**
- `--system <string>` - System message
- `--save-session <string>` - Save session name

### analyze

Analyze text content.

```bash
gemini-cli analyze [file] [options]
```

**オプション:**
- `--type <string>` - Analysis type
- `--depth <string>` - Analysis depth

## 設定 API

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
- `2` - 設定 error
- `3` - API error
