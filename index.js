const Discord = require("discord.js");
const youtube = require("discord-youtube-api");
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", async message => {
    if(message.content.startsWith("!play")){
        if (!message.content.includes("https://www.youtube.com/" || "www.youtube.com")){
            const arg = message.content.replace("!play ", "");
            const query = getLink(arg);
            console.log(query);
        }
    }
    if(message.content.startsWith("!stop")){}
});

async function getLink(search){
    return await youtube.searchVideos(search);
}

client.login(process.env.TOKEN);