import fs from 'fs';
import path from 'path';

const dir = 'C:\\Users\\91636\\.gemini\\antigravity\\scratch\\aashapura-hardware\\src';

function walk(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let replaced = false;

      if (content.includes('98400 12345')) {
        content = content.replaceAll('98400 12345', '63829 48976');
        replaced = true;
      }
      if (content.includes('9840012345')) {
        content = content.replaceAll('9840012345', '6382948976');
        replaced = true;
      }

      if (replaced) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated phone references in:', filePath);
      }
    }
  }
}

walk(dir);
