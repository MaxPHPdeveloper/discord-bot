const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const yts = require('yt-search')

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", async message => {
    if (message.content.startsWith("!play")) {
        if (!message.content.includes("https://www.youtube.com/" || "www.youtube.com")) {
            const arg = message.content.replace("!play ", "");
            //da finire
        }
    }
    if (message.content.startsWith("!youtube")) {
        const arg = message.content.replace("!youtube ", "");
        const r = await yts(arg);
        const videos = r.videos.slice(0, 5)
        var i = 1;
        videos.forEach(function (v) {
            message.channel.send(`${i}° | ${v.title} (${v.timestamp}) | ${v.author.name}`)
            i++;
        })
    }
    if (message.content.startsWith("!stop")) {
        //da finire
    }
    if (message.content.startsWith("!help")) {
        return message.channel.send(`No Billie ascolta...con kuesto locdaun si tromba a fatica ehhh. Comandi disponibili:\n\n\n1) !play [link] oppure [nome video]        | per ascoltare musica\n2) !youtube [nome video]      | fornisce i primi 5 risultati di youtube\n3) !stop     | per fermare la coda\n\nASSGHARAAA`)
    }
    else return message.channel.send(`Coooos? Usa !help per scoprire tutti i comandi disponibili.`);
});

client.login(process.env.TOKEN);