# @suwujin-code/dsh-english-speech

A browser-only DeepSeek Harness client plugin. It adds a small play button to each **finalized assistant message that contains English text**. Click once to read that message aloud; click again to stop.

## Privacy and runtime model

- Uses the browser built-in `SpeechSynthesis` API only.
- No API key, server, audio upload, transcript storage, or cloud TTS request.
- The actual voice comes from the reader device and browser; quality and available English voices vary by operating system.
- Only finalized assistant messages are addressed. User messages, tool content, reasoning blocks, and streaming partials are excluded.

## Requirements

- DeepSeek Harness `>= 0.1.0-rc.6`
- DSH Web profile
- Browser support for `window.speechSynthesis`

## Install into a DSH profile

This repository is a multi-package workspace. Clone a released tag, then install the package directory into the Web profile:

    git clone --branch v0.2.0 --depth 1 https://github.com/suwujin-code/dsh-plugins.git
    dsh plugin --profile web add file:/absolute/path/to/dsh-plugins/packages/english-speech

Add the plugin to the target profile `cordis.patch.yml` using a patch insertion:

    - insert:
        - id: english-speech
          name: '@suwujin-code/dsh-english-speech'

Restart DSH Web afterward. A normal profile configuration change does not hot-load into an already running Web process.

## Behavior

- English detection requires at least one three-letter Latin word.
- Markdown punctuation, links, and fenced code blocks are stripped before speech.
- Starting one message stops currently playing speech from another message.
- Clicking the active button stops playback.

## Boundaries

This is a playback aid, not a pronunciation assessment, translation service, or high-fidelity neural voice product.
