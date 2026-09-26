import re
with open('d:/Desarrollo/SIE/semana6/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

non_ascii = set(re.findall(r'[^\x00-\x7F\xC0-\xFF]', text))
with open('d:/Desarrollo/SIE/emojis.txt', 'w', encoding='utf-8') as f:
    for c in non_ascii:
        f.write(f"Char: {c} - Hex: {hex(ord(c))}\n")
