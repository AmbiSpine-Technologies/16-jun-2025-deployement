/**
 * Verify Application Setup
 * Run: node verify-setup.js
 * This checks if backend and frontend are properly configured
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function checkServer(url, name) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'GET',
      timeout: 3000,
    };

    const req = http.request(options, (res) => {
      resolve({ success: true, status: res.statusCode, name });
    });

    req.on('error', () => {
      resolve({ success: false, name });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, name, timeout: true });
    });

    req.end();
  });
}

function checkFile(filePath, description) {
  try {
    if (fs.existsSync(filePath)) {
      return { exists: true, description };
    }
    return { exists: false, description };
  } catch {
    return { exists: false, description };
  }
}

async function runChecks() {
  console.log('\n' + '='.repeat(60));
  console.log(colors.blue + '🔍 Application Setup Verification' + colors.reset);
  console.log('='.repeat(60) + '\n');

  // Check servers
  console.log(colors.cyan + '📡 Checking Servers...' + colors.reset);
  const serverChecks = await Promise.all([
    checkServer('http://localhost:5000/api/health', 'Backend Server (Port 5000)'),
    checkServer('http://localhost:3000', 'Frontend Server (Port 3000)'),
  ]);

  serverChecks.forEach((result) => {
    if (result.success) {
      console.log(colors.green + '  ✅' + colors.reset + ` ${result.name} - Running (Status: ${result.status})`);
    } else {
      console.log(colors.red + '  ❌' + colors.reset + ` ${result.name} - Not Running`);
    }
  });

  // Check critical files
  console.log('\n' + colors.cyan + '📁 Checking Critical Files...' + colors.reset);
  const fileChecks = [
    checkFile('../Spreadnext-Backend-Developement/server.js', 'Backend Server File'),
    checkFile('../Spreadnext-Backend-Developement/src/config/db.js', 'Database Config'),
    checkFile('app/utils/profileApi.js', 'Profile API Utils'),
    checkFile('app/utils/postsApi.js', 'Posts API Utils'),
    checkFile('app/utils/jobsApi.js', 'Jobs API Utils'),
    checkFile('app/store/authSlice.js', 'Auth Redux Slice'),
  ];

  fileChecks.forEach((result) => {
    if (result.exists) {
      console.log(colors.green + '  ✅' + colors.reset + ` ${result.description}`);
    } else {
      console.log(colors.red + '  ❌' + colors.reset + ` ${result.description} - Missing`);
    }
  });

  // Check API configuration
  console.log('\n' + colors.cyan + '⚙️  Checking API Configuration...' + colors.reset);
  
  try {
    const profileApi = fs.readFileSync('app/utils/profileApi.js', 'utf8');
    const hasApiUrl = profileApi.includes('localhost:5000') || profileApi.includes('API_BASE_URL');
    if (hasApiUrl) {
      console.log(colors.green + '  ✅' + colors.reset + ' API Base URL configured');
    } else {
      console.log(colors.yellow + '  ⚠️' + colors.reset + ' API Base URL might not be configured');
    }
  } catch {
    console.log(colors.red + '  ❌' + colors.reset + ' Cannot check API configuration');
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  const allServersRunning = serverChecks.every(r => r.success);
  const allFilesExist = fileChecks.every(f => f.exists);

  if (allServersRunning && allFilesExist) {
    console.log(colors.green + '✅ Everything looks good! Ready to test.' + colors.reset);
  } else {
    console.log(colors.yellow + '⚠️  Some checks failed. Please review above.' + colors.reset);
    console.log('\n' + colors.cyan + 'Quick Fixes:' + colors.reset);
    if (!serverChecks[0].success) {
      console.log('  • Start backend: cd Spreadnext-Backend-Developement && npm start');
    }
    if (!serverChecks[1].success) {
      console.log('  • Start frontend: cd Spreadnext-Frontend-Development && npm run dev');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(colors.blue + '📚 Next Steps:' + colors.reset);
  console.log('  1. Read START_TESTING.md for quick start');
  console.log('  2. Follow COMPLETE_APPLICATION_TEST.md for full testing');
  console.log('  3. Open http://localhost:3000 in your browser');
  console.log('  4. Open DevTools (F12) → Network tab to monitor API calls');
  console.log('\n');
}

runChecks().catch(console.error);








