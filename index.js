const Discord = require("discord.js");
const youtube = require("discord-youtube-api");
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');

const token = "NzgwODgwOTYwOTQ1OTEzODY3.X71iEQ.D-IOSss5pBGSAk2mxUGfZq399os";

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", message => {
    if (message.content == "Ping") message.channel.send("Pong!");
});

client.login(token);