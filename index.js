const Discord = require("discord.js");
const youtube = require("discord-youtube-api");
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", message => {
    if (message.content == "Ping") message.channel.send("Pong!");
});

client.login(process.env.TOKEN);