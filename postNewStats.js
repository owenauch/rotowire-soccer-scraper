const scraper = require("./rotowireSoccerScraper");
const request = require("request");
const csv = require("csv");
const fs = require("fs");

function postNewStats(username, password, league, season, week) {
  console.log(`Starting scrape of ${league}...`);
  return new Promise((resolve, reject) => {
    scraper(username, password, league, season).then(result => {
      console.log(`Scrape of ${league} successful! Sending data to server.`);
      const data = fs.readFileSync(`csvs/${result}.csv`);
      csv.parse(data, { delimiter: "\t" }, (err, players) => {
        players.slice(1).forEach(player => {
          setTimeout(function() {
            sendPlayerToAPI(player, week, season);
          }, 100);
        });
        resolve("done");
      });
    });
  });
}

function sendPlayerToAPI(player, week, season) {
  const playerJSON = {
    name: player[0],
    team: player[1],
    position: player[2],
    yellowCards: player[8],
    yellowRedCards: player[9],
    redCards: player[10],
    goals: player[11],
    assists: player[12],
    shots: player[14],
    shotsOnGoal: player[15],
    interceptions: player[16],
    crosses: player[17],
    accurateCrosses: player[18],
    chancesCreated: player[19],
    tacklesWon: player[22],
    passes: player[25],
    penaltyKickGoals: player[48],
    goalsConceded: player[59],
    cleanSheets: player[60],
    saves: player[61],
    accurateKeeperSweeper: player[64],
    penaltyConceded: player[65],
    effectiveClearances: player[69],
    week: week,
    season: season
  };

  if (playerJSON.name) {
    request(
      {
        url: "http://localhost:3000/api/Stats",
        method: "POST",
        json: playerJSON
      },
      (error, response, body) => {
        if (error) {
          console.log(player);
          console.log(playerJSON);
          console.log(error);
        }
      }
    );
  }
}

module.exports = {
  postNewStats
};
