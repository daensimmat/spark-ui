# spark-ui

Spark Wonder shared design system. Single source of truth for CSS tokens, components, and theming across all internal tools.

## Files

| File | Purpose |
|---|---|
| `spark.css` | Design system — tokens, components, utilities |
| `spark.js` | Theme init, toggle, tool accent setup |
| `index.html` | Live component preview |

## Usage

Add to any tool's `<head>`:

```html
<!-- internal (nginx on beachlifevs) -->
<link rel="stylesheet" href="http://spark-core.ai/assets/spark.css">
<script src="http://spark-core.ai/assets/spark.js"></script>

<!-- external (Cloudflare Pages) -->
<link rel="stylesheet" href="https://ui.spark-core.ai/spark.css">
<script src="https://ui.spark-core.ai/spark.js"></script>
```

Set tool accent on `<html>`:

```html
<html data-tool-accent="#3b82f6">
```

## Tool accents

| Tool | Colour |
|---|---|
| spark (dashboard) | `#e8e8e8` |
| sparkast | `#e8e8e8` |
| spark-reach | `#3b82f6` |
| spark-security | `#ef4444` |
| spark-devices | `#14b8a6` |
| spark-xero-rec | `#22c55e` |
| ovrsight | `#f59e0b` |
| pocket-spark | `#a855f7` |
| spark-historian | `#f97316` |
| browser-spark | `#06b6d4` |
| spark-term | `#6b7280` |
| spark-test | `#f59e0b` |

## Theme toggle

```html
<button onclick="sparkToggleTheme()">Toggle theme</button>
```

Theme preference is persisted in `localStorage` under key `spark-theme`.

## Deploy

Cloudflare Pages: `npx wrangler pages deploy . --project-name spark-ui`

The auto-sync cron on beachlifevs pulls every 10 minutes:
`*/10 * * * * cd /home/beach/spark-ui && git pull origin main --quiet`
