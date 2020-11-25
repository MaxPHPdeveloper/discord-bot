const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const yts = require('yt-search')

const client = new Discord.Client();

var queue = [], d = 0;

client.once("ready", () => {
    console.log("Ready!");
});

function play(queue, d) {
    message.member.voice.channel.join().then(connection => {
        connection.play(ytdl(queue[d], { filter: "audioonly" }).on("end", function () {
            if (queue[d + 1] != undefined) {
                play(queue, d + 1);
            }
            else {
                connection.disconnect;
                clearQueue();
            }
        }));
    });
}

function clearQueue() {
    for (var p = 0; p < queue.length; p++) {
        queue[p] = undefined;
    }
    d = 0;
    return;
}

if (queue[0] != undefined) play(queue, 0);

client.on("message", async message => {
    if (message.content.startsWith("!play")) {
        if (!message.member.voice.channel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`);

        /*
        //se non è un link
        if (!message.content.includes("https://www.youtube.com/" || "www.youtube.com")) {
            var arg = message.content.replace("!play ", "");
            const r = await yts(arg);
            const videos = r.videos.slice(0, 1);
            var url = videos.url;
            message.member.voice.channel.join().then(connection => {
                connection.play(ytdl(url, { filter: "audioonly" }));
            });
        }
        */

        //se è un link
        else {
            var url = message.content.replace("!play ", "");
            queue[d] = url;
            d++;
            return;
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
                queue[d] = links[1];
                d++;
                break;
            case "2":
                queue[d] = links[2];
                d++;
                break;
            case "3":
                queue[d] = links[3];
                d++;
                break;
            case "4":
                queue[d] = links[4];
                d++;
                break;
            case "5":
                queue[d] = links[5];
                d++;
                break;

            default:
                return message.channel.send(`Selezione non valida.`);
                break;
        }
        return;
    }



    else if (message.content.startsWith("!stop")) {
        if (!message.member.voice.channel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`);
        if (message.guild.connection) message.guild.voiceConnection.disconnect();
    }


    else if (message.content.startsWith("!help")) {
        return message.channel.send(`No Billie ascolta...con kuesto locdaun si tromba a fatica ehhh. Comandi disponibili:\n\n\n1) !play [link] oppure [nome video]\t\t\t| per ascoltare musica\n2) !youtube [nome video]\t\t\t\t\t\t\t | fornisce i primi 5 risultati di youtube\n3) !stop\t\t\t\t\t\t\t\t\t\t\t\t              | per fermare la coda\n\nASSGHARAAA`);
    }
});





client.login(process.env.TOKEN);
