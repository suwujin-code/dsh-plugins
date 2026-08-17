# Clickable Choices preset overlay

Merge the clickable-choice-policy entry from agent.cordis.yml into the target agent composition after its primary persona entry.

The target agent must also include this tool:

    - id: tool-ask-user
      name: '@deepseek-ai/dsh-tool-ask-user'

DSH Web provides the visual question interface. This overlay controls only the agent behavior that invokes the structured tool.
