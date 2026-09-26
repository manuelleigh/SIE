
import subprocess

# Get the original file from commit 3c7a8bc
original = subprocess.check_output(["git", "show", "3c7a8bc:semana6/index.html"], encoding="utf-8")

# Extract the script block
script_start = original.find("<script>")
script_end = original.find("</script>") + len("</script>")
original_script = original[script_start:script_end]

# Read the current file
with open("d:/Desarrollo/SIE/semana6/index.html", "r", encoding="utf-8") as f:
    current = f.read()

# Replace the current script block
curr_script_start = current.find("<script>")
curr_script_end = current.find("</script>") + len("</script>")

new_content = current[:curr_script_start] + original_script + current[curr_script_end:]

with open("d:/Desarrollo/SIE/semana6/index.html", "w", encoding="utf-8") as f:
    f.write(new_content)

