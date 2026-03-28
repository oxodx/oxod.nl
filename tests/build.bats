#!/usr/bin/env bats

load test_helper

@test "build script exists and is executable" {
  [ -x tools/build ]
}

@test "build script has valid bash syntax" {
  bash -O extglob -n tools/build
}

@test "build script defines required functions" {
  grep -q "generateArticle()" tools/build
  grep -q "generateIndex()" tools/build
  grep -q "main()" tools/build
}
