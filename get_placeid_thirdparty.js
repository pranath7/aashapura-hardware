import https from 'https';

const postData = JSON.stringify({
  query: 'Bhairav Plywood Choolai Chennai'
});

const options = {
  hostname: 'www.gmbidconverter.com',
  path: '/api/convert', // hypothetical conversion endpoint
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('GMB Converter Response:', data);
  });
});

req.on('error', (e) => {
  console.log('Error:', e.message);
});

req.write(postData);
req.end();
