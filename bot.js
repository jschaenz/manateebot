const fetch = require("node-fetch");
const lifeExpectancy = require('life-expectancy');
const tmi = require('tmi.js');
const dankList = require('./config.js')
const cooldownList = new Set();
const mincooldown = 1000;
const pingTime = 600000;
const pingAmount = [];
var lastMessage = null;

function sendMsg(channel, message) {
    if (message === lastMessage) {
        message = message + " \u{E0000} ";
    }
    lastMessage = message;
    client.say(channel, message);
}

async function PingSupinicApi() {
    pingAmount.push('ping')
    const ping = (await fetch(dankList.supiniactive, {
        method: 'PUT',
    }).then(response => response.json()))
    console.log(ping)
}
setInterval(() => { PingSupinicApi() }, pingTime);

const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: 'manateebot69',
        password: dankList.oauth,
    },
    channels: dankList.activechannles
};
const client = new tmi.client(options);
client.connect();

client.on('chat', async (channel, user, message, self) => {

    if (user['display-name'] === "manateeoverlord69") {
        var permission = 1;
    }
    else permission = 0;

    if (message.startsWith("]bot")) {
        try {
            if (cooldownList.has(user['user-id'])) {
            }
            else {
                cooldownList.add(user['user-id']);
                setTimeout(() => {cooldownList.delete(user['user-id']);
                },5000);
                
                sendMsg(channel, 'really basic bot made by manateeoverlord69 using nodejs. Do ]commands for more info');
            }
        }
        catch (err) {
            sendMsg(channel, user['display-name'] + ' You did a fucky wucky! ' + err);
        }
    }



    if (message.startsWith("]commands")) {
        try {

            if (cooldownList.has(user['user-id'])) {
            }
            else {
                cooldownList.add(user['user-id']);
                setTimeout(() => {cooldownList.delete(user['user-id']);
                }, 5000);

                sendMsg(channel, 'commands: bot, ping, pingme, eval, say, calcdeath');
            }
        }
        catch (err) {
            sendMsg(channel, user['display-name'] + ' You did a fucky wucky! ' + err);
        }
    }



    if (message==="]ping") {
        try {
            if (cooldownList.has(user['user-id'])) {
            }
            else {
                cooldownList.add(user['user-id']);
                setTimeout(() => {cooldownList.delete(user['user-id']);
                }, 5000);

                client.ping().then(function (data) {
                    let ping = Math.floor(Math.round(data * 1000))
                    sendMsg(channel, 'Ping to tmi is ' + ping + 'ms. Last update: November 9th');
                })
            }
        }
        catch (err) {
            sendMsg(channel, user['display-name'] + ' You did a fucky wucky! ' + err);
        }
    }



    if (message.startsWith("]pingme")) {
        try {
            if (cooldownList.has(user['user-id'])) {
            }
            else {
                cooldownList.add(user['user-id']);
                setTimeout(() => {cooldownList.delete(user['user-id']);
                }, 5000);

                sendMsg(channel, user['display-name'] + ' pinged');
            }
        }
        catch (err) {
            sendMsg(channel, user['display-name'] + ' You did a fucky wucky! ' + err);
        }
    }



    if (message.startsWith("]reservedforfuturecommand")) {
        try {
            if (cooldownList.has(user['user-id'])) {
            }
            else {
                cooldownList.add(user['user-id']);
                setTimeout(() => {cooldownList.delete(user['user-id']);
                }, 5000);

                sendMsg(channel, user['display-name'] + ' ' );
            }
        }
        catch (err) {
            sendMsg(channel, user['display-name'] + ' You did a fucky wucky! ' + err);
        }
    }

    
    
    if (message.startsWith("]eval")) {
        try {
            if (cooldownList.has(user['user-id'])) { }
            else {
                cooldownList.add(user['user-id']);
                setTimeout(() => {cooldownList.delete(user['user-id']);
                }, mincooldown);
            
                if (permission === 1) {

                    const msg = message.split(' ');
                    var i;
                    var text = '';
                    for (i = 1; i < msg.length; i++) {
                        text += msg[i];
                        text += ' ';
                    }
                    if (message === "]eval return (typeof kunszg)") {
                        sendMsg(channel, "Racist");
                    }
                    else {
                        const evaluation = await eval('(async () => {' + text + '})()');
                        console.log(evaluation)
                        sendMsg(channel, String(evaluation));
                    }
                }
                else if (user['display-name'] != "manateebot69") {
                    sendMsg(channel, "You dont have permission to use this command! Maybe ask my owner for help FeelsDankMan")
                }
            }
        }
        catch (err) {
            sendMsg(channel, user['display-name'] + ' You did a fucky wucky! ' + err);
        }
    }



    if (message.startsWith("]say")) {
        try {
            if (cooldownList.has(user['user-id'])) { }
            else {
                cooldownList.add(user['user-id']);
                setTimeout(() => {cooldownList.delete(user['user-id']);
                }, 1000);

                if (permission === 1) {

                    const msg = message.split(' ');
                    var i;
                    var text = '';
                    for (i = 1; i < msg.length; i++) {
                        text += msg[i];
                        text += ' ';
                    }

                    sendMsg(channel, text);
                }

                else if (user['display-name'] != "manateebot69") {
                    sendMsg(channel, "You dont have permission to use this command! Maybe ask my owner for help FeelsDankMan")
                }
            }
        }
        catch (err) {
            sendMsg(channel, user['display-name'] + ' You did a fucky wucky! ' + err);
        }
    }



    if (message.startsWith("]calcdeath")) {
    try {
        if (cooldownList.has(user['user-id'])) { }
        else {
            cooldownList.add(user['user-id']);
            setTimeout(() => {cooldownList.delete(user['user-id']);
            }, 5000);

            if (message === "]calcdeath") {
                sendMsg(channel, 'Use ]calcdeath Country Age');
            }
            else {
                const msg = message.split(' ');
                var country = msg[1];
                var age = msg[2];
                const A = lifeExpectancy(country);
                var lifeleft = Math.round(A[0].life - age);
                var deathdate = Math.round(lifeleft + 2019);
                if (lifeleft < 0) {
                    lifeleft = lifeleft * -1;
                    sendMsg(channel, user['display-name'] + ' By the avg. Life expectancy you would have died ' + lifeleft + ' years ago! That was in ' + deathdate);
                }
                else {
                    sendMsg(channel, user['display-name'] + ' you have around ' + lifeleft + ' years of life left, meaning you will most likely die in ' + deathdate
                    );
                }
            }
        }
    }
    catch (err) {
        sendMsg(channel, user['display-name'] + ' ' + err + ' (Probably wrong country code FeelsDankMan )');
    }
}



});
