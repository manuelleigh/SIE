
with open("d:/Desarrollo/SIE/semana9/index.html", "r", encoding="utf-8") as f:
    text = f.read()

# Replace the broken string assignments
text = text.replace("progressBar.style.width = ${score}%;", "progressBar.style.width = `${score}%`;")
text = text.replace("progressText.innerText = ${score}%;", "progressText.innerText = `${score}%`;")
text = text.replace("hudIntegrity.innerText = ${score}%;", "hudIntegrity.innerText = `${score}%`;")

with open("d:/Desarrollo/SIE/semana9/index.html", "w", encoding="utf-8") as f:
    f.write(text)

