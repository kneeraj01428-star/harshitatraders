import urllib.request
import json
import os

files = {
    "Havells": "File:Havells_Logo.svg",
    "A. O. Smith": "File:A.O._Smith_logo.svg",
    "Pentair": "File:Pentair_logo.svg",
    "Adani": "File:Adani_logo.svg",
    "Tata": "File:Tata_logo.svg",
    "Crompton": "File:Crompton_Greaves_Logo.svg",
    "Grundfos": "File:Grundfos_Logo.svg"
}

headers = {'User-Agent': 'Mozilla/5.0'}

os.makedirs('brands', exist_ok=True)

for brand, filename in files.items():
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(filename)}&prop=imageinfo&iiprop=url&format=json"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read())
            
        pages = res['query']['pages']
        page = list(pages.values())[0]
        image_url = page['imageinfo'][0]['url']
        
        # Download the actual image
        img_req = urllib.request.Request(image_url, headers=headers)
        with urllib.request.urlopen(img_req) as img_res:
            img_data = img_res.read()
            
        safe_name = filename.replace('File:', '')
        with open(f'brands/{safe_name}', 'wb') as f:
            f.write(img_data)
            
        print(f"Downloaded {safe_name} ({len(img_data)} bytes)")
    except Exception as e:
        print(f"Error downloading {brand}: {str(e)}")
