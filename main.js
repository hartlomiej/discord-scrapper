const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const channelID = "";
const botToken = "";
function gettime(timestamp) {
  return new Date(timestamp).toISOString().replace('T', ' ').substring(0, 19)
}
client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  async function getmsgs(chan_id) {
    chan = client.channels.resolve(chan_id);
    let messages = await chan.messages.fetch({
      limit: 100
    });
    let allMessages = messages.clone();
    while (messages.size > 0) {
      console.log("Messages: " + allMessages.size);
      messages = await chan.messages.fetch({
        limit: 100,
        before: messages.last().id
      });
      allMessages = allMessages.concat(messages);
    }
    parsed = [...allMessages.values()].map(msg => {
      return {
        attachment: msg.attachments.first() ? msg.attachments.first().url : null,
        author_id: msg.author.id,
        author_username: msg.author.tag,
        date: msg.createdTimestamp,
        content: msg.cleanContent
      }
    });
    for (i = parsed.length - 1; i >= 0; i--) {
      line = `[${gettime(parsed[i].date)}] <${parsed[i].author_username}> ${parsed[i].content.replace(/[\r\n]+/gm, ' ')}`;
      console.log(line)
    }
    //console.log(JSON.stringify(parsed))
  }
  getmsgs(channelID);
});
client.login(botToken); 
