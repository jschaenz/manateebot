const life = require('./life.json');
const client = require('./app.js');
const fetch = require("node-fetch")
const prefix = "]";


function Format(second) {
    var hour = Math.floor(second / 3600);
    var minute = Math.floor(second % 3600 / 60);
    var second = Math.floor(second % 60);

    if (hour === 0 && minute != 0) {
        return minute + 'm';
    } else {
        if (second === 0 || hour === 0 && minute === 0) {
            return '<1 second'
        }
        else if (minute === 0 && hour === 0) {
            return second + "s"
        }
        else {
            return hour + ' h'
        }
    }
}


const commands = [
    {
        name: prefix + "commands",
        invocation: async (text, senderUID) => {
           
            const trackObj = commands.filter(
                i => i.name
            );
            const comName = trackObj.map(
                i => i.name
            );

            const comNumPre = ((comName.sort().toString().replace(/,/g, " | ").replace(/]/g, '') + " |").split('|')).length;
            const comNum = comNumPre - 1

            return "There are " + comNum + " Commands in total:  " + comName.sort().toString().replace(/,/g, " | ").replace(/]/g, '');
        }
    },


    {
        name: prefix + "ping",
        invocation: async (text, senderUID) => {

            const t0 = process.hrtime();
            await client.client.ping();
            const t1 = process.hrtime(t0);
            const latency = t1[0] * 1e3 + t1[1] / 1e6;

            const uptime = process.uptime();
            const version = process.version;
            return (String("manateebot69v2, Node " + version + " uptime: " + Format(uptime) + " Ping: " + latency.tofixed()));
            //todo: make work Okayga
        }
    },


    {
        name: prefix + "bot",
        invocation: async (text, senderUID) => {
            return ("manateebot69 V2 now running on dank-twitch-irc! Made by MentiOfficial in nodejs");
        }
    },


    {
        name: prefix + "eval",
        invocation: async (text, senderUID) => {
            if (senderUID == "58055575") {
                return (String(await eval('(async () => {' + text + '})()')));
            }
        }
    },


    {
        name: prefix + "bots",
        invocation: async (text, senderUID) => {
            const time = await fetch("https://supinic.com/api/bot/active").then(response => response.json());

            if (time.data.filter(i => i.lastSeenTimestamp != null)) {
                const activebots = time.data.filter(i => i.lastSeenTimestamp != null).map(
                    i => ' | ' + i.name + ' ' + Format((Math.abs(new Date() - new Date(i.lastSeenTimestamp))) / 1000));
                return (String(activebots));
            }
        }
    },


    {
        name: "]calcdeath",
        invocation: async (text, senderUID) => {
            //todo: parse life and get data correctly
            /*
            var country = msg[1];
            var age = msg[2];
            const A = life.LIFE;

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
            */
            return ("This command is currently under construction");
        }

    },





];


module.exports = { commands };
