import fs from 'fs';
import path from 'path';

const logDir = 'C:\\Users\\91636\\.gemini\\antigravity\\brain\\52f82a2b-f383-461e-a66f-9513f6552f0c\\.system_generated\\logs';
const transcriptPath = path.join(logDir, 'transcript_full.jsonl');

try {
  if (fs.existsSync(transcriptPath)) {
    const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');
    let count = 0;
    for (const line of lines) {
      if (line.toLowerCase().includes('surge')) {
        console.log(`Line ${count}:`, line.slice(0, 300));
      }
      count++;
    }
  } else {
    console.log('No transcript file found');
  }
} catch (e) {
  console.error(e.message);
}
