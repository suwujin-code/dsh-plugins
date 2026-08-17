import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const policyPath = new URL("./packages/clickable-choices/preset/agent.cordis.yml", root);
const packagePath = new URL("./packages/clickable-choices/package.json", root);

test("clickable choices policy directs finite decisions to ask_user_question", async () => {
  const policy = await readFile(policyPath, "utf8");
  assert.match(policy, /ask_user_question/);
  assert.match(policy, /multi-select/);
  assert.match(policy, /authority bypass/);
});

test("package declares the supported DSH peer dependency", async () => {
  const manifest = JSON.parse(await readFile(packagePath, "utf8"));
  assert.equal(manifest.name, "@suwujin-code/dsh-clickable-choices");
  assert.equal(manifest.peerDependencies["@deepseek-ai/dsh"], ">=0.1.0-rc.6");
});
