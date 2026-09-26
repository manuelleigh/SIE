import re

with open('d:/Desarrollo/SIE/semana6/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove markdown wrappers
text = text.replace('`html\n', '').replace('`html\r\n', '')
text = text.replace('`\n', '').replace('`\r\n', '')
text = text.replace('`', '')

# 2. Replace emojis in BPMN
replacements = {
    '\u2713\ufe0f': '<i class=\"fa-solid fa-check\"></i>',
    '\u2713': '<i class=\"fa-solid fa-check\"></i>',
    '\u2753\ufe0f': '<i class=\"fa-solid fa-question\"></i>',
    '\u2753': '<i class=\"fa-solid fa-question\"></i>',
    '\u26a0\ufe0f': '<i class=\"fa-solid fa-triangle-exclamation\"></i>',
    '\u26a0': '<i class=\"fa-solid fa-triangle-exclamation\"></i>',
    '\u25b6\ufe0f': '<i class=\"fa-solid fa-play\"></i>',
    '\u25b6': '<i class=\"fa-solid fa-play\"></i>',
    '\u26a1\ufe0f': '<i class=\"fa-solid fa-bolt\"></i>',
    '\u26a1': '<i class=\"fa-solid fa-bolt\"></i>',
    '\ufe0f': ''
}
for char, repl in replacements.items():
    text = text.replace(char, repl)

# 3. Add the gateway red color CSS rule
text = text.replace('.bpmn-node.warning .node-icon i { color: var(--orange); }', '.bpmn-node.warning .node-icon i { color: var(--orange); }\n        .gateway i { font-size: 2rem; color: var(--red); }')

with open('d:/Desarrollo/SIE/semana6/index.html', 'w', encoding='utf-8') as f:
    f.write(text.strip())
