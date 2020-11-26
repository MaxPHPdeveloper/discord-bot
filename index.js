const Discord = require("discord.js");
const bot = new Discord.Client();
const { Player } = require("discord-player");
const player = new Player(bot);

bot.player = player;
 
bot.on("ready", () => {
    console.log("Ready!");
});
 
bot.on("message", async (message) => {
    const prefix = "!";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // !play Despacito
    // will play "Despacito" in the member voice channel
    if(command === "play"){
        let track = await bot.player.play(message.member.voice.channel, args[0], message.member.user.tag);
        message.channel.send(`Currently playing ${track.name}!  - Requested by ${track.requestedBy}`)
    }
    if(command === "stop"){
        let track = await bot.player.stop(message.guild.id);
        message.channel.send(`Stopped the queue`)
    }
});


bot.login(process.env.TOKEN);