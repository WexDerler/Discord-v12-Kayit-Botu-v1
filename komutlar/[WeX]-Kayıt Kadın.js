const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
//[WeX]-Yetkili ID'lerini arttırmak için ["ıd", "ıd",] ("",) yazarak çoğaltabilirsiniz.
if(!["[WeX]-YT-ID", "[WeX]-YT-ID2"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)
  

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(`Bir Kullanıcı Belirt.`)
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`)
const x = message.guild.member(member)

let tag = ""//[WeX]-TAGIN
let isim = args[1]
let yas = Number(args[2])
if(!isim) return message.channel.send(`Bir İsim Belirt`)
if(!yas) return message.channel.send(`Bir Yaş Belirt`)

let bilgi = db.get(`yetkili.${member.id}`);  
db.add(`yetkili.${message.author.id}.kadin`,1 )
db.add(`yetkili.${message.author.id}.toplam`, 1)  
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  

message.react('✅')
x.setNickname(`${tag} ${isim} | ${yas}`)
x.roles.add(kadin)
x.roles.add(xx)
x.roles.remove(kayıtsız)
//
x.setNickname(`${tag} ${isim} | ${yas}`)
x.roles.add(kadin)
x.roles.add(xx)
x.roles.remove(kayıtsız)


kayıtlog.send(`<@${member.user.id}> (${member.id}) adlı kullanıcı <@${author.tag}> tarafından <@&805474892370673678> rolü verilerek sunucuya kayıt oldu `)
genelchat.send(`<@${member.id}>, Aramıza katıldı.`)
giriş.send()

const kadin = message.guild.roles.cache.find(r => r.id === "")//[WeX]-Kadın Rol ID
const xx = message.guild.roles.cache.find(r => r.id === "")//[WeX]-Kadın Rol 2 ID
const kayıtsız = message.guild.roles.cache.find(r => r.id === "")//[WeX]-Kayıtsız Rol ID
const genelchat = message.guild.channels.cache.find(g => g.id === "")//[WeX]-Genel Chat ID'si
const kayıtlog = message.guild.channels.cache.find(g => g.id === "")//[WeX]-Kullanıcı kayıt edildiği zaman Loglanıcagı kanal İD'si

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["k", "kadın", "woman"],
    permLevel: 0
};

exports.help = {
    name: "k"
}

