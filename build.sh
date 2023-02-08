#!/bin/bash
targets=(
  x86_64-unknown-linux-gnu
  x86_64-pc-windows-msvc
  x86_64-apple-darwin
  aarch64-apple-darwin
)

for i in "${targets[@]}"
do
  deno compile --output "bin/fetch-$i" --allow-net --allow-write main.ts --target $i
done
