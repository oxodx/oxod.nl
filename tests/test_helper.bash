#!/usr/bin/env bash
set -euo pipefail

setup() {
  export TEST_TMPDIR=$(mktemp -d)
  export TEST_ARTICLES_DIR="$TEST_TMPDIR/articles"
  export TEST_PUBLIC_DIR="$TEST_TMPDIR/public"
  export TEST_COMPONENTS_DIR="$TEST_TMPDIR/components"
    
  mkdir -p "$TEST_ARTICLES_DIR" "$TEST_PUBLIC_DIR" "$TEST_COMPONENTS_DIR"
    
  # Copy components
  cp -r templates/components/* "$TEST_COMPONENTS_DIR"/
}

teardown() {
  rm -rf "$TEST_TMPDIR"
}

export FIXTURES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/fixtures"
