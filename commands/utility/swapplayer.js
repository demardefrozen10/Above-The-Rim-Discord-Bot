const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Player, NBATeams } = require('../../database/NBATeam.js');
const { Op } = require('sequelize');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('swapplayer')
        .setDescription('Swap a player from 2 different teams.')
        .addStringOption(option =>
            option.setName('playera')
                .setDescription('The full name of NBA player one.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('teama')
                .setDescription('The team name for player one.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('playerb')
                .setDescription('The full name of NBA player two.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('teamb')
                .setDescription('The team name for player two.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const playerAName = interaction.options.getString('playera');
        const playerBName = interaction.options.getString('playerb');
        const teamAName = interaction.options.getString('teama');
        const teamBName = interaction.options.getString('teamb');

        try {
            // Find teams using LIKE
            const teamA = await NBATeams.findOne({
                where: {
                    teamName: {
                        [Op.like]: `%${teamAName}%`
                    }
                }
            });

            const teamB = await NBATeams.findOne({
                where: {
                    teamName: {
                        [Op.like]: `%${teamBName}%`
                    }
                }
            });

            if (!teamA || !teamB) {
                return await interaction.reply('One or both teams could not be found.');
            }

            const playerA = await Player.findOne({
                where: {
                    playerName: {
                        [Op.like]: `%${playerAName}%`
                    },
                    teamId: teamA.id
                }
            });

            const playerB = await Player.findOne({
                where: {
                    playerName: {
                        [Op.like]: `%${playerBName}%`
                    },
                    teamId: teamB.id
                }
            });

            if (!playerA || !playerB) {
                return await interaction.reply('One or both players could not be found on the specified teams.');
            }

            const tempTeamId = playerA.teamId;
            playerA.teamId = playerB.teamId;
            playerB.teamId = tempTeamId;

            await playerA.save();
            await playerB.save();

            await interaction.reply(`✅ Swapped **${playerA.playerName}** and **${playerB.playerName}** between **${teamA.teamName}** and **${teamB.teamName}**.`);
        } catch (error) {
            console.error('Error swapping players:', error);
            await interaction.reply('An error occurred while swapping the players.');
        }
    },
};
