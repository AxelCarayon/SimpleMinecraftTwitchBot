const minecraftServer = require("./serverCommands");
const tmi = require('tmi.js');
require('dotenv').config();
const fs = require("fs");
const util = require('util');
const { sendCommand } = require("./serverCommands");

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

let commands;

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    if (commands[commandName]) {
        sendCommand(commands[commandName]);
        console.log(`* Executed ${commandName} command`);
    }
}
// Called every time the bot connects to Twitch chat
async function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    await loadCommands().then(data => {
        commands = JSON.parse(data);
    });
}

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

function loadCommands() {
    return readFile('./commandes.json', 'utf8');
}