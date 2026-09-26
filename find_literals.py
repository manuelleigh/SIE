
with open("d:/Desarrollo/SIE/semana6/index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "${" in line:
        print(f"Line {i+1}: {line.strip()}")

