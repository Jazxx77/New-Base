console.log('Starting...');
let cluster = require('cluster');
let path = require('path');
let fs = require('fs');
let os = require('os');
const CFonts = require('cfonts'); 
const chalk = require('chalk');
const moment = require('moment-timezone');
const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
const Readline = require('readline');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers'); 
const { say } = CFonts
const rl = Readline.createInterface(process.stdin, process.stdout);
const settings = require('./system/settings');

const argv = yargs(hideBin(process.argv))
  .option('pairing-code', {
    alias: 'p',
    type: 'boolean',
    description: 'Pass pairing code flag to main.js',
  })
  .option('autoread', {
    alias: 'r',
    type: 'boolean',
    description: 'Pass autoread flag to main.js',
  })
  .option('autocleartmp', {
    alias: 'c',
    type: 'boolean',
    description: 'Pass autocleartmp flag to main.js',
  })
  .help()
  .argv;


say('KIKU\nMD', {
  font: 'block',
  align: 'center',
  colors: ['blue']
})
say(`Simple Whatsapp Bot By @Kemii`, {
  font: 'console',
  align: 'center',
  colors: ['green']
})

let isRunning = false;

/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return;
  isRunning = true;

  let args = [path.join(__dirname, file)];

  if (argv.pairingCode) {
    args.push('--pairing-code');
  }
  if (argv.autoread) {
    args.push('--autoread');
  }
  if (argv.autocleartmp) {
    args.push('--autocleartmp');
  }

  console.log([process.argv[0], ...args].join(' '));
  console.log('🌎 MEMUAT SOURCE...');
  console.log('✅ DONE !');

  cluster.setupMaster({
    exec: args[0],
    args: args.slice(1),
  });
  const p = cluster.fork();
  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('[❗] Exited with code:', code);
    if (code === 0) return;
    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
      start(file);
    });
  });
  const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test'])
    if (!rl.listenerCount())
      rl.on('line', (line) => {
        p.emit('message', line.trim());
      });
}

start('main.js');
