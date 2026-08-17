import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const clientPath = new URL("./packages/english-speech/lib/client.js", root);
const packagePath = new URL("./packages/english-speech/package.json", root);

test("speech plugin registers a browser client module and assistant action", async () => {
  const source = await readFile(clientPath, "utf8");
  assert.match(source, /window\.__ModuleLoader__\.load/);
  assert.match(source, /conversation\.chat\.assistant-actions/);
  assert.match(source, /speechSynthesis/);
  assert.match(source, /SpeechSynthesisUtterance/);
});

test("speech package declares DSH client metadata", async () => {
  const manifest = JSON.parse(await readFile(packagePath, "utf8"));
  assert.equal(manifest.name, "@suwujin-code/dsh-english-speech");
  assert.equal(manifest.dsh.client.platform, "web");
  assert.ok(manifest.dsh.client.inject.includes("@deepseek-ai/dsh-client-ui-conversation"));
  assert.ok(manifest.dsh.client.inject.includes("@deepseek-ai/dsh-client-ui-primitives"));
});
