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
