import { Client, GatewayIntentBits, GuildMember, TextChannel, AttachmentBuilder } from 'discord.js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});


const botToken = process.env.BOT_TOKEN;
const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;


if (!botToken || !welcomeChannelId) {
  console.error('Bot token or welcome channel ID is missing in .env file');
  process.exit(1); 
}


client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});


client.on('guildMemberAdd', async (member: GuildMember) => {
  const channel = member.guild.channels.cache.get(welcomeChannelId) as TextChannel;

  if (!channel) {
    console.error(`Channel with ID ${welcomeChannelId} not found`);
    return;
  }

  const welcomeText = `heyyy khoshumadi ${member}`;
  await channel.send(welcomeText);


  const imagePath = path.join(__dirname, 'welcome-image.png');
  const attachment = new AttachmentBuilder(imagePath);

  await channel.send({ files: [attachment] });
});

client.login(botToken);
