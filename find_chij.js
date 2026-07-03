import fs from 'fs';

try {
  const data = fs.readFileSync('maps_final.html', 'utf8');
  
  // Find all ChIJ patterns
  const placeIds = data.match(/ChIJ[a-zA-Z0-9_-]{23}/g);
  console.log('ChIJ Matches:', placeIds ? [...new Set(placeIds)] : 'none');

  // Search for any occurrence of placeid
  const placeidOccurrences = [];
  const regex = /placeid=([^&"'\s>]+)/g;
  let match;
  while ((match = regex.exec(data)) !== null) {
    placeidOccurrences.push(match[1]);
  }
  console.log('Place ID occurrences:', [...new Set(placeidOccurrences)]);

} catch (e) {
  console.error('Error:', e.message);
}
