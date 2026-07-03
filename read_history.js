import fs from 'fs';
import path from 'path';

const historyPath = 'C:\\Users\\91636\\AppData\\Roaming\\Microsoft\\Windows\\PowerShell\\PSReadLine\\ConsoleHost_history.txt';

try {
  if (fs.existsSync(historyPath)) {
    const content = fs.readFileSync(historyPath, 'utf8');
    const lines = content.split('\n');
    console.log('Total history lines:', lines.length);
    for (const line of lines) {
      if (line.toLowerCase().includes('surge')) {
        console.log('PS History:', line);
      }
    }
  } else {
    console.log('PSReadLine history file does not exist at:', historyPath);
  }
} catch (e) {
  console.error(e.message);
}
