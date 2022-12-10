import { viewHighScores, viewLeaderboard, viewRecentGames } from '../controllers/stats.js';

import express from 'express';

const router = express.Router();

router.get("/stats/highscores/", viewHighScores)
router.get("/stats/recentgames/:gamertag", viewRecentGames),
router.get("/stats/leaderboard/", viewLeaderboard)

export default router;