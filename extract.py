
import subprocess
out = subprocess.check_output(["git", "show", "3c7a8bc:semana6/index.html"]).decode("utf-8")
script = out.split("<script>")[1].split("</script>")[0]
with open("original.js", "w", encoding="utf-8") as f:
    f.write(script)

