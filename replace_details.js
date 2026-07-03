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

      // Replace addresses
      if (content.includes('Mint Street, Sowcarpet, Chennai 600079')) {
        content = content.replaceAll('Mint Street, Sowcarpet, Chennai 600079', '22, Vijaya Vigneshwarar Koil St, Park Town, Chennai 600007');
        replaced = true;
      }
      if (content.includes('Mint Street, Sowcarpet, Chennai 600001')) {
        content = content.replaceAll('Mint Street, Sowcarpet, Chennai 600001', '22, Vijaya Vigneshwarar Koil St, Park Town, Chennai 600007');
        replaced = true;
      }
      if (content.includes('Mint Street, Sowcarpet')) {
        content = content.replaceAll('Mint Street, Sowcarpet', '22, Vijaya Vigneshwarar Koil St, Park Town, Chennai');
        replaced = true;
      }
      if (content.includes('#124, Mint Street, Sowcarpet, Near Elephant Gate, Chennai - 600079, Tamil Nadu.')) {
        content = content.replaceAll('#124, Mint Street, Sowcarpet, Near Elephant Gate, Chennai - 600079, Tamil Nadu.', '22, Vijaya Vigneshwarar Koil St, Park Town, Chennai - 600007, Tamil Nadu.');
        replaced = true;
      }

      // Replace emails
      if (content.includes('sfitkitchen@gmail.com')) {
        content = content.replaceAll('sfitkitchen@gmail.com', 'aashapurahardwares@gmail.com');
        replaced = true;
      }
      if (content.includes('bheraveply@gmail.com')) {
        content = content.replaceAll('bheraveply@gmail.com', 'aashapurahardwares@gmail.com');
        replaced = true;
      }

      if (replaced) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated address/email in:', filePath);
      }
    }
  }
}

walk(dir);
