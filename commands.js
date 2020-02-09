const life = require('./life.json');
const mincooldown = 1000;
const cooldownList = new Set();

const commands = [
    {
        name: "]commands",
        invocation: async (text, senderUID) => {
            try {
                if (cooldownList.has(senderUID)) {
                }
                else {
                    cooldownList.add(senderUID);
                    setTimeout(() => {
                        cooldownList.delete(senderUID);
                    }, 5000);
                    return ("ping, bot, bots, eval, calcdeath");
                }
            }
            catch (err) {
                return (err);
            }
        }

    },

    {
        name: "]ping",
        invocation: async (text, senderUID) => {
            try {
                if (cooldownList.has(senderUID)) {
                }
                else {
                    cooldownList.add(senderUID);
                    setTimeout(() => {
                        cooldownList.delete(senderUID);
                    }, 5000);

                    return (String(await client.ping())); //client.ping not in client.on function
                }
            }
            catch (err) {
                return (err);
            }
        }

    },

    {
        name: "]bot",
        invocation: async (text, senderUID) => {
            try {
                if (cooldownList.has(senderUID)) {
                }
                else {
                    cooldownList.add(senderUID);
                    setTimeout(() => {
                        cooldownList.delete(senderUID);
                    }, 5000);

                    return ("manateebot69 V2 now running on dank-twitch-irc! Made by MentiOfficial in nodejs");
                }
            }
            catch (err) {
                return (err);
            }
        }
    },

    {
        name: "]eval",
        invocation: async (text, senderUID) => {
            try {
                if (senderUID == "58055575") {
                    if (cooldownList.has(senderUID)) {
                    }
                    else {
                        cooldownList.add(senderUID);
                        setTimeout(() => {
                            cooldownList.delete(senderUID);
                        }, mincooldown);
                        return (String(await eval('(async () => {' + text + '})()')));
                    }
                }
            }
            catch (err) {
                return (err);
            }
        }
    },

    {
        name: "]calcdeath",
        invocation: async (text, senderUID) => {
            try {
                if (cooldownList.has(senderUID)) {
                }
                else {
                    cooldownList.add(senderUID);
                    setTimeout(() => {
                        cooldownList.delete(senderUID);
                    }, 5000);
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
            }
            catch (err) {
                return (err);
            }
        }
    },



    /*
    {
        name: "bots",
        invocation: async (text, senderUID) => {
            if (message[0] === "]bots") {
                try {
                    if (cooldownList.has(senderUID)) {
                    }
                    else {
                        cooldownList.add(senderUID);
                        setTimeout(() => {
                            cooldownList.delete(senderUID);
                        }, 5000);
                    }
                    
                    const time = await fetch("https://supinic.com/api/bot/active").then(response => response.json());

                    function twFormat(second) {
                        var hour = Math.floor(second / 3600);
                        var minute = Math.floor(second % 3600 / 60);
                        var second = Math.floor(second % 60);

                        if (hour === 0 && minute != 0) {
                            return minute + 'm';
                        } else {
                            if (second === 0 || hour === 0 && minute === 0) {
                                return '<1 second ago'
                            }
                            else if (minute === 0 && hour === 0) {
                                return second + "s"
                            }
                            else {
                                return hour + ' h'
                            }
                        }
                    }

                    if (time.data.filter(i => i.lastSeenTimestamp != null)) {
                        const activebots = time.data.filter(i => i.lastSeenTimestamp != null).map(
                            i => ' | ' + i.name + ' ' + twFormat((Math.abs(new Date() - new Date(i.lastSeenTimestamp))) / 1000));

                        return (activebots);
                    }

                }  
                catch (err) {
                    return (err);
                }
            }
        }
    },

*/




];


module.exports = { commands };
