
with open("original.js", "r", encoding="utf-8") as f:
    orig_js = f.read()

with open("d:/Desarrollo/SIE/semana6/index.html", "r", encoding="utf-8") as f:
    current = f.read()

start = current.find("<script>") + len("<script>")
end = current.find("</script>")
new_content = current[:start] + orig_js + current[end:]

with open("d:/Desarrollo/SIE/semana6/index.html", "w", encoding="utf-8") as f:
    f.write(new_content)

