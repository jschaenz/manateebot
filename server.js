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
        password: ':)'
    },
    channels: ['manateeoverlord69', 'nymn']
};

const client = new tmi.client(options);
client.connect();

client.on('chat', function (channel, user, message, self) {
    if (message === "~pingme") {
        client.say('nymn', user['display-name'] + ' pinged');
    }
    if (message === "~ping") {
        client.ping().then(function (data) {
            let ping = Math.floor(Math.round(data * 1000))
            client.say('manateeoverlord69', 'Version 0.15, ping is ' + ping + 'ms');
        })
    }
    if (message === "~worldpop") {
        client.say('nymn', 'Current estimated World population is 7,736,055,641');
    }
    if (message === "~calcdeath") {
        client.say('nymn', 'Use ~calcdeath "Country of Birth "your age"');
    }

});



