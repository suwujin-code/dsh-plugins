# Clickable Choice Examples

## Single choice

    await tools.ask_user_question({
      questions: [{
        id: "editing-style",
        header: "选择剪辑方向",
        question: "请选择本轮剪辑节奏：",
        options: [
          { label: "快节奏信息流（推荐）", description: "更紧凑，适合短视频传播。" },
          { label: "纪录片叙事", description: "保留更多呼吸和上下文。" },
          { label: "极简高级感", description: "留白更多，信息密度较低。" }
        ]
      }]
    })

## Multi-choice

    await tools.ask_user_question({
      questions: [{
        id: "deliverables",
        header: "选择交付物",
        question: "请选择需要生成的候选交付物：",
        multi_select: true,
        options: [{ label: "预览 MP4" }, { label: "SRT 字幕" }, { label: "FCPXML 工程" }]
      }]
    })
