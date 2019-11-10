/*
1	Make your bot connect to chat with any message - so we can see it's actually here. DONE
2	Make your bot respond to any specific message. DONE
3	Claim a command prefix, and create a "bot" command that replies with a short description of your bot, what language it uses and who made it DONE
4	Make it so your bot can adhere to global, unchangeable 1 second slowmode. Don't rely on your bot being VIP/mod. DONE
5	Make it so your bot can bypass the Twitch 30s same - message slowmode - make your own implementation, don't rely on libraries. DONE
6	Add a cooldown system to commands to avoid abuse. DONE

7	Create a command that uses an external API, like Twitch, or anything else you like.

8	Implement a permission system to your commands, so that not everyone can use some specific commands. DONE
9	Implement a debug / eval / say command that will make the bot output anything you tell it to in chat.Give it permission to yourself only. DONE

10	Implement a "help" command that dynamically shows the list of your bot's commands, either in chat, or on a website, or in pastebin. But it must be dynamic.
11	Ping the supinic.com API regularly(not less frequently than once an hour when active) to signal that your bot is alive.
12	Create your own database and make at least one command that works with it.
13	Now that you have a database working with your bot, create an REST API that provides some sort of data back
*/

const lifeExpectancy = require('life-expectancy');
const tmi = require('tmi.js');

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
        password: 'oauth:cn7v8azogsclgv7ls4n3bpfvhh5qf8'
    },
    channels: ['manateeoverlord69','nymn','supinic']
};

const client = new tmi.client(options);

var lastMessage = null; //30s same message slowmode bypass, adds invisible char
function sendMsg(channel, message) {
    if (message === lastMessage) {
        message = message + " \u{E0000} ";
    }
    lastMessage = message;
    client.say(channel, message);
}

client.connect();
const cooldownList = new Set();

client.on('chat', async (channel, user, message, self)=> {

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
                setTimeout(() => {
                    cooldownList.delete(user['user-id']);
                }, 5000);

                sendMsg(channel, 'really basic bot made by manateeoverlord69 using nodejs. Do ]help for more info');
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
                setTimeout(() => {
                    cooldownList.delete(user['user-id']);
                }, 5000);

                sendMsg(channel, 'commands: ping, pingme, eval, say, calcdeath');
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
                setTimeout(() => {
                    cooldownList.delete(user['user-id']);
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
                setTimeout(() => {
                    cooldownList.delete(user['user-id']);
                }, 5000);

                sendMsg(channel, user['display-name'] + ' pinged');
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
                setTimeout(() => {
                    cooldownList.delete(user['user-id']);
                }, 1000);
            
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
                setTimeout(() => {
                    cooldownList.delete(user['user-id']);
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
            setTimeout(() => {
                cooldownList.delete(user['user-id']);
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
