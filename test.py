import json

with open("cleaned.json", 'r') as f:
    lines = f.read()
    j = json.loads(lines)
    print(len(j['data']))
    cleaned = [l.split("&")[0] for l in j['data']]

    j['data'] = cleaned

    with open("cleaned.json", 'w') as f:
        f.write(json.dumps(j, indent=4))