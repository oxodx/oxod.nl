# oxod.nl

Personal website built with static site generation.

## Quick Start

```sh
# Enter development environment
nix develop

# Build the site
task build

# Build with minification
task build -- --minify

# Serve locally
task serve
```

## Project Structure

- `articles/` - Blog posts (Markdown)
- `pages/` - Static page bodies (Markdown)
- `templates/` - HTML templates (gomplate)
- `data/site.json` - Site navigation, titles, metadata, and footer config
- `tools/` - Build scripts (bash)
- `static/` - CSS, JS, assets
- `public/` - Built output

## Pages

- `/` - About
- `/blog` - Blog listing
- `/contact` - Contact info
- `/donate` - Crypto donations
- `/<slug>` - Blog posts

## Tech Stack

- Nix flakes for development environment
- Go template (gomplate) for HTML
- Markdown (cmark) for articles
- Swup for page transitions
- Highlight.js for code syntax highlighting

## License

Content: CC BY-NC-SA 4.0
Code: GPL-3.0
