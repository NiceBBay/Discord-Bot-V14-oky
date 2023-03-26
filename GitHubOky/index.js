const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType,
  Moment,
} = require("discord.js");
const logs = require("discord-logs");

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");



const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

logs(client, {
  debug: true
});

client.commands = new Collection();
client.config = require("./config.json");


client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
  client.user.setActivity('Oky • Bot v1.0.1', { type: ActivityType.Streaming, url: "https://www.twitch.tv/nicebbyy"  });
  
});
