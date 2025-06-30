const { NBATeams } = require('./NBATeam.js');

(async () => {
    try {
        const NBATeam = await NBATeams.findAll();

        console.log(NBATeam.every(team => team instanceof NBATeams));
        console.log("All teams:", JSON.stringify(NBATeam, null, 2));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();