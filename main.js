const Discord = require(`discord.js`);

const client = new Discord.Client();

const config = require('./config.json')

const fs = require(`fs`);

var prefix = config.prefix;

client.commands = new Discord.Collection();


const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once(`ready`, () => {
    console.log(`ello govener, im online now :D`)
});

client.on(`message`, message => {
    if (prefix === null) prefix = config.prefix;
    if(!message.content.startsWith(prefix) || message.author.bot ) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === `ping` ){
        client.commands.get(`ping`).execute(message, args);
    } 
    else if (command == `time?`){
        client.commands.get(`time?`).execute(message, args);
    }
    else if (command === `play`) {
        client.commands.get(`play`).execute(message, args);
    }
    else if (command === `leave`) {
        client.commands.get(`leave`).execute(message, args);
    }


    
//space for more text commands
});
client
    .login(config.token)
    .then((token) => console.log("Logged in successfully"))
    .catch(console.error);