import re

with open('d:/Desarrollo/SIE/semana6/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'^`html\n', '', text)
text = re.sub(r'`\n*$', '', text)

with open('d:/Desarrollo/SIE/semana6/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
