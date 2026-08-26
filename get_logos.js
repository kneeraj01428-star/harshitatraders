const fs = require('fs');
const https = require('https');

const files = {
    "Havells_Logo.svg": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Havells_Logo.svg",
    "A.O._Smith_logo.svg": "https://upload.wikimedia.org/wikipedia/commons/e/eb/A.O._Smith_logo.svg",
    "Pentair_logo.svg": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Pentair_logo.svg",
    "Adani_logo.svg": "https://upload.wikimedia.org/wikipedia/commons/0/07/Adani_logo.svg",
    "Tata_logo.svg": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_logo.svg",
    "Crompton_Greaves_Logo.svg": "https://upload.wikimedia.org/wikipedia/commons/5/52/Crompton_Greaves_Logo.svg",
    "Grundfos_Logo.svg": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Grundfos_Logo.svg"
};

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

for (const [filename, url] of Object.entries(files)) {
    https.get(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            fs.writeFileSync('brands/' + filename, data);
            console.log('Downloaded: ' + filename + ' (' + data.length + ' bytes)');
        });
    });
}
