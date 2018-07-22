const Nightmare = require('nightmare')

// create nightmare object
const nightmare = Nightmare({show: false})

// returns a promise of all stats on all players in specified league
// as an array of arrays of stats
// last
// parameters:
// username: rotowire username
// password: rotowire password
// league: league select value ("EPL", "FRAN", "LIGA", "SERI", "BUND", "MLS", "UCL")
// season: year of the season select value ("2015", "2016", "2017")
function scrapeRotowire (username, password, league, season) {
  return nightmare
    .goto('https://www.rotowire.com/users/loginnow.htm')
    .type('input[name="username"]', username)
    .type('.passwordinput', password)
    .click('button[name="Submit"]')
    .wait(4000)
    .goto('https://www.rotowire.com/soccer/player_stats.php')
    .click('#playingTimeStatsSelect')
    .click('#basicStatsSelect')
    .click('#advancedStatsSelect')
    .click('#setpieceStatsSelect')
    .click('#goalieStatsSelect')
    .select('#pos', 'A')
    .select('#league', league)
    .select('#season', season)
    .click('.btn.btn-primaryflat.btn-targets')
    .wait(4000)
    // return the content of the table
    .evaluate(function () {
      const players = []
      $('.footballproj-table tbody tr').each(function (i, elem) {
        var player = []
        $(this).find('td').each(function (i, elem) {
          if (i === 0) {
            player.push($(this).find('a').attr('title'))
          } else if (i === 1) {
            player.push($(this).attr('title'))
          } else {
            player.push($(this).text().replace(/\t+/g, '').replace(/\n+/g, ''))
          }
        })
        players.push(player)
      })
      return players
    })
    .end()
}

module.exports = scrapeRotowire
