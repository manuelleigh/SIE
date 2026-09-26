
import re

with open("d:/Desarrollo/SIE/semana6/index.html", "r", encoding="utf-8") as f:
    text = f.read()

# First, strip ALL backticks from these variables to reset them to a clean state.
# I will just carefully substitute the known broken patterns.

text = re.sub(r"id:\s*INC-\$\{String\(incidentCounter\)\.padStart\(3,\s*\"0\"\)\},",
              "id: `INC-${String(incidentCounter).padStart(3,\"0\")}`,", text)

def reset_and_wrap(var_name):
    global text
    # Match the variable assignment until the semicolon
    pattern = re.compile(r"(" + var_name + r"\s*=\s*)(.*?);", re.DOTALL)
    def repl(m):
        val = m.group(2)
        # Remove all existing backticks in the value
        val = val.replace("`", "")
        # Remove extra whitespace at ends
        val = val.strip()
        return m.group(1) + "`" + val + "`;"
    text = pattern.sub(repl, text)

for v in ["problem", "feedback", "solution", "action", "justification", "processResult\.innerHTML"]:
    reset_and_wrap(v)

with open("d:/Desarrollo/SIE/semana6/index.html", "w", encoding="utf-8") as f:
    f.write(text)

