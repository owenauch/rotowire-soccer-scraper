// call node all-league-stat-update
const postNewStats = require("./postNewStats").postNewStats

const fork = require("child_process").fork;
const abuseFreeTrial = require("./abuseFreeTrial");
abuseFreeTrial()
  .then(account => {
    const username = account.username;
    const password = account.password;
    const season = process.argv[2];
    const week = process.argv[3];
    const league = process.argv[4];

    postNewStats(username, password, league, season, week)
    .then((done) => {
      console.log('Stats reported')
    })
  })
  .catch(error => {
    console.log("Creating fake account failed.");
    console.log(error);
  });
