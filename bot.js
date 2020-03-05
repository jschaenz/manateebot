const configs = require('./config.js');
const cmds = require('./commands.js');
const { ChatClient } = require("dank-twitch-irc");
var Filter = require('bad-words'),
filter = new Filter();
const mincooldown = 1000;
const cooldownList = new Set();
const pingTime = 3600000; //3600000
const pingAmount = [];
var lastMessage = null;
filter.removeWords('cock', 'hell');
const fs = require('fs');

const channels = fs.readFileSync('./channels.txt').toString().split(',').filter(
	function(i) {
		return i != null;
	})
console.log(channels);

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
    password: configs.oauth,
    rateLimits: "default",
});

client.on("ready", () => console.log("Successfully connected to chat"));
client.on("close", error => {
    if (error != null) {
        console.error("Client closed due to error", error);
    }
});
client.connect();
client.joinAll(channels);

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
            try {
                if (cooldownList.has(msg.senderUserID)) {
                }
                else {
                    cooldownList.add(msg.senderUserID);
                    setTimeout(() => {
                        cooldownList.delete(msg.senderUserID);
                    }, mincooldown);

                    let result = await command.invocation(text.toLowerCase(), msg.senderUserID, msg.displayName);
                    if (result != -1) {
                        if(result == undefined){
                            sendMsg(msg.channelName, filter.clean(String("FeelsDankMan 👉 " + result)));
                        }
                        else if(result == 1){
                            let newText = text.split(" ");
                            client.join(newText[0]);
                            sendMsg(msg.channelName, "Successfully Joined!")
                        }
                        else sendMsg(msg.channelName, filter.clean(String(result)));
                    }
                }
            }
            catch(err){
                sendMsg(msg.channelName, filter.clean(String(err)));
            }
        }
    })
});


client.on("WHISPER", msg => {
    console.log(`WHISPER: ${msg.displayName}: ${msg.messageText}`);
  //dont even work cause not verified ome
});
