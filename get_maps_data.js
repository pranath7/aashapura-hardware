import https from 'https';
import fs from 'fs';

function request(url) {
  console.log('Fetching:', url);
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Referer': 'https://www.google.com/'
    }
  }, (res) => {
    console.log('STATUS:', res.statusCode);
    if (res.headers.location) {
      request(res.headers.location);
    } else {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync('maps_direct.html', data);
        console.log('Saved maps_direct.html. Length:', data.length);
        
        // Match ChIJ followed by 23 alphanumeric/dash/underscore chars
        const matches = data.match(/ChIJ[a-zA-Z0-9_-]{23}/g);
        console.log('ChIJ Matches:', matches ? [...new Set(matches)] : 'none');
      });
    }
  });
}

request('https://www.google.com/maps/search/Bhairav+Plywood+Choolai+Chennai');
