#!/usr/bin/env bash
set -euo pipefail

if [[ "$1" == *.html ]]; then
	sed -i '/<img [^>]*loading=/! s/<img /<img loading="lazy" /g' "$1"
fi
