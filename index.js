const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const yts = require('yt-search')

const client = new Discord.Client();

var queue = [], d = 0;

client.once("ready", () => {
    console.log("Ready!");
});

if (queue.length > 0) {
    play(queue[d]);
}

client.on("message", async message => {
    if (message.content.startsWith("!play")) {
        if (!message.member.voice.channel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`);
        if (!message.content.includes("https://www.youtube.com/" || "www.youtube.com")) {
            var arg = message.content.replace("!play ", "");
            const r = await yts(arg);
            const videos = r.videos.slice(0, 1);
            var url = videos.url;
            addQueue(url);
        }
        else {
            var url = message.content.replace("!play ", "");
            addQueue(url);
        }
    }
    else if (message.content.startsWith("!youtube")) {
        if (!message.member.voice.channel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`);
        var arg = message.content.replace("!youtube ", "");
        const r = await yts(arg);
        const videos = r.videos.slice(0, 5)
        var i = 1;
        var links = [];
        message.channel.send(`Scegli un numero da 1 a 5.`);
        videos.forEach(function (v) {
            message.channel.send(`${i})  ${v.title} (${v.timestamp}) | ${v.author.name}`);
            links[i] = v.url;
            i++;
        })
        i = 1;
        const filter = m => m.author.id === message.author.id;
        let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, });
        switch (collected.first().content) {
            case "1":
                addQueue(links[1]);
                message.channel.send(`Added to queue.`);
                break;
            case "2":
                addQueue(links[2]);
                message.channel.send(`Added to queue.`);
                break;
            case "3":
                addQueue(links[3]);
                message.channel.send(`Added to queue.`);
                break;
            case "4":
                addQueue(links[4]);
                message.channel.send(`Added to queue.`);
                break;
            case "5":
                addQueue(links[5]);
                message.channel.send(`Added to queue.`);
                break;

            default:
                return message.channel.send(`Selezione non valida.`);
                break;
        }
    }
    else if (message.content.startsWith("!stop")) {
        if (!message.member.voice.channel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`);
        if (queue.length > 0) stopQueue();
        else return message.channel.send(`La coda è vuota.`);
    }
    else if (message.content.startsWith("!help")) {
        return message.channel.send(`No Billie ascolta...con kuesto locdaun si tromba a fatica ehhh. Comandi disponibili:\n\n\n1) !play [link] oppure [nome video]\t\t\t| per ascoltare musica\n2) !youtube [nome video]\t\t\t\t\t\t\t | fornisce i primi 5 risultati di youtube\n3) !stop\t\t\t\t\t\t\t\t\t\t\t\t              | per fermare la coda\n\nASSGHARAAA`);
    }
});
function play(url) {
    message.member.voice.channel.join().then(connection => {
        connection.play(ytdl(url, { filter: "audioonly" }));
    });
}
function addQueue(link) {
    queue[d] = link;
    d++;
}

function removeQueue() {
    if (queue[0] != undefined) {
        queue[d] = undefined;
        d--;
    }
}

function stopQueue() {
    for (var p = 0; p < queue.length; p++) {
        queue[p] = undefined;
    }
}

client.login(process.env.TOKEN);
