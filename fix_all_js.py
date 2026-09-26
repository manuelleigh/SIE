
import re

with open("d:/Desarrollo/SIE/semana6/index.html", "r", encoding="utf-8") as f:
    text = f.read()

# Fix id: INC-...
text = re.sub(r"id:\s*INC-\$\{String\(\s*incidentCounter\s*\)\.padStart\(3,\s*\"0\"\)\},",
              "id: `INC-${String(incidentCounter).padStart(3,\"0\")}`,", text)

# Fix problem =, feedback =, solution =, action =, justification =
def fix_assignment(var_name):
    global text
    # We look for: var_name = \n text ... ;
    pattern = re.compile(r"(" + var_name + r"\s*=\s*)([^`].*?;)", re.DOTALL)
    
    def repl(m):
        # Only wrap if it contains ${ or spans multiple lines and is not already wrapped
        val = m.group(2)
        if "${" in val or "\n" in val:
            if val.strip().endswith(";"):
                val = val.strip()[:-1]
                return m.group(1) + "`" + val + "`;"
        return m.group(0)
        
    text = pattern.sub(repl, text)

for v in ["problem", "feedback", "solution", "action", "justification"]:
    fix_assignment(v)

# Fix processResult.innerHTML = 
def fix_innerhtml():
    global text
    pattern = re.compile(r"(processResult\.innerHTML\s*=\s*)([^`].*?;)", re.DOTALL)
    def repl(m):
        val = m.group(2)
        if val.strip().endswith(";"):
            val = val.strip()[:-1]
            return m.group(1) + "`" + val + "`;"
        return m.group(0)
    text = pattern.sub(repl, text)

fix_innerhtml()

with open("d:/Desarrollo/SIE/semana6/index.html", "w", encoding="utf-8") as f:
    f.write(text)

