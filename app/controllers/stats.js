import Game from '../models/Game.js'

const viewHighScores = async( req, res ) => {
    const highscores = await Game.sequelize.query('SELECT * FROM vw_highscores');
    res.json({highscores: highscores[0]});
};

const viewRecentGames = async( req, res ) => {
    const {gamertag} = req.params;
    const recentGames = await Game.sequelize.query(`SELECT * FROM vw_highscores WHERE gamertag="${gamertag}" ORDER BY ENDED DESC`);
    res.json({recentGames: recentGames[0]});
};


const viewLeaderboard = async( req, res ) => {
    const leaderboard = await Game.sequelize.query('SELECT * FROM vw_leaderboard');
    res.json({leaderboard: leaderboard[0]});
};

export {
    viewHighScores,
    viewRecentGames,
    viewLeaderboard
};