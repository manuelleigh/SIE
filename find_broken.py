
with open("d:/Desarrollo/SIE/test.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "${" in line and not "`" in line:
        print(f"Broken at {i+1}: {line.strip()}")

