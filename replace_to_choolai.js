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

      if (content.includes('Park Town, Chennai')) {
        content = content.replaceAll('Park Town, Chennai', 'Choolai, Chennai');
        replaced = true;
      }
      if (content.includes('Park Town')) {
        content = content.replaceAll('Park Town', 'Choolai');
        replaced = true;
      }
      if (content.includes('600007')) {
        content = content.replaceAll('600007', '600012');
        replaced = true;
      }

      if (replaced) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated to Choolai in:', filePath);
      }
    }
  }
}

walk(dir);
