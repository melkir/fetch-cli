import { parse, DOMParser } from "./deps.ts";
import { isURL } from "./utils.ts";

const {
  _: urls,
  metadata,
  help,
} = parse(Deno.args, {
  boolean: ["metadata", "help"],
  alias: { m: "metadata", h: "help" },
});

const USAGE_TEXT = `Usage: fetch [options...] <urls...>`;
const parser = new DOMParser();

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
    const { host } = new URL(url);

    // Write the html page to the disk and overwrite if it already exists
    await Deno.writeTextFile(`${host}.html`, html);

    if (metadata) {
      // Parse the html page and get the links and images
      const doc = parser.parseFromString(html, "text/html")!;
      const links = doc.getElementsByTagName("a");
      const images = doc.getElementsByTagName("img");
      // Get the date from the response headers
      const date = res.headers.get("date");
      console.log(
        `\nsite: ${host}\nlinks: ${links.length}\nimages: ${images.length}\nlast_fetch: ${date}`
      );
    }
  } catch (error) {
    console.error(`Error while fetching ${url}:`, error);
  }
}
