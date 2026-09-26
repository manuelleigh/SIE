
import re

with open("d:/Desarrollo/SIE/semana6/index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "${" in line and not line.strip().startswith("`"):
        # The line is something like: El valor...; or "${escapeHtml...
        # Let us extract the text and wrap it in backticks.
        # It usually is the entire line (with indentation).
        stripped = line.strip()
        if stripped.endswith(";"):
            stripped = stripped[:-1] # remove trailing semicolon
            lines[i] = line.replace(line.strip(), f"`{stripped}`;")
        elif stripped.endswith("."):
            lines[i] = line.replace(line.strip(), f"`{stripped}`")

with open("d:/Desarrollo/SIE/semana6/index.html", "w", encoding="utf-8") as f:
    f.writelines(lines)

