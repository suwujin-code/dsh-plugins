# DSH Plugins

Public, versioned plugin presets for [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/deepseek-harness).

## Packages

| Package | Status | Purpose |
| --- | --- | --- |
| [@suwujin-code/dsh-clickable-choices](packages/clickable-choices) | v0.1.0 | Makes an agent prefer DSH built-in clickable choice cards for structured decisions. |

## Scope

DSH already provides the Web choice UI and the ask_user_question tool. This repository does not copy or patch that UI. Its presets make the tool available to an agent and add a behavior policy so the agent uses choices instead of asking people to type 1, A, or yes.

## Install

Clone a released version of this repository, then merge the desired preset overlay into the target agent Cordis composition:

    git clone --branch v0.1.0 --depth 1 https://github.com/suwujin-code/dsh-plugins.git

The initial package is a policy preset rather than executable code: copy the `clickable-choice-policy` entry from `packages/clickable-choices/preset/agent.cordis.yml`, and make sure the target agent exposes `@deepseek-ai/dsh-tool-ask-user`. See the package README for details. Restart the DSH Web process after profile configuration changes.

## Release process

1. Create a branch and update a package.
2. Run npm test.
3. Open and review a pull request.
4. Update CHANGELOG.md.
5. Tag vX.Y.Z and publish a GitHub Release.
6. Consumers upgrade explicitly to the evaluated tag.

## Compatibility and safety

- Initial target: DSH 0.1.0-rc.6 or later compatible releases.
- A choice click is a structured user answer, not an authorization bypass. Commands, payments, publication, credentials, and destructive operations still require the host policy and any necessary explicit confirmation.
- Keep credentials, local machine paths, and private prompts out of this public repository.

## License

[MIT](LICENSE)
