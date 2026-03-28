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
