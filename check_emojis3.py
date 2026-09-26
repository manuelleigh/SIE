import re
with open('d:/Desarrollo/SIE/semana6/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

non_ascii = set(re.findall(r'[^\x00-\x7F\xC0-\xFF]', text))
for c in non_ascii:
    if ord(c) > 0x2100:  # Ignore punctuation like dashes, quotes
        print(f"Hex: {hex(ord(c))}")
