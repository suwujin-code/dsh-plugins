# @suwujin-code/dsh-clickable-choices

A policy preset for DeepSeek Harness agents that makes structured decisions use DSH built-in clickable question UI.

## Why this exists

Without a policy, an agent may write “reply 1/2/3” in ordinary chat. With this preset, it should invoke `ask_user_question`, which renders accessible single-choice or multi-choice controls in the DSH Web GUI. A one-question single choice can be submitted by clicking an option—no typing is required.

## Requirements

- DSH >= 0.1.0-rc.6
- A Web profile including DSH built-in question UI
- The target agent composition must expose @deepseek-ai/dsh-tool-ask-user

## Apply the preset

1. Clone a released tag of this repository: `git clone --branch v0.1.0 --depth 1 https://github.com/suwujin-code/dsh-plugins.git`.
2. Copy `clickable-choice-policy` from [preset/agent.cordis.yml](preset/agent.cordis.yml) into the target agent Cordis composition after its main persona entry.
3. Keep or add the `tool-ask-user` entry shown below.
4. Restart the affected DSH profile. Profile changes are not hot-loaded by an already-running Web process.

## Non-goals

- It does not duplicate or modify DSH built-in question UI.
- It does not expose a local DSH instance to the Internet.
- It does not convert a click into automatic permission for a risky action.

See [examples](prompts/examples.md).
