const { SlashCommandBuilder } = require('discord.js');
const { NBATeams, Player } = require('../../database/NBATeam.js');
const { Op } = require('sequelize');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('findplayer')
        .setDescription('Find a player to see which team they play for.')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The full name of the NBA player.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const playerName = interaction.options.getString('player');

        try {
            const player = await Player.findOne({
                where: {
                    playerName: {
                        [Op.like]: `%${playerName}%`
                    }
                },
                include: {
                    model: NBATeams, 
                    attributes: ['teamName'], 
                }
            });

            if (player) {
                const response = `${player.playerName} is currently on the ${player.NBATeam.teamName}.`;
                await interaction.reply(response);
            } else {
                await interaction.reply(`❌ No player found matching "${playerName}".`);
            }
        } catch (error) {
            console.error('Error querying the database:', error);
            await interaction.reply('❌ An error occurred while retrieving the player information.');
        }
    },
};