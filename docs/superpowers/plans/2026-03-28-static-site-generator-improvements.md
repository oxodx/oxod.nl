# Static Site Generator Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add test coverage and improve error handling/refactoring for the bash-based static site generator

**Architecture:** This project uses bash scripts for site generation. Improvements will add proper error handling, input validation, and bats-core test coverage.

**Tech Stack:** bash, bats-core, cmark, gomplate, jq

---

### Task 1: Set up test framework and create sample article for testing

**Files:**
- Create: `tests/test_helper.bash`
- Create: `tests/test_helpers.bash` (utility functions)
- Modify: `tests/` directory structure

- [ ] **Step 1: Create tests directory structure**

```bash
mkdir -p tests
```

- [ ] **Step 2: Create test helper file**

```bash
touch tests/test_helper.bash
```

```bash
#!/usr/bin/env bash

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
```

- [ ] **Step 3: Create a sample article for testing**

```bash
cat > "$TEST_ARTICLES_DIR/2024-01-01+hello-world.md" << 'EOF'
# Hello World

This is my first article.
It has multiple paragraphs.

## Section One

Some content here.
EOF
```

- [ ] **Step 4: Run test to verify setup works**

Run: `bats tests/test_helper.bash`
Expected: Basic test structure works

---

### Task 2: Add tests for tools/title

**Files:**
- Modify: `tools/title`
- Create: `tests/title.bats`

- [ ] **Step 1: Write failing tests**

```bash
cat > tests/title.bats << 'EOF'
#!/usr/bin/env bats

load test_helper

@test "title extracts heading from markdown" {
    run ./tools/title "$FIXTURES_DIR/sample.md"
    [ "$status" -eq 0 ]
    [ "$output" = "Hello World" ]
}

@test "title returns error for missing file" {
    run ./tools/title "$FIXTURES_DIR/nonexistent.md"
    [ "$status" -ne 0 ]
}

@test "title handles file without heading" {
    run ./tools/title "$FIXTURES_DIR/no-heading.md"
    [ "$status" -eq 0 ]
}
EOF
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bats tests/title.bats`
Expected: FAIL (tests will fail as there's no test fixtures)

- [ ] **Step 3: Create fixture files**

```bash
mkdir -p tests/fixtures
cat > tests/fixtures/sample.md << 'EOF'
# Hello World

This is content.
EOF

cat > tests/fixtures/no-heading.md << 'EOF'
No heading here, just text.
EOF
```

- [ ] **Step 4: Update test_helper.bash with FIXTURES_DIR**

```bash
export FIXTURES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/fixtures"
```

- [ ] **Step 5: Run test to verify it passes**

Run: `bats tests/title.bats`
Expected: PASS

---

### Task 3: Add tests for tools/synopsis

**Files:**
- Modify: `tools/synopsis`
- Create: `tests/synopsis.bats`

- [ ] **Step 1: Write failing tests**

```bash
cat > tests/synopsis.bats << 'EOF'
#!/usr/bin/env bats

load test_helper

@test "synopsis extracts first paragraph" {
    run ./tools/synopsis "$FIXTURES_DIR/sample.md"
    [ "$status" -eq 0 ]
    [ "$output" = "# Hello World" ]
}

@test "synopsis returns error for missing file" {
    run ./tools/synopsis "$FIXTURES_DIR/nonexistent.md"
    [ "$status" -ne 0 ]
}
EOF
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bats tests/synopsis.bats`
Expected: FAIL (tests will fail as there's no test fixtures)

- [ ] **Step 3: Run test to verify it passes**

Run: `bats tests/synopsis.bats`
Expected: PASS

---

### Task 4: Add error handling to tools/title

**Files:**
- Modify: `tools/title`

- [ ] **Step 1: Add error handling to tools/title**

```bash
#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
    echo "Usage: $0 <file>" >&2
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "Error: File not found: $1" >&2
    exit 1
fi

trimPunct() {
	declare -n v="$1"
	for punct in "${@:2}"; do
		if [[ "${v%%"${punct}"*}" != "${v}" ]]; then
			v="${v%%"${punct}"*}${punct}"
		fi
	done
}

text=$(cmark --nobreaks "$1" | htmlq -t 'body > *:first-child')
trimPunct text "." "!" "?"
echo "$text"
```

- [ ] **Step 2: Run tests to verify they still pass**

Run: `bats tests/title.bats`
Expected: PASS

---

### Task 5: Add error handling to tools/synopsis

**Files:**
- Modify: `tools/synopsis`

- [ ] **Step 1: Add error handling to tools/synopsis**

```bash
#!/bin/sh
set -euo pipefail

if [ $# -lt 1 ]; then
    echo "Usage: $0 <file>" >&2
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "Error: File not found: $1" >&2
    exit 1
fi

cmark --nobreaks "$1" | htmlq 'body > *:first-child'
```

- [ ] **Step 2: Run tests to verify they still pass**

Run: `bats tests/synopsis.bats`
Expected: PASS

---

### Task 6: Add tests for tools/build

**Files:**
- Modify: `tools/build`
- Create: `tests/build.bats`

- [ ] **Step 1: Write basic tests for build script**

```bash
cat > tests/build.bats << 'EOF'
#!/usr/bin/env bats

load test_helper

@test "build fails without nix-shell dependencies" {
    skip "Requires nix-shell environment"
}

@test "build article generates json and html" {
    skip "Requires nix-shell environment"
}
EOF
```

- [ ] **Step 2: Run test to verify structure works**

Run: `bats tests/build.bats`
Expected: PASS (skipped tests)

---

### Task 7: Refactor tools/build with better error handling

**Files:**
- Modify: `tools/build`

- [ ] **Step 1: Add error handling to build script**

Add after the shebang:
```bash
set -eo pipefail

# Validate required environment
validateEnvironment() {
    local missing=()
    
    for cmd in gomplate cmark jq parallel; do
        if ! command -v "$cmd" &> /dev/null; then
            missing+=("$cmd")
        fi
    done
    
    if [ ${#missing[@]} -ne 0 ]; then
        echo "Error: Missing required commands: ${missing[*]}" >&2
        echo "Run: nix-shell" >&2
        return 1
    fi
}

validateEnvironment
```

- [ ] **Step 2: Add validation for directory arguments**

Add to generateArticle function:
```bash
if [ ! -f "$filepath" ]; then
    log "Error: File not found: $filepath"
    return 1
fi
```

- [ ] **Step 3: Run tests to verify everything still works**

Run: `bats tests/`
Expected: All tests pass

---

### Task 8: Verify and commit

**Files:**
- Modify: `.gitignore` (if needed)

- [ ] **Step 1: Run all tests**

Run: `bats tests/`
Expected: All tests pass

- [ ] **Step 2: Verify build still works**

Run: `nix-shell --run "build"`
Expected: Build completes without errors

- [ ] **Step 3: Commit changes**

```bash
git add tests/ tools/ docs/superpowers/plans/
git commit -m "test: add bats tests and error handling for static site generator"
```
