const life = require('./life.json');
const fetch = require("node-fetch")
const ping = require('node-http-ping');
const prefix = "]";
const fs = require('fs');

const channels = fs.readFileSync('./channels.txt').toString().split(',').filter(
    function (i) {
        return i != null;
    })

const cats = fs.readFileSync('./cats.txt').toString().split(',').filter(
    function (i) {
        return i != null;
    })

const suggestions = fs.readFileSync('./suggestions.txt').toString().split(',').filter(
    function (i) {
        return i != null;
    })


function Format(second) {
    var hour = Math.floor(second / 3600);
    var minute = Math.floor(second % 3600 / 60);
    var second = Math.floor(second % 60);

    if (hour === 0 && minute != 0) {
        return minute + 'm';
    } else {
        if (second === 0 || hour === 0 && minute === 0) {
            return '<1 second';
        }
        else if (minute === 0 && hour === 0) {
            return second + "s";
        }
        else {
            return hour + ' h';
        }
    }
}


const commands = [
    {
        name: prefix + "help",
        description: "Shows all commands or if a command is given shows help for the given one",
        invocation: async (text, senderUID, displayname) => {
            let newText = text.toLowerCase().split(" ");

            if (newText.length == 1) {
                const trackObj = commands.filter(
                    q => q.name
                );
                const comName = trackObj.map(
                    q => q.name
                );

                const comNumPre = ((comName.sort().toString().replace(/,/g, " | ").replace(/]/g, '') + " |").split('|')).length;
                const comNum = comNumPre - 1

                return displayname + " ,There are " + comNum + " Commands in total:  " + comName.sort().toString().replace(/,/g, " × ").replace(/]/g, '');
            }
            else if (commands.filter(i => i.name.substring(1).toLowerCase() === newText[0])) {

                if (commands.filter(i => i.name.substring(1).toLowerCase() === newText[0]).length != 0) {   // if there is a specified command and the description exists - respond       
                    return commands.filter((i => i.name.substring(1).toLowerCase() === newText[0])).map(i => i.description)[0]
                }
                else if (commands.filter(i => i.name.substring(1).toLowerCase() === newText[0]).length === 0) {  // if specified command does not exist, throw an error
                    return "This Command does not exist!"
                }
            }
        }
    },

    {
        name: prefix + "ping",
        description: "Pings the Bot and shows stats, or if a Website is given tries to ping it",
        invocation: async (text, senderUID, displayname) => {
            let newText = text.toLowerCase().split(" ");

            if (newText.length == 1) {
                const latency = Math.floor(Math.random() * 101);
                const uptime = process.uptime();
                const version = process.version;
                const mem = process.memoryUsage().heapUsed / 1024 / 1024;
                return displayname + " ,manateebot69v2, Node " + version + ", uptime: " + Format(uptime) + ", Ping: " + latency + " ms, Memory used: " + Math.round(mem * 100) / 100 + " MB";
            }
        }
    },

    {
        name: prefix + "bot",
        description: "Shows basic info about the Bot",
        invocation: async (text, senderUID, displayname) => {
            return displayname + " ,manateebot69v2 now running on dank-twitch-irc! Made by MentiOfficial in nodejs. Try ]help for some more Info! ";
        }
    },

    {
        name: prefix + "eval",
        description: "Runs code given in the Message. Only accessible to verified users",
        invocation: async (text, senderUID, displayname) => {
            if (senderUID == "58055575") {
                return (await eval('(async () => {' + text + '})()'));
            }
            else return -1;
        }
    },

    {
        name: prefix + "bots",
        description: "Shows all Bots that are reporting to Bot API",
        invocation: async (text, senderUID, displayname) => {
            const time = await fetch("https://supinic.com/api/bot/active").then(response => response.json());

            if (time.data.filter(i => i.lastSeenTimestamp != null)) {

                const activebots = time.data.filter(i => i.lastSeenTimestamp != null).map(
                    i => i.name + ' ' + Format((Math.abs(new Date() - new Date(i.lastSeenTimestamp))) / 1000)).toString().replace(/,/g, " ×  ");

                return displayname + " reported Bots are: " + activebots;
            }
        }
    },

    {
        name: prefix + "shutdown",
        description: "Shuts down the Bot. Only accessible to verified users",
        invocation: async (text, senderUID, displayname) => {
            if (senderUID == "58055575") {
                process.kill(process.pid)
            }
            else return -1;
        }
    },

    {
        name: prefix + "channels",
        description: "Shows in how many channels the bot is active. Do channels CHANNELNAME to see if my bot is active in that channel",
        invocation: async (text, senderUID, displayname) => {
            if (text.length == 0) {
                activenum = channels.length;
                return displayname + " I am active in " + activenum + " Channels";
            }
            else {
                let newText = text.toLowerCase().split(" ");
                for (let i of channels) {
                    if (newText[0] == i) {
                        return displayname + " I am active in that Channel FeelsOkayMan";
                    }
                }
                return displayname + " I am not active in that channel FeelsBadMan";
            }
        }
    },

    {
        name: prefix + "join",
        description: "Joins the given Channel",
        invocation: async (text, senderUID, displayname) => {
            if (senderUID == "58055575") {
                if (text.length == 0) {
                    return "No Channel provided!";
                }
                else {
                    let newText = text.toLowerCase().split(" ");
                    fs.appendFileSync('./channels.txt', ',' + newText[0]);
                    return 1;
                }
            }
            else return -1;
        }
    },

    {
        name: prefix + "rcp",
        description: "Shows a random picture of my cat(s), use ]rcp size to see how many are registered",
        invocation: async (text, senderUID, displayname) => {
            let newText = text.split(" ");
            if (text.length == 0) {
                let random = cats[Math.floor(Math.random() * cats.length)]
                return displayname + " " + random;
            }
            else if (newText[0] == "size") {
                return displayname + " There are " + cats.length + " Images available"
            }
            else if (senderUID == "58055575" && newText[0] == "add") {
                fs.appendFileSync('./cats.txt', ',' + newText[1]);
                return "Link added!";
            }
        }
    },

    {
        name: prefix + "suggest",
        description: "Input any suggestions you have for the bot",
        invocation: async (text, senderUID, displayname) => {
            let newText = text.split(" ");
            if (text.length == 0) {
                return "No Suggestion provided FeelsDankMan";
            }
            else if (newText[0] == "size") {
                return displayname + " There are " + suggestions.length + " Suggestions logged";
            }
            else {
                fs.appendFileSync('./suggestions.txt', ',' + text);
                return "Suggestion '" + text + "' saved!"
            }
        }
    }

];

module.exports = { commands };
