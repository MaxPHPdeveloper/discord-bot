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
        if (!message.member.voice.channel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`)
        const connection = message.member.voice.channel.join();
        if (!message.content.includes("https://www.youtube.com/" || "www.youtube.com")) {
            const arg = message.content.replace("!play ", "");
            const r = await yts(arg);
            const videos = r.videos.slice(0, 1);
            const url = videos.url;
            connection.play(ytdl(url, { filter: "audioonly" }));
        }
        else {
            const url = message.content.replace("!play ", "");
            connection.play(ytdl(url, { filter: "audioonly" }));
        }
    }
    else if (message.content.startsWith("!youtube")) {
        if (!message.member.voiceChannel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`)
        const arg = message.content.replace("!youtube ", "");
        const r = await yts(arg);
        const videos = r.videos.slice(0, 5);
        var i = 1;
        videos.forEach(function (v) {
            message.channel.send(`${i}° | ${v.title} (${v.timestamp}) | ${v.author.name}`);
            i++;
        })
        //da finire, manca il player
    }
    else if (message.content.startsWith("!stop")) {
        if (!message.member.voiceChannel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`)
        //da finire, manca la queue da stoppare
    }
    else if (message.content.startsWith("!help")) {
        return message.channel.send(`No Billie ascolta...con kuesto locdaun si tromba a fatica ehhh. Comandi disponibili:\n\n\n1) !play [link] oppure [nome video]\t\t\t| per ascoltare musica\n2) !youtube [nome video]\t\t\t\t\t\t\t| fornisce i primi 5 risultati di youtube\n3) !stop\t\t\t\t\t\t\t\t\t\t\t\t\t| per fermare la coda\n\nASSGHARAAA`);
    }
    else if (!message.author.bot) return message.channel.send(`Coooos? Usa !help per scoprire tutti i comandi disponibili.`);
});

/*
function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));

    server.queue.shift();

    server.dispatcher.on("end", function () {
        if (server.queue[0]) {
            play(connection, message);
        } else {
            connection.disconnect();
        }
    });
}*/

client.login(process.env.TOKEN);
