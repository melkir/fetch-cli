# Fetch CLI

Command line program that allows you to download web pages and save them to disk for later viewing.

## Installation

https://deno.land/#installation

## Getting started

```sh
deno run --allow-net --allow-write main.ts --metadata https://www.google.com
```

The downloaded file will be in the current directory, the one from which you launched the command.

## Improvement

- [ ] Create a dockerfile
- [ ] Setup Github Actions workflows for running tests
- [ ] Setup Github Actions workflows for publishing releases (e.g. [cargo_publish](https://github.com/denoland/deno/blob/main/.github/workflows/cargo_publish.yml))
