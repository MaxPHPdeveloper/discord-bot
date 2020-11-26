const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()

const config = require("./config.js");


const { Player } = require("discord-player");

const player = new Player(client);

client.player = player;
client.commands = new Discord.Collection();
client.aliases =  new Discord.Collection();
client.config = require('./config.js');
client.emotes = client.config.emotes;
client.colors = client.config.colors;

fs.readdir("./commands/", (err, files) => {
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) return console.log("Could not find any commands!");
    jsfile.forEach((f, i) => { 
    console.log(`Loaded ${f}!`);
        
    let pull = require(`./commands/${f}`);
   
    client.commands.set(pull.config.name, pull);  
    pull.config.aliases.forEach(alias => {
    client.aliases.set(alias, pull.config.name)           
    });
})});

client.on("ready", () => {
    console.log("Ready!");
    client.user.setPresence({status: "dnd", activity: { name: "la cavallina con le fike bianke", type: "PLAYING"}});
});

client.on('message', async message => {
   if(!message.guild || message.author.bot) return;
        
   if (message.content.indexOf(config.prefix) !== 0) return;

   let args = message.content.slice(config.prefix.length).trim().split(" ");
   const command = args.shift().toLowerCase();
   const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
   
   if(!commandFile) return;
  
   try {
     commandFile.run(client, message, args, config.prefix);
   } catch(e) {
     return message.channel.send(`Billie è successo un casino a ${command}:\n ${e.message}`)
   }    
});

client.login(process.env.TOKEN);