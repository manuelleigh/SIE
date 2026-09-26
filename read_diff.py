with open('diff.txt', 'r', encoding='utf-8') as f:
    for line in f:
        if chr(96) in line:
            print(line.strip())
