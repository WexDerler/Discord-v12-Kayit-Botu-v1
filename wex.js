const Discord = require('discord.js');//[WeX]
const client = new Discord.Client();//[WeX]
const ayarlar = require('./ayarlar.json');//[WeX]
const chalk = require('chalk');//[WeX]
const moment = require('moment');//[WeX]
var Jimp = require('jimp');//[WeX]
const { Client, Util } = require('discord.js');//[WeX]
const fs = require('fs');//[WeX]
const db = require('quick.db');//[WeX]
const express = require('express');//[WeX]
require('./util/eventLoader.js')(client);//[WeX]
const path = require('path');//[WeX]
const snekfetch = require('snekfetch');//[WeX]
const ms = require('ms');//[WeX]
//

var prefix = ayarlar.prefix;//[WeX]

const log = message => {//[WeX]
    console.log(`${message}`);//[WeX]
};

client.commands = new Discord.Collection();//[WeX]
client.aliases = new Discord.Collection();//[WeX]
fs.readdir('./komutlar/', (err, files) => {//[WeX]
    if (err) console.error(err);//[WeX]
    log(`[WeX] Toplam ${files.length} komut yüklenecek.`);//[WeX]
    files.forEach(f => {//[WeX]
        let props = require(`./komutlar/${f}`);//[WeX]
        log(`[WeX] ${props.help.name} adlı komut yüklendi.`);//[WeX]
        client.commands.set(props.help.name, props);//[WeX]
        props.conf.aliases.forEach(alias => {//[WeX]
            client.aliases.set(alias, props.help.name);//[WeX]
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//Register Kanalına Atacağı Hoşgeldin Mesajı//[WeX]
client.on("guildMemberAdd", member => {  
  const kanal = member.guild.channels.cache.find(r => r.id === "");//Kayıt Kanalı ID'si
    
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = '❌'
  if (kurulus > 1296000000) kontrol = '✅'
  moment.locale("tr");
  kanal.send("Merhaba WeX'in mekanına hoşgeldin <@" + member + "> \n\n Hesabın "+ gecen +" Önce Oluşturulmuş "+kontrol+" \n\nSunucuya erişebilmek için V.Confirmed odalarında kayıt olup isim yaş belirtmen gerekmektedir. Tagımızı alarak bizlere destek olabilir ve\nayrıcalıklardan faydalanabilirsin. Seni aramızda görmekten mutluluk duyarız!\n<#805474893079511089> kanalından sunucu kurallarımızı okumayı ihmal etme! \n\n Seninle beraber " + member.guild.memberCount + " kişi olduk :tada:")
  });
  
  

//[WeX]-Süpheli Hesap 

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "") 
     var rol = member.guild.roles.cache.get("") //[WeX]-Süpheli Hesaı
     var kayıtsız = member.guild.roles.cache.get(kytsz) //[WeX]-Kayıt Rol
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Merhaba, Hesabın 1 Hafta gibi kısa bir sürede oluşturulmuş oldugunu farkettin ve güvenlik için hesabını şüpheli kısmına aldık.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//-----------------------------------------------------------------------------------------------------------------------------------\\

client.on("guildMemberAdd", async member => {
 member.roles.add("");//Otorol verilecek Rol ID
}
client.on("userUpdate", async (wex, yeni) => {
  var sunucu = client.guilds.cache.get(''); //[WeX]-Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = ""; //[WeX]-Tag
  var tagrol = ""; //[WeX]-Tag Rol ID
  var logKanali = ""; //[WeX]-Tag-Log Kanalı ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || wex.username === yeni.username) return;
  
  if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Hey Merhaba görünüşe göre tagımızı almışsın bu duruma ekibimiz adına çok sevindik artık sende ailemizdensin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});

   //Giriş Çıkış LOG ////[WeX]////
 //GİRİŞ 
 client.on("guildMemberAdd", member => {
    const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`${member.user}(**${member.user.id}**) sunucuya katıldı.`)
    member.guild.channels.cache.get("").send({embed: embed})//"" Olan yere kanal ID'ni gir--[WeX]
 
 })
 //cıkış
 client.on("guildMemberRemove", member => {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`${member.user} (**${member.user.id}**) sunucudan ayrıldı.`)
    member.guild.channels.cache.get("").send({embed: embed})//"" Olan yere kanal ID'ni gir--[WeX]
 })



client.on("guildMemberAdd", member => {
  let sunucuid = ""; //[WeX]-Sunucu ID'ni gir
  let tag = ""; //[WeX]-Tagını Gir
  let rol = ""; //[WeX]-Tag Alındıgı zaman verilek rol ID'nı gir
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const wextagaldıı = new Discord.MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`<@${member.id}> Vayy Be Tagımızla sunucumuza katıldın sen bizdenmişsin zaten haberimiz yok!`)
      .setTimestamp()
     client.channels.cache.get('').send(wextagaldıı)//Gönderilcek Kanal ID
}
})
