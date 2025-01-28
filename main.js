(async() => { 
require('./system/settings')
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto } = require("@whiskeysockets/baileys")
const WebSocket = require('ws')
const path = require('path')
const pino = require('pino')
const fs = require('fs')
const yargs = require('yargs/yargs')
const cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const os = require('os')
const { randomBytes } = require('crypto')
const PhoneNumber = require('awesome-phonenumber')
const moment = require("moment-timezone")
const chalk = require('chalk')

const { color } = require('./lib/color')
let simple = require('./lib/simple')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
const readline = require("readline");
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

require("http").createServer((_, res) => res.end("Uptime!")).listen(8080)

// RandomBytes
const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)

const tmpDir = path.join(__dirname, 'tmp');
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
    console.log(chalk.green('🔔 Membuat folder "tmp"...\n\n'));
} else {
    console.log(chalk.yellow('🟢 Folder "tmp" sudah ada, melanjutkan memuat plugin...\n\n'));
}


API = (name, path = '/', query = {}, apikeyqueryname) => (name in APIs ? APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: APIKeys[name in APIs ? APIs[name] : name] } : {}) })) : '')
timestamp = {
  start: new Date
}

const PORT = process.env.PORT || 3000

opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
prefix = new RegExp('^[' + (opts['prefix'] || '芒鈧絰zXZ/i!#$%+脗拢脗垄芒鈥毬偮脗掳=脗露芒藛鈥犆冣€斆兟访忊偓芒藛拧芒艙鈥溍偮┟偮�:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/i.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)


DATABASE = db 
loadDatabase = async function loadDatabase() {
  if (db.READ) return new Promise((resolve) => setInterval(function () { (!db.READ ? (clearInterval(this), resolve(db.data == null ? loadDatabase() : db.data)) : null) }, 1 * 1000))
  if (db.data !== null) return
  db.READ = true
  await db.read()
  db.READ = false
  db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    respon : {},
    ...(db.data || {})
  }
  db.chain = _.chain(db.data)
}
loadDatabase()

const printQRInTerminal = process.argv.includes("--qr-code")
const authFolder = `${opts._[0] || 'Session'}`
global.isInit = !fs.existsSync(authFolder)
const folderExists = fs.existsSync(authFolder)
const { state } = await useMultiFileAuthState(authFolder)

const connectionOptions = {
  ...(!printQRInTerminal && {
    pairingCode: true
  }),
  ...(printQRInTerminal && {
    pairingCode: !printQRInTerminal
  }),
  logger: pino({ level: "silent" }), 
  auth: state,
  markOnlineOnConnect: false,
  browser: ["Ubuntu","Chrome","20.0.04"]
}
async function saveCreds() {
  await saveCreds();
    conn.credsUpdate = saveCreds.bind(conn);

}


global.conn = simple.makeWASocket(connectionOptions)
global.ev = global.conn.ev

if(!conn.authState.creds.registered) {
const phoneNumber = await question(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx\n")))
const code = await conn.requestPairingCode(phoneNumber.trim())
console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
}

if (!opts['test']) {
  if (db) setInterval(async () => {
    if (global.db.data) await db.write()
    if (opts['autocleartmp'] && (support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
  }, 30 * 1000)
}
if (opts['server']) require('./server')(conn, PORT)
// Existing QR code handling
if (opts['big-qr'] || opts['server']) {
    conn.on('qr', qr => {
        // Display a message above the QR code
        console.log(chalk.bgBlack(chalk.yellow("Silakan scan QR Code di bawah ini untuk menghubungkan.")));
        generate(qr, { small: false });
    });
}

function clearTmp() {
  const tmp = [os.tmpdir(), path.join(__dirname, './tmp')]
  const filename = []
  tmp.forEach(dirname => fs.readdirSync(dirname).forEach(file => filename.push(path.join(dirname, file))))
  filename.map(file => (
    stats = fs.statSync(file),
    stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3) ?
      fs.unlinkSync(file) :
      null))
}

setInterval(async () => {
    await exec("rm -rf ./tmp/*")
  }, 60 * 60 * 1000)
  
async function getMessage(key){
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id)
return msg?.message
}
return {
conversation: "JazxCode"
}
}

conn.ev.on('message.update', async (chatUpdate) => {
for(const { key, update } of chatUpdate) {
if(update.pollUpdate && key.fromMe) {
const pollCreation = await getMessage(key)
if(pollCreation) {
const pollUpdate = await getAggregateVotesInPollMessage({
message: pollCreation,
pollUpdates: update.pollUpdates,
})
var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
if (toCmd == undefined) return
var prefCmd = prefix + toCmd
conn.appenTextMessage(prefCmd, chatUpdate)
}
}
}
})
    
setInterval(async () => {
    const q = { "key": { "remoteJid": "status@broadcast", "participant":"0@s.whatsapp.net", "fromMe": false, "id": "" },
	"message": { "conversation": "Sukses mencadangkan database.json ✅" }}
    let sesi = await fs.readFileSync('./database.json')
    return await conn.sendMessage('6281340587164@s.whatsapp.net', { document: sesi, mimetype: 'application/json', fileName: 'database.json' }, { quoted: q })
  }, 60 * 60 * 1000)

async function connectionUpdate(update) {
  const { receivedPendingNotifications, connection, lastDisconnect, isOnline, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  if (connection == 'connecting') console.log(chalk.redBright('⚡ Mengaktifkan Bot, Mohon tunggu sebentar...\n\n'))
  if (connection == 'open') console.log(chalk.green('✅ Tersambung\n\n'))
  if (isOnline == true) console.log(chalk.green('Status Aktif\n\n'))
  if (isOnline == false) console.log(chalk.red('Status Mati\n\n'))
  if (receivedPendingNotifications) console.log(chalk.yellow('Menunggu Pesan Baru\n\n'))
  if (connection == 'close') console.log(chalk.red('⏱️ koneksi terputus & mencoba menyambung ulang...\n\n'))
  global.timestamp.connect = new Date
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
    console.log(reloadHandler(true))
  } 
  if (db.data == null) await loadDatabase()
}

process.on('uncaughtException', console.error)

let time = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
let isInit = true, handler = require('./handler')
reloadHandler = function (restatConn) {
  let Handler = require('./handler')
  if (Object.keys(Handler || {}).length) handler = Handler
  if (restatConn) {
    try { conn.ws.close() } catch { }
    conn = {
      ...conn, ...simple.makeWASocket(connectionOptions)
    }
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.onParticipantsUpdate)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.welcome = 'Hai, @user!\nSelamat datang di grup *@subject*\n\n@desc'
  conn.bye = 'Selamat tinggal @user!'
  conn.spromote = '@user sekarang admin!'
  conn.sdemote = '@user sekarang bukan admin!'
  conn.handler = handler.handler.bind(conn)
  conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn)
  conn.connectionUpdate = connectionUpdate.bind(conn)
  conn.credsUpdate = saveCreds.bind(conn)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.onParticipantsUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
plugins = {}
let pluginFiles = fs.readdirSync(pluginFolder).filter(pluginFilter)

if (folderExists) {
    console.log('📑 MEMUAT PLUGINS...\n\n')

    for (let filename of pluginFiles) {
        try {
            plugins[filename] = require(path.join(pluginFolder, filename))
        } catch (e) {
            delete plugins[filename]
        }
    }

    console.log(`✅ Berhasil memuat ${pluginFiles.length} plugins\n\n`)

    reload = (_ev, filename) => {
        if (pluginFilter(filename)) {
            let dir = path.join(pluginFolder, filename)
            if (dir in require.cache) {
                delete require.cache[dir]
                if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
                else {
                    conn.logger.warn(`deleted plugin '${filename}'`)
                    return delete plugins[filename]
                }
            } else conn.logger.info(`requiring new plugin '${filename}'`)
            let err = syntaxerror(fs.readFileSync(dir), filename)
            if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
            else try {
                plugins[filename] = require(dir)
            } catch (e) {
                conn.logger.error(`error require plugin '${filename}\n${e}'`)
            } finally {
                plugins = Object.fromEntries(Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b)))
            }
        }
    }
    fs.watch(path.join(__dirname, 'plugins'), reload)
    reloadHandler()
}


// Quick Test
async function _quickTest() {
      let test = await Promise.all([
        cp.spawn('ffmpeg'),
        cp.spawn('ffprobe'),
        cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
        cp.spawn('convert'),
        cp.spawn('magick'),
        cp.spawn('gm'),
        cp.spawn('find', ['--version'])
      ].map(p => {
        return Promise.race([
          new Promise(resolve => {
            p.on('close', code => {
              resolve(code !== 127)
            })
          }),
          new Promise(resolve => {
            p.on('error', _ => resolve(false))
          })
        ])
      }))
      let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
      console.log(test)
      let s = support = {
        ffmpeg,
        ffprobe,
        ffmpegWebp,
        convert,
        magick,
        gm,
        find
      }
      Object.freeze(support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
      if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
      if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
    }

_quickTest()
      .then(() => conn.logger.info('Quick Test Done'))
      .catch(console.error)

  if (folderExists) {
 console.log(chalk.white(time), chalk.cyan("Connecting..."))
 }
})()

const now = new Date();
const options = {
  timeZone: 'Asia/Jakarta',
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};
const formatter = new Intl.DateTimeFormat('en-US', options);
const datetimeString = formatter.format(now);

// Function
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
