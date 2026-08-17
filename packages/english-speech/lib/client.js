window.__ModuleLoader__.load({
  id: "@suwujin-code/dsh-english-speech",
  factory: (require) => {
    const module = { exports: {} };
    const exports = module.exports;
    const React = require("react");
    const { Tooltip, IconPlayOutline16 } = require("@deepseek-ai/dsh-client-ui-primitives");

    const inject = ["slots"];
    const isEnglish = (text) => /[A-Za-z]{3}/.test(text);
    const plainText = (text) => text
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/!?(?:\[[^\]]*\]\([^)]*\))/g, " ")
      .replace(/[`*_>#~]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const textForMessage = (session, messageId) => {
      const node = session.nodes.find((item) => item.kind === "assistant" && item.messageId === messageId);
      if (!node) return "";
      return plainText(node.blocks.filter((block) => block.kind === "text").map((block) => block.text).join("\n"));
    };

    function EnglishSpeechAction({ messageId, useSession }) {
      const session = useSession((snapshot) => snapshot);
      const text = React.useMemo(() => textForMessage(session, messageId), [session, messageId]);
      const [speaking, setSpeaking] = React.useState(false);
      const supported = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
      const canPlay = supported && isEnglish(text);
      React.useEffect(() => () => {
        if (supported) window.speechSynthesis.cancel();
      }, [supported]);
      if (!canPlay) return null;
      const label = speaking ? "Stop English reading" : "Read English aloud";
      const onClick = () => {
        const synthesis = window.speechSynthesis;
        if (speaking) { synthesis.cancel(); setSpeaking(false); return; }
        synthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.92;
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
        setSpeaking(true);
        synthesis.speak(utterance);
      };
      return React.createElement(Tooltip, { label, side: "bottom" },
        React.createElement("button", {
          type: "button",
          "aria-label": label,
          "aria-pressed": speaking,
          onClick,
          style: { border: 0, background: "transparent", color: "inherit", cursor: "pointer", display: "inline-flex", alignItems: "center", padding: 4 }
        }, React.createElement(IconPlayOutline16, {}))
      );
    }

    function apply(ctx) {
      ctx.slots.inject("conversation.chat.assistant-actions", () => ctx.slots.register({
        name: "conversation.chat.assistant-actions",
        id: "english-speech",
        order: 20
      }, EnglishSpeechAction));
    }
    exports.inject = inject;
    exports.apply = apply;
    return module.exports;
  }
});
