import { assertEquals } from "https://deno.land/std@0.176.0/testing/asserts.ts";
import { isURL } from "./utils.ts";

Deno.test(function isURLTest() {
  assertEquals(isURL("https://www.google.com"), true);
  assertEquals(isURL("www.google.com"), false);
  assertEquals(isURL("fake-url"), false);
});
