const util = require('minecraft-server-util');
const tmi = require('tmi.js');
require('dotenv').config();


function sendCommand(commande) {
    const client = new util.RCON('localhost', { port: 25575, enableSRV: true, timeout: 5000, password: 'zebi' });
    client.on('output', (message) => console.log(message));

    client.connect()
        .then(async() => {
            await client.run(commande);

            client.close();
        })
        .catch((error) => {
            throw error;
        });
}

const opts = {
    identity: {
        username: "MinecraftBot",
        password: process.env.oauth_token
    },
    channels: [process.env.channel_name]
};

const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === 'hummm la soupe') {
        //client.say(target, `commande reçue`);
        console.log(`* Executed ${commandName} command`);
        sendCommand("give @a minecraft:beetroot_soup");
    }
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}