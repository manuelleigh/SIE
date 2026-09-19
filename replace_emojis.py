import re

with open('d:/Desarrollo/SIE/semana6/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('</head>', '<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css\">\n</head>')

# Define replacements
replacements = {
    '🛡️': '<i class=\"fa-solid fa-shield-halved\"></i>',
    '📋': '<i class=\"fa-solid fa-clipboard-list\"></i>',
    '🚨': '<i class=\"fa-solid fa-triangle-exclamation\"></i>',
    '📊': '<i class=\"fa-solid fa-chart-simple\"></i>',
    '⏱️': '<i class=\"fa-solid fa-clock-rotate-left\"></i>',
    '📥': '<i class=\"fa-solid fa-upload\"></i>',
    '🔍': '<i class=\"fa-solid fa-scale-balanced\"></i>',
    '🛠️': '<i class=\"fa-solid fa-screwdriver-wrench\"></i>',
    '💻': '<i class=\"fa-solid fa-server\"></i>',
    '🛡️': '<i class=\"fa-solid fa-shield\"></i>',  # CISO node
    '💡': '<i class=\"fa-solid fa-lightbulb\"></i>',
    '⚙️': '<i class=\"fa-solid fa-gear\"></i>',
    '🎯': '<i class=\"fa-solid fa-bullseye\"></i>',
    '📝': '<i class=\"fa-solid fa-file-signature\"></i>',
    '📈': '<i class=\"fa-solid fa-arrow-trend-up\"></i>'
}

for emoji_char, icon_html in replacements.items():
    text = text.replace(emoji_char, icon_html)

# Also let's try a regex for any remaining emojis to generic icons, just in case
def repl_emoji(match):
    return '<i class=\"fa-solid fa-cube\"></i>'
    
emoji_pattern = re.compile(r'[\U00010000-\U0010ffff]')
text = emoji_pattern.sub(repl_emoji, text)

with open('d:/Desarrollo/SIE/semana6/index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print('Done')
