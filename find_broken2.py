
with open("d:/Desarrollo/SIE/test.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

broken = []
for i, line in enumerate(lines):
    if "${" in line and not "`" in line:
        broken.append(f"Broken at {i+1}: {line.strip()}")

with open("d:/Desarrollo/SIE/broken.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(broken))

