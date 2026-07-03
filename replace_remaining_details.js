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

      if (content.includes('EST. 1998 — MINT STREET LEGACY')) {
        content = content.replaceAll('EST. 1998 — MINT STREET LEGACY', 'EST. 1998 — PARK TOWN SHOWROOM');
        replaced = true;
      }
      if (content.includes('Located in the heart of Sowcarpet, Chennai')) {
        content = content.replaceAll('Located in the heart of Sowcarpet, Chennai', 'Located in Park Town, Chennai');
        replaced = true;
      }
      if (content.includes('Mint Street Brassmongery • Sowcarpet')) {
        content = content.replaceAll('Mint Street Brassmongery • Sowcarpet', 'Park Town Showroom • Chennai');
        replaced = true;
      }
      if (content.includes('MINT STREET SOWCARPET CHENNAI')) {
        content = content.replaceAll('MINT STREET SOWCARPET CHENNAI', 'PARK TOWN CHENNAI');
        replaced = true;
      }
      if (content.includes('in Sowcarpet since 1998.')) {
        content = content.replaceAll('in Sowcarpet since 1998.', 'in Park Town since 1998.');
        replaced = true;
      }

      if (replaced) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated details in:', filePath);
      }
    }
  }
}

walk(dir);
