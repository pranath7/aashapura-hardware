import https from 'https';
import fs from 'fs';

function request(url) {
  console.log('Requesting:', url);
  const req = https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5'
    }
  }, (res) => {
    console.log('STATUS:', res.statusCode);
    if (res.statusCode === 301 || res.statusCode === 302) {
      request(res.headers.location);
    } else {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync('maps_final.html', data);
        console.log('Finished. Saved maps_final.html. Size:', data.length);
        const matches = data.match(/ChIJ[a-zA-Z0-9_-]{23}/g);
        console.log('ChIJ Matches:', matches ? [...new Set(matches)] : 'none');
      });
    }
  });
  req.on('error', (e) => console.error('Error:', e.message));
}

request('https://share.google/EDfIRpcH8LC1HDu2f');
