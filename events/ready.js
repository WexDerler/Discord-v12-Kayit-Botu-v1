const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot Aktif WeX MüQ Yapmış moruq`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot'a ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");//online -- dnd -- idle 
  client.user.setActivity("❤️ WeX ", { type: "PLAYING"});
  console.log(``);

};
