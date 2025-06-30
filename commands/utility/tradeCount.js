const { SlashCommandBuilder } = require('discord.js');
const { NBATeams } = require('../../database/NBATeam.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tradecount')
        .setDescription('Get count for how many trades a team has.')
        .addStringOption(option =>
            option.setName('team')
                .setDescription('The name of the NBA team')
                .setRequired(true)
        ),
    async execute(interaction) {
        const teamName = interaction.options.getString('team');

        try {
            const teams = await NBATeams.findAll({
                where: {
                    teamName: {
                        [Op.like]: `%${teamName}%`
                    }
                }
            });

            if (teams.length > 0) {
                const response = teams.map(team => `The ${team.teamName} have made ${team.tradeCount} trades.`).join('\n');
                await interaction.reply(response);
            } else {
                await interaction.reply(`❌ No teams found matching "${teamName}".`);
            }
        } catch (error) {
            console.error('Error querying the database:', error);
            await interaction.reply('❌ An error occurred while retrieving the trade count.');
        }
    },
};