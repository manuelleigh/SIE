
import re

with open("d:/Desarrollo/SIE/semana6/index.html", "r", encoding="utf-8") as f:
    text = f.read()

# Fix justification, problem, feedback, solution, action assignments
# We can find them because they end with ; and contain ${ or spanning multiple lines
def fix_assignments(text):
    lines = text.split("\n")
    in_assignment = False
    var_name = ""
    for i, line in enumerate(lines):
        stripped = line.strip()
        # processResult.innerHTML = 
        if "processResult.innerHTML =" in stripped:
            lines[i] = line.replace("=", "= `")
            in_assignment = "innerHTML"
            continue
            
        if stripped.startswith("justification =") or stripped.startswith("problem =") or stripped.startswith("solution =") or stripped.startswith("feedback =") or stripped.startswith("action ="):
            lines[i] = line.replace("=", "= `")
            in_assignment = "var"
            continue
            
        if in_assignment:
            if stripped.endswith(";"):
                lines[i] = line[:-1] + "`;" if line.endswith(";") else line.replace(";", "`;")
                in_assignment = False

    return "\n".join(lines)

text = fix_assignments(text)

with open("d:/Desarrollo/SIE/semana6/index.html", "w", encoding="utf-8") as f:
    f.write(text)

