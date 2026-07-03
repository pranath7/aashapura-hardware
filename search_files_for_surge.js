import fs from 'fs';
import path from 'path';

const dir = 'C:\\Users\\91636\\.gemini\\antigravity\\scratch\\aashapura-hardware';

const files = fs.readdirSync(dir);
for (const file of files) {
  const filePath = path.join(dir, file);
  const stat = fs.statSync(filePath);
  if (stat.isFile() && (file.endsWith('.html') || file.endsWith('.txt') || file.endsWith('.json') || file.endsWith('.md'))) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.toLowerCase().includes('surge')) {
      console.log(`Found 'surge' in: ${file}`);
      // Find the domain match
      const matches = content.match(/[a-zA-Z0-9_-]+\.surge\.sh/g);
      if (matches) {
        console.log('Matches:', [...new Set(matches)]);
      }
    }
  }
}
