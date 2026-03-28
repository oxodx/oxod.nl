{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = with pkgs; [
    cmark
    gomplate
    moreutils
    htmlq
    bats
    (pkgs.writeShellScriptBin "serve" ''${pkgs.python3}/bin/python3 -m http.server'')
  ];

  MIME_TYPES_PATH = "${pkgs.mailcap}/etc/mailcap";
  PROJECT_ROOT = "${builtins.toString ./.}";

  shellHook = ''
    PATH="${builtins.toString ./.}/tools:$PATH"
  '';
}
