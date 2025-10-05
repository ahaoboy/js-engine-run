# easy-setup

Download, install, and setup in GitHub Actions.

## Usage

```yaml
- uses: easy-install/easy-setup@v1
  with:
    url: https://github.com/denoland/deno
    version: latest
  env:
    # need for https://api.github.com/repos/denoland/deno/releases/latest
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

```yaml
- uses: easy-install/easy-setup@v1
  with:
    url: |-
      https://github.com/denoland/deno
      https://github.com/ahaoboy/easy-install/raw/refs/heads/main/dist-manifest/node.json
      https://github.com/ahaoboy/easy-install/raw/refs/heads/main/dist-manifest/bun.json
```
