
import subprocess
diff = subprocess.check_output(["git", "diff", "3c7a8bc", "1a4597c", "--", "semana6/index.html"], encoding="utf-8", errors="replace")
for line in diff.splitlines():
    if chr(96) in line:
        print(line)

