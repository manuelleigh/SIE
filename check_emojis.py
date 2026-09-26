import re

with open('d:/Desarrollo/SIE/semana6/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the Markdown codeblocks if they exist
text = re.sub(r'^`html\n', '', text)
text = re.sub(r'`\n*$', '', text)

# Find all characters that aren't basic ASCII or common latin extended (á, é, í, ó, ú, ñ, etc.)
# We can print anything above U+2000
non_ascii = set(re.findall(r'[^\x00-\x7F\xC0-\xFF]', text))
for c in non_ascii:
    print(f"Char: {c} - Hex: {hex(ord(c))}")

with open('d:/Desarrollo/SIE/semana6/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
