const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { NBATeams } = require('../../database/NBATeam.js');
const { Op } = require('sequelize');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtradecount')
        .setDescription('Add count for a team.')
        .addStringOption(option =>
            option.setName('team')
                .setDescription('The name of the NBA team.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const teamName = interaction.options.getString('team');

        try {
            const team = await NBATeams.findOne({
                where: {
                    teamName: {
                        [Op.like]: `%${teamName}%`
                    }
                }
            });

            if (team) {
                team.tradeCount += 1;
                await team.save(); 

                await interaction.reply(`The ${team.teamName} now have ${team.tradeCount} trades.`);
            } else {
                await interaction.reply(`No team found matching "${teamName}".`);
            }
        } catch (error) {
            console.error('Error querying the database:', error);
            await interaction.reply('An error occurred while updating the trade count.');
        }
    },
};
