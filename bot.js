/*
1	Make your bot connect to chat with any message - so we can see it's actually here. DONE
2	Make your bot respond to any specific message. DONE
3	Claim a command prefix, and create a "bot" command that replies with a short description of your bot, what language it uses and who made it DONE

4	Make it so your bot can adhere to global, unchangeable 1 second slowmode. Don't rely on your bot being VIP/mod. TBD

5	Make it so your bot can bypass the Twitch 30s same - message slowmode - make your own implementation, don't rely on libraries. DONE

6	Add a cooldown system to commands to avoid abuse.

7	Create a command that uses an external API, like Twitch, or anything else you like.

8	Implement a permission system to your commands, so that not everyone can use some specific commands. DONE

9	Implement a debug / eval / say command that will make the bot output anything you tell it to in chat.Give it permission to yourself only.
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
    channels: ['manateeoverlord69', 'supinic']
};
 
const client = new tmi.client(options);

//30s same message slowmode bypass, adds invisible char
var lastMessage = null;
function sendMsg(channel, message) {
    if (message === lastMessage) {
        message = message + " \u{E0000} ";
    }
    lastMessage = message;
    client.say(channel, message);
}

client.connect();

//1s slowmode
client.on("ROOMSTATE", args => { });

client.on('chat', function (channel, user, message, self) {
    if (user['display-name'] === "manateeoverlord69") {
        var permission = 1;
    }
    else permission = 0;

    if (message === "]bot") {
        client.say(channel, 'really basic bot made by manateeoverlord69 using nodejs. Do ]help for more info');
    }

    if (message === "]help") {
        client.say(channel, 'commands: ping, pingme, eval, calcdeath');
    }

    if (message === "]ping") {
        client.ping().then(function (data) {
            let ping = Math.floor(Math.round(data * 1000))
            client.say(channel, 'Ping to tmi is ' + ping + 'ms. Last update: November 6th');
        })
    }

    if (message === "]pingme") {
        client.say(channel, user['display-name'] + ' pinged');
    }

    if (message.startsWith("]eval")) {
        if (permission === 1) {
            if (message.startsWith("]eval say")) {
                const msg = message.split(' ');
                var i;
                var text = '';
                for (i = 2; i < msg.length; i++) {
                    text += msg[i];
                    text += ' ';
                }
                client.say(channel, text);
            }
            else {
                //make it do magic conmputer stuff
            }
        }
        else if (user['display-name'] != "manateebot69") {
            client.say(channel, "You dont have permission to use this command! Maybe ask my owner for help FeelsDankMan")
        }
    }

    if (message.startsWith("]calcdeath")) {
        if (message === "]calcdeath") {
            client.say(channel, 'Use ]calcdeath Country your age ---This command is currently unavailable until i implement an error catcher---');
        }
        else {/*
            const msg = message.split(' ');
            var country = msg[1];
            var age = msg[2];
            const A = lifeExpectancy(country);
            var lifeleft = Math.round(A[0].life - age);
            var deathdate = Math.round(lifeleft + 2019);
            if (lifeleft < 0) {
                lifeleft = lifeleft * -1;
                client.say(channel, user['display-name'] + ' By the avg. Life expectancy you would have died ' + lifeleft + ' years ago! That was in ' + deathdate);
            }
            else {
                client.say(channel, user['display-name'] + ' you have around ' + lifeleft + ' years of life left, meaning you will most likely die in ' + deathdate
                );
            }*/
        }
    }
});
