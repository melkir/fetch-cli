import { parse } from "https://deno.land/std@0.177.0/flags/mod.ts";
import { isURL } from "./utils.ts";

const {
  _: urls,
  _metadata,
  help,
} = parse(Deno.args, {
  boolean: ["metadata", "help"],
  alias: { m: "metadata", h: "help" },
});

const USAGE_TEXT = `Usage: fetch [options...] <urls...>`;

if (help) {
  console.info(`${USAGE_TEXT}
 -h, --help\t\tGet help for commands
 -m, --metadata\t\tShow metadata about the downloaded pages`);
  Deno.exit(1);
}

if (urls.length === 0) {
  console.info(`fetch: missing url
${USAGE_TEXT}

Try \`fetch --help' for more options.`);
  Deno.exit(1);
}

for (const url of urls) {
  if (typeof url !== "string" || !isURL(url)) {
    console.error(`Error: ${url} is not a valid url`);
    Deno.exit(1);
  }

  try {
    const res = await fetch(url);
    const html = await res.text();
    const filename = `${new URL(url).host}.html`;
    // Write the html page to the disk and overwrite if it already exists
    await Deno.writeTextFile(filename, html);
  } catch (error) {
    console.error(`Error while fetching ${url}:`, error);
  }
}
