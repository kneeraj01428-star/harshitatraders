import urllib.request
import json

files = {
    "Havells": "File:Havells_Logo.svg",
    "A. O. Smith": "File:A.O._Smith_logo.svg",
    "Pentair": "File:Pentair_logo.svg",
    "Adani": "File:Adani_logo.svg",
    "Tata": "File:Tata_logo.svg",
    "Crompton": "File:Crompton_Greaves_Logo.svg",
    "Grundfos": "File:Grundfos_Logo.svg",
}

urls = {}
for brand, filename in files.items():
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(filename)}&prop=imageinfo&iiprop=url&format=json"
        req = urllib.request.urlopen(url)
        res = json.loads(req.read())
        pages = res['query']['pages']
        page = list(pages.values())[0]
        image_url = page['imageinfo'][0]['url']
        urls[brand] = image_url
    except Exception as e:
        urls[brand] = str(e)

print(json.dumps(urls, indent=2))
