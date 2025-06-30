const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize.js');

const NBATeams = sequelize.define('NBATeams', {
    teamName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Player = sequelize.define('Player', {
    playerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    overall: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: {
            min: 0, 
            max: 100,
        },
    },
    teamId: {
        type: DataTypes.INTEGER,
        references: {
            model: NBATeams,
            key: 'id',
        },
    },
});

NBATeams.hasMany(Player, { foreignKey: 'teamId' });
Player.belongsTo(NBATeams, { foreignKey: 'teamId' });

module.exports = { sequelize, NBATeams, Player };