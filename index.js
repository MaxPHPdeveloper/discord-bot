const Discord = require("discord.js");
const client = new Discord.Client();
const { Player } = require("discord-player");
const player = new Player(client);

client.player = player;
console.log(message);
client.player.on('trackStart', (message, track) => message.channel.send(`Now playing ${track.title}...`))
 
client.on("ready", () => {
    console.log("I'm ready !");
});
 
client.on("message", async (message) => {
    const prefix ="!";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
 
    // !play Despacito
    // will play "Despacito" in the member voice channel
 
    if(command === "play"){
        client.player.play(message, args[0], message.member.user);
    }
    if(command === "stop"){
        client.player.stop(message.guild.id);
        message.channel.send("Stopped.")
    }
    
 
});

client.login(process.env.TOKEN);
