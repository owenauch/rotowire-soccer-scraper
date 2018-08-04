const Nightmare = require('nightmare')
require('nightmare-download-manager')(Nightmare);

const fileName = randomString(10);

// create nightmare object
const nightmare = Nightmare({ show: false })
nightmare.on('download', function(state, downloadItem){
  if(state == 'started'){
    nightmare.emit('download', 'csvs/' + fileName + '.csv', downloadItem);
  }
});

// generate a random string of character length n
function randomString(n) {
  var str = "";
  for (var x = 0; x < n / 11; x++) {
    str += Math.random()
      .toString(36)
      .slice(2);
  }
  return str;
}

// returns a promise of all stats on all players in specified league
// as an array of arrays of stats
// last
// parameters:
// username: rotowire username
// password: rotowire password
// league: league select value ("EPL", "FRAN", "LIGA", "SERI", "BUND", "MLS", "UCL")
// season: year of the season select value ("2015", "2016", "2017")
function scrapeRotowire (username, password, league, season) {
  return new Promise ((resolve, reject) => {
    nightmare
    .goto('https://www.rotowire.com/users/login.php')
    .type('input[name="username"]', username)
    .type('input[name="password"]', password)
    .click('button.primary')
    .wait(2000)
    .downloadManager()
    .goto('https://www.rotowire.com/soccer/player_stats.php?league=' + league)
    .click('#playtime')
    .click('#basic')
    .click('#advanced')
    .click('#setpiece')
    .click('#goalie')
    .select("#season", season)
    .click('button.outline')
    .wait(4000)
    .click("button.is-csv")
    .waitDownloadsComplete()
    .end()
    .then((result) => {
      resolve(fileName);
    })
  });
}

module.exports = scrapeRotowire
