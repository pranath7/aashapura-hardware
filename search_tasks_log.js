import fs from 'fs';
import path from 'path';

const tasksDir = 'C:\\Users\\91636\\.gemini\\antigravity\\brain\\52f82a2b-f383-461e-a66f-9513f6552f0c\\.system_generated\\tasks';

try {
  if (fs.existsSync(tasksDir)) {
    const files = fs.readdirSync(tasksDir);
    console.log('Total task logs:', files.length);
    for (const file of files) {
      if (file.endsWith('.log')) {
        const filePath = path.join(tasksDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.toLowerCase().includes('surge')) {
          console.log(`Match in ${file}:`);
          const lines = content.split('\n');
          for (const line of lines) {
            if (line.toLowerCase().includes('surge') || line.includes('.surge.sh') || line.includes('url:')) {
              console.log('  ', line.slice(0, 150));
            }
          }
        }
      }
    }
  } else {
    console.log('Tasks directory does not exist');
  }
} catch (e) {
  console.error(e.message);
}
