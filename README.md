# Fetch CLI

Command line program that allows you to download web pages and save them to disk for later viewing.

## Installation

https://deno.land/#installation

## Getting started

### Using Deno

The program can be run using

```sh
deno run --allow-net --allow-write main.ts [options...] <urls...>
```

For example

```sh
deno run --allow-net --allow-write main.ts --metadata https://www.google.com
```

The downloaded file will be in the current directory, the one from which you launched the command.

### Using Docker

Alternatively, you can build an Docker image from the program and run it in a container:

```sh
docker build -t fetch .
```

And then you can run a container from this image with the following command:

```sh
docker run -v $(pwd):/app fetch [options...] <urls...>
```

## Deployment

If you wish to compile the script into a self-contained executable:

```sh
./build.sh
```

## Improvements

- [x] Create a Dockerfile
- [ ] Setup Github Actions for running tests
- [ ] Setup Github Actions for publishing releases (e.g. [cargo_publish](https://github.com/denoland/deno/blob/main/.github/workflows/cargo_publish.yml))
