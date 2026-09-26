with open('d:/Desarrollo/SIE/semana6/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('`html\n', '').replace('`html\r\n', '')
text = text.replace('`\n', '').replace('`\r\n', '')
text = text.replace('`', '')

with open('d:/Desarrollo/SIE/semana6/index.html', 'w', encoding='utf-8') as f:
    f.write(text.strip())
