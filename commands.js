const life = require('./life.json');
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
        name: prefix + "help",
        invocation: async (text, senderUID, displayname) => {

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
    },


    {
        name: prefix + "ping",
        invocation: async (text, senderUID, displayname) => {

            const latency = Math.floor(Math.random() * 101);
            const uptime = process.uptime();
            const version = process.version;
            const mem = process.memoryUsage().heapUsed / 1024 / 1024;

            return displayname + " ,manateebot69v2, Node " + version + ", uptime: " + Format(uptime) + ", Ping: " + latency + " ms, Memory used: " + Math.round(mem * 100) / 100 + " MB";
        }

    },


    {
        name: prefix + "bot",
        invocation: async (text, senderUID, displayname) => {
            return displayname + " ,manateebot69v2 now running on dank-twitch-irc! Made by MentiOfficial in nodejs. Try ]help for some more Info! ";
        }
    },


    {
        name: prefix + "eval",
        invocation: async (text, senderUID, displayname) => {
            if (senderUID == "58055575") {
                return (await eval('(async () => {' + text + '})()'));
            }
            else return -1;

        }
    },


    {
        name: prefix + "bots",
        invocation: async (text, senderUID, displayname) => {
            const time = await fetch("https://supinic.com/api/bot/active").then(response => response.json());

            if (time.data.filter(i => i.lastSeenTimestamp != null)) {

                const activebots = time.data.filter(i => i.lastSeenTimestamp != null).map(
                    i => i.name + ' ' + Format((Math.abs(new Date() - new Date(i.lastSeenTimestamp))) / 1000)).toString().replace(/,/g, " ×  ");

                return displayname + " , reported Bots are: " + activebots;
            }
        }
    },


    {
        name: prefix + "calcdeath",
        invocation: async (text, senderUID, displayname) => {
            if (text.length == 0) {
                return "use ]calcdeath COUNTRY AGE";
            }
            let newText = text.split(" ");

            const countryFromMsg = newText[0].toLowerCase();
            const age = newText[1];

            for (let i = 0; i < 183; i++) {
                const countryFromFile = life[i].country.toLowerCase();

                if (countryFromFile == countryFromMsg) {
                    let lifeleft = Math.round(life[i].life - age);
                    let deathdate = Math.round(lifeleft + 2020);

                    if (lifeleft < 0) {
                        lifeleft = lifeleft * -1;
                        return displayname + " By the avg. Life expectancy you would have died " + lifeleft + " years ago! That was in " + deathdate;
                    }
                    else return displayname + "you have around " + lifeleft + " years of life left, meaning you will most likely die in " + deathdate;
                }
            }
            return "Something went wrong! Check for correct spelling of the Country";
        }
    },

    {
        name: prefix + "reboot",
        invocation: async (text, senderUID, displayname) => {
            if (senderUID == "58055575") {
                const { spawn } = require('child_process');
                const ls = spawn('ls', ['-lh', '/usr']);

                ls.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

                //await spawn.execSync('sudo git pull').toString().replace(/-{2,}/g, "").replace(/\+{2,}/g, "");
                setTimeout(() => {
                    process.kill(process.pid)
                }, 6000);

            }
            else return -1;
        }

    },

    {
        name: prefix + "shutdown",
        invocation: async (text, senderUID, displayname) => {
            if (senderUID == "58055575") {
                process.kill(process.pid)
            }
            else return -1;
        }
    }

];


module.exports = { commands };
