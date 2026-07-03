import https from 'https';
import fs from 'fs';

const url = 'https://www.google.com/search?q=Bhairav+Plywood+Choolai+Chennai&kgmid=/g/11c5rvjcwk';

https.get(url, {
  headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('mobile_page.html', data);
    console.log('Saved mobile_page.html. Length:', data.length);
    // Find Place ID patterns (ChIJ followed by 23 chars)
    const matches = data.match(/ChIJ[a-zA-Z0-9_-]{23}/g);
    console.log('ChIJ Matches:', matches ? [...new Set(matches)] : 'none');
    // Find writereview links
    const lsp = data.match(/https:\/\/search\.google\.com\/local\/writereview\?[^\s"'>]+/g);
    console.log('Write Review Links:', lsp ? [...new Set(lsp)] : 'none');
  });
});
