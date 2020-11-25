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
        if (!message.content.includes("https://www.youtube.com/" || "www.youtube.com")) {
            var arg = String(message.content.replace("!play ", ""));
            var r = (await yts(arg));
            var videos = r.videos.slice(0, 1)
            var url = String(videos.url);
            message.member.voice.channel.join().then(connection => {
                connection.play(ytdl(url, { filter: "audioonly" }).on("finish", () => connection.disconnect()));
            });
        }
        else {
            var url = message.content.replace("!play ", "");
            message.member.voice.channel.join().then(connection => {
                connection.play(ytdl(url, { filter: "audioonly" }).on("finish", () => connection.disconnect()));
            });
        }
    }
    else if (message.content.startsWith("!youtube")) {
        if (!message.member.voice.channel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`);
        var arg = String(message.content.replace("!youtube ", ""));
        var r = (await yts(arg));
        var videos = r.videos.slice(0, 5), i = 1;
        videos.forEach(function (v) {
            message.channel.send(`${i}° | ${v.title} (${v.timestamp}) | ${v.author.name}`);
            i++;
        })
        message.channel.send(`Scegli un numero da 1 a 5.`);
        const filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 10000, }).then(async (collected) => {
            switch (collected.first().content) {
                case "1":
                    var video1 = r.videos.slice(0, 1);
                    var url1 = String(video1.url);
                    message.member.voice.channel.join().then(connection => {
                        connection.play(ytdl(url1, { filter: "audioonly" }).on("finish", () => connection.disconnect()));
                    });
                    break;
                case "2":
                    var video2 = r.videos.slice(1, 2);
                    var url2 = String(video2.url);
                    message.member.voice.channel.join().then(connection => {
                        connection.play(ytdl(url2, { filter: "audioonly" }).on("finish", () => connection.disconnect()));
                    });
                    break;
                case "3":
                    var video3 = r.videos.slice(2, 3);
                    var url3 = String(video3.url);
                    message.member.voice.channel.join().then(connection => {
                        connection.play(ytdl(url3, { filter: "audioonly" }).on("finish", () => connection.disconnect()));
                    });
                    break;
                case "4":
                    var video4 = r.videos.slice(3, 4);
                    var url4 = String(video4.url);
                    message.member.voice.channel.join().then(connection => {
                        connection.play(ytdl(url4, { filter: "audioonly" }).on("finish", () => connection.disconnect()));
                    });
                    break;
                case "5":
                    var video5 = r.videos.slice(4, 5);
                    var url5 = String(video5.url);
                    message.member.voice.channel.join().then(connection => {
                        connection.play(ytdl(url5, { filter: "audioonly" }).on("finish", () => connection.disconnect()));
                    });
                    break;

                default:
                    return message.channel.send(`Selezione non valida.`);
                    break;
            }
        }).catch(() => {
            return message.channel.send('Hai esitato troppo fratello, la fika bianka non aspettate te.');
        });
    }
    else if (message.content.startsWith("!stop")) {
        if (!message.member.voice.channel) return message.channel.send(`Devi essere in un canale vocale per usare questo comando.`)
            (connection => { connection.disconnect(); });
    }
    else if (message.content.startsWith("!help")) {
        return message.channel.send(`No Billie ascolta...con kuesto locdaun si tromba a fatica ehhh. Comandi disponibili:\n\n\n1) !play [link] oppure [nome video]\t\t\t| per ascoltare musica\n2) !youtube [nome video]\t\t\t\t\t\t\t | fornisce i primi 5 risultati di youtube\n3) !stop\t\t\t\t\t\t\t\t\t\t\t\t              | per fermare la coda\n\nASSGHARAAA`);
    }
});

client.login(process.env.TOKEN);
