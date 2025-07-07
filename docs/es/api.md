# Referencia API

## CLI Comandos

### generate

Generate text based on prompts.

```bash
gemini-cli generate [prompt] [options]
```

**Opciones:**
- `--model <string>` - Model to use
- `--temperature <number>` - Temperature (0.0-1.0)
- `--max-tokens <number>` - Maximum tokens

### chat

Start interactive chat session.

```bash
gemini-cli chat [options]
```

**Opciones:**
- `--system <string>` - System message
- `--save-session <string>` - Save session name

### analyze

Analyze text content.

```bash
gemini-cli analyze [file] [options]
```

**Opciones:**
- `--type <string>` - Analysis type
- `--depth <string>` - Analysis depth

## Configuración API

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
- `2` - Configuración error
- `3` - API error
