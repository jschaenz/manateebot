//const fetch = require("node-fetch")
const configs = require('./config.js');
const pingTime = 3600000;
const pingAmount = [];
var lastMessage = null;
const cmds = require('./commands.js');
const { ChatClient } = require("dank-twitch-irc");




function sendMsg(channel, message) {
    if (message === lastMessage) {
        message = message + " \u{E0000} ";
    }
    lastMessage = message;
    client.say(channel, message);
}

async function sendOnlineStatus() {
    pingAmount.push('ping')
    const ping = (await fetch(configs.supiniactive, {
        method: 'PUT',
    }).then(response => response.json()))
    console.log(ping)
}
setInterval(() => { sendOnlineStatus() }, pingTime);

let client = new ChatClient({
    username: "manateebot69",
    password: configs.pw,
    rateLimits: "default",
});

client.on("ready", () => console.log("Successfully connected to chat"));
client.on("close", error => {
    if (error != null) {
        console.error("Client closed due to error", error);
    }
});
client.connect();
client.joinAll(configs.activechannles);





client.on("PRIVMSG", msg => {
    console.log(`[#${msg.channelName}] ${msg.senderUserID} ${msg.displayName}: ${msg.messageText}`);

    let message = msg.messageText.split(' ');
    var i;
    var text = '';
    for (i = 1; i < message.length; i++) {
        text += message[i];
        text += " ";
    }

    cmds.commands.forEach(async command => {
        if (message[0] === command.name) {
            let result = await command.invocation(text, msg.senderUserID);
            console.log(result);
            sendMsg(msg.channelName, result);
        }
    })

});


client.on("WHISPER", msg => {
    console.log(`WHISPER: ${msg.displayName}: ${msg.messageText}`);
  //dont even work cause not verified ome
});
