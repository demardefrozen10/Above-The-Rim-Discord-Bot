const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags, EmbedBuilder  } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMembers,
	  GatewayIntentBits.GuildMessages, 
	  GatewayIntentBits.MessageContent   
	]
  });
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.once(Events.ClientReady, async (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  
	const guild = client.guilds.cache.get('1372950800279535776'); 
	if (!guild) return;
  
	const rulesChannel = guild.channels.cache.get('1372969683933860010');
	if (!rulesChannel || !rulesChannel.isTextBased()) return;
  
	const embed = new EmbedBuilder()
	  .setTitle('📜 General Information:')
	  .setDescription(
		`• Quarter length is 7 minutes, difficulty is Hall of Fame.\n\n` +
		`• Quitting a game is never allowed.\n\n` +
		`• We expect users to play at a pace of **7 games per week**. Failure to do so may result in penalties, including loss of upgrades and removal from the league.\n\n` +
		`• This is a progression league. Each season lasts anywhere between 3-5 weeks, depending on activity. After 4 complete season, a re-draft occurs.\n\n` +
		`• **Playoff seeding** is based on record and activity. We emphasize activity MORE than your win percentage.\n\n` +
		`• This is a **money prize league**, however it is free to play. Upgrades are made fair so everyone has a fair advantage to play without purchasing upgrades. Admins donate their time — all we ask is that you meet game requirements and show respect.`
	  )
	  .setColor(0x5865F2)

	
	  const secondEmbed = new EmbedBuilder()
	  .setTitle('📘 Gameplay Rules')
	  .setDescription(
		`Note: Any violation of the following rules will result in a game suspension of your best player.\n\n` +

		`**Rule #1 - Bench Minutes** \n` +
		`Must run a 8 man rotation, with 8 players playing a minimum of 10 minutes per game.\n\n` +
	
		`**Rule #2 - On-Ball Defense** \n` +
		`• Must play on-ball defense, unless a play is being ran, you're in transition, or a pick/pop action. In that case, you may switch onto the defender that is in the action, however upon completion, you MUST go back to the on-ball player. In a zone, you can use any defender "off-ball".\n\n` +
	
		`**Rule #3 - No 5-out offense** \n` +
		`5-out offense is not allowed. If you're running a quick isolation, your freelance setting must be in 4-out-1 active otherwise you will be in 5-out!\n\n` +
	
		`**Rule #4 - Player Positions** \n` +
		`You can only play a players position based on their player card. If you want to switch to a different position, you can purchase a position change.\n\n` +
	
		`**Rule #5 - Don't Be Toxic** \n` +
		`Have fun. Don't be toxic and enjoy our community.\n\n` +

		`**Rule #6 - Timer Expiry** \n` +
		`If a player is gone too long without notice, after 3 times, you can quit and recieve the win.\n\n` +

		`**Rule #7 - No Simming CPU Games** \n` +
		`You will be punished for simming CPU games.\n\n`
	  )
	  .setColor(0xED4245); 
	
  
	const messages = await rulesChannel.messages.fetch({ limit: 10 });
	const alreadySent = messages.some(msg => msg.author.id === client.user.id && msg.embeds.length > 0);
  
	if (!alreadySent) {
	  await rulesChannel.send({ embeds: [embed, secondEmbed] });
	  console.log('Rules message sent!');
	} else {
	  console.log('Rules message already exists. Skipping.');
	}
  });
  


client.on(Events.GuildMemberAdd, async (member) => {
	const channel = member.guild.channels.cache.find(
	  ch => ch.name === 'welcome-users'
	);
  
	if (!channel) return;
  
	const channelId = '1372969683933860010'
	const embed = new EmbedBuilder()
	  .setTitle('Welcome to our league!')
	  .setDescription(`Hey ${member}, welcome to **Above The Rim** League! Please read this and follow along so that we can set you up. 
  
  First step is to head over to <#${channelId}>! and read everything over. We do things differently so please read them thoroughly. If you agree to the rules, type !agree and I'll help you to the next step.`)
	  .setColor(0x5865F2);
  
	channel.send({ embeds: [embed] });
  });


  client.on(Events.MessageCreate, async (message) => {
	if (message.author.bot) return;

	if (message.content.toLowerCase() !== '!agree') return;

	const rulesChannelId = '1372969683933860010';

	if (message.channel.id !== rulesChannelId) return;

	await message.reply(`Thanks for agreeing, ${message.member}! See which team you want to select in <#1375567017284735006> and head to <#1374998183188631615> and type your gamertag as well as the team you've choosen! Remember, you can switch teams as long as you don't make any trades.`);

});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.login(token);
