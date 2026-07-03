import fs from 'fs';

try {
  const data = fs.readFileSync('maps_direct.html', 'utf8');
  
  // Search for the hex coordinates
  const h1 = data.includes('3a52f5e76769f515');
  const h2 = data.includes('ed11b13d5e434bcd');
  console.log('Hex 1 Present:', h1);
  console.log('Hex 2 Present:', h2);
  
  // Print matches around hexes if present
  if (h1 || h2) {
    const idx = data.indexOf('ed11b13d5e434bcd');
    console.log('Snippet around hex:', data.slice(Math.max(0, idx - 100), idx + 200));
  }
} catch (e) {
  console.error(e.message);
}
