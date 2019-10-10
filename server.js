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
    channels: ['manateeoverlord69']
};

const client = new tmi.client(options);
client.connect();

client.on('chat', function (channel, user, message, self) {
    if (message === "~pingme") {
        client.say(channel, user['display-name'] + ' pinged');
    }
    if (message === "~ping") {
        client.ping().then(function (data) {
            let ping = Math.floor(Math.round(data * 1000))
            client.say(channel, 'Version 0.16, ping is ' + ping + 'ms');
        })
    }
    if (message === "~worldpop") {
        client.say(channel, 'Current estimated World population is 7,736,055,641');
    }

    if (message.startsWith("~calcdeath")) {
        if (message === "~calcdeath") {
            client.say(channel, 'Use ~calcdeath Country your age');
        }
        else {
            const msg = message.split(' ');
            var country = msg[1];
            var age = msg[2];
            console.log(lifeExpectancy(country));
            const A = lifeExpectancy(country);
            console.log(A[0].life); 
            client.say(channel,A[0].life);
        }
    }
});
