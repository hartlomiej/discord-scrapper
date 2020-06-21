const Discord = require('discord.js');
const client = new Discord.Client();
const channelID = "";
const botToken = "";
function gettime(timestamp) {
  return new Date(timestamp).toISOString().replace('T', ' ').substring(0, 19)
}
client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  async function getmsgs(chan_id) {
    chan = client.channels.get(chan_id);
    let messages = await chan.fetchMessages({
      limit: 100
    });
    let allMessages = messages.clone();
    while (messages.size > 0) {
      console.log("Messages: " + allMessages.size);
      messages = await chan.fetchMessages({
        limit: 100,
        before: messages.last().id
      });
      allMessages = allMessages.concat(messages);
    }
    parsed = [...allMessages.values()].map(msg => {
      return {
        author: msg.author.tag.replace(/ /g, '_'),
        date: gettime(msg.createdTimestamp),
        content: msg.cleanContent.replace(/[\r\n]+/gm, ' ')
      }
    });
    for (i = parsed.length - 1; i >= 0; i--) {
      line = `[${parsed[i].date}] <${parsed[i].author}> ${parsed[i].content}`;
      console.log(line)
    }
  }
  getmsgs(channelID);
});
client.login(botToken); 
