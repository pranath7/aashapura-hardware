import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\91636\\.gemini\\antigravity\\brain\\52f82a2b-f383-461e-a66f-9513f6552f0c';
const destDir = 'C:\\Users\\91636\\.gemini\\antigravity\\scratch\\aashapura-hardware\\public\\images';

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Created directory:', destDir);
  }

  // Copy doors_plywood
  const doorsSrc = path.join(srcDir, 'doors_plywood_1782568936105.png');
  const doorsDest = path.join(destDir, 'doors_plywood.png');
  if (fs.existsSync(doorsSrc)) {
    fs.copyFileSync(doorsSrc, doorsDest);
    console.log('Copied doors_plywood.png successfully to:', doorsDest);
  } else {
    console.log('doors_plywood_1782568936105.png does not exist in src.');
  }

} catch (e) {
  console.error('Error copying files:', e.message);
}
