const https = require('https');

// -- CONFIGURATION
const TOKEN = '8584362973:AAGbj2SWwkFNYkO_0ijhxNIp7hGJeRV_Gfg';
const DEBUG = true;

// -- MAIN FUNCTION: REQUEST TO TELEGRAM API
function apiRequest(method, data) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(data);
        
        const options = {
            hostname: 'api.telegram.org',
            port: 443,
            path: `/bot${TOKEN}/${method}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 60000
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.ok) {
                        resolve(json.result);
                    } else {
                        reject(new Error(`API Error: ${json.description}`));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error("Request Timeout"));
        });
        
        req.write(postData);
        req.end();
    });
}

// -- HELPER FUNCTION
async function sendMessage(chatId, text) {
    return apiRequest('sendMessage', {
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
    });
}

// -- BOT LOGIC
async function handleMessage(message) {
    const chatId = message.chat.id;
    const text = message.text || '';
    const user = message.from.first_name;

    if (DEBUG) console.log(`[MSG] ${user}: ${text}`);

    // Command: /start
    if (text === '/start') {
        await sendMessage(chatId, `Halo *${user}*!\nThis bot run on *Node.js Native* via Magisk Module.`);
    }
    
    // Command: /ping
    else if (text === '/ping') {
        await sendMessage(chatId, 'Pong! 🏓\nServer run smoothly.');
    }
    
    // Command: /up
    else if (text === '/up') {
        const uptime = process.uptime();
        
        const d = Math.floor(uptime / (3600 * 24));
        const h = Math.floor((uptime % (3600 * 24)) / 3600);
        const m = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);

        const parts = [];
        if (d > 0) parts.push(`${d}d`);
        if (h > 0) parts.push(`${h}h`);
        if (m > 0) parts.push(`${m}m`);
        parts.push(`${s}s`);

        await sendMessage(chatId, `Uptime: ${parts.join(' ')}`);
    }

    // Command: /time
    else if (text === '/time') {
        const now = new Date();

        const optionsDate = { 
            timeZone: 'Asia/Makassar', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        
        const optionsTime = { 
            timeZone: 'Asia/Makassar', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        };

        const dateNow = now.toLocaleDateString('id-ID', optionsDate);
        const clockNow = now.toLocaleTimeString('id-ID', optionsTime).replace('.', ':');
        const timeNow = `📅  ${dateNow}\n⏰  ${clockNow} WITA`;

        await sendMessage(chatId, timeNow);
    }

    // Command: /age DD-MM-YYYY atau DD.MM.YYYY
    else if (text.startsWith('/age')) {
        const input = text.split(' ')[1];

        if (!input) {
            return sendMessage(chatId, '⚠️ Format salah!\nContoh: */age 31-12-1999* atau */age 31.12.1999*');
        }

        const parts = input.split(/[-.]/);
        const dayBirth = parseInt(parts[0]);
        const monthBirth = parseInt(parts[1]); 
        const yearBirth = parseInt(parts[2]);
        const birthDate = new Date(yearBirth, monthBirth - 1, dayBirth);
        const now = new Date();

        if (isNaN(birthDate.getTime())) {
             return sendMessage(chatId, '⚠️ Tanggal tidak valid!\n Contoh: *31-12-1999* atau *31.12.1999*');
        }

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += prevMonthDays;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;

        const optionsDate = { 
            timeZone: 'Asia/Makassar', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        const currentStr = now.toLocaleDateString('id-ID', optionsDate);

        const output = `⏱ Usia Anda pada hari ini *${currentStr}* adalah:\n` +
                       `*${years} Tahun ${months} Bulan ${weeks} Minggu ${remainingDays} Hari*`;

        await sendMessage(chatId, output);
    }
}

// -- CORE: LONG POLLING LOOP
let offset = 0;

async function startPolling() {
    if (DEBUG) console.log('[INFO] Starting Long Polling...');

    while (true) {
        try {
            const updates = await apiRequest('getUpdates', {
                offset: offset,
                timeout: 50 
            });

            for (const update of updates) {
                offset = update.update_id + 1;

                if (update.message) {
                    await handleMessage(update.message);
                }
            }

        } catch (error) {
            console.error(`[ERROR] Polling failed: ${error.message}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// --- START ---
process.on('uncaughtException', (err) => {
    console.error('[FATAL] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('[FATAL] Unhandled Rejection:', reason);
});

console.log("[INFO] Bot Service Started.");
startPolling();