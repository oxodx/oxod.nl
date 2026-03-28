{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-parts,
    }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } (
      { ... }:
      {
        systems = [
          "x86_64-linux"
          "aarch64-linux"
        ];
        perSystem =
          {
            pkgs,
            lib,
            self',
            ...
          }:
          {
            devShells.default = pkgs.mkShell {
              packages = with pkgs; [
                cmark
                gomplate
                htmlq
                jq
                go-task
                minify
                parallel
                python3
                (pkgs.writeShellScriptBin "parallel-moreutils" ''${pkgs.moreutils}/bin/parallel "$@"'')
              ];

              shellHook = ''
                export MIME_TYPES_PATH="${pkgs.mailcap}/etc/mime.types"
              '';
            };
          };
      }
    );
}
