// call node all-league-stat-update

const fork = require("child_process").fork;
const abuseFreeTrial = require("./abuseFreeTrial");
abuseFreeTrial()
  .then(account => {
    const username = account.username;
    const password = account.password;
    const season = process.argv[2];
    const week = process.argv[3];

    fork("postNewStats.js", [username, password, "EPL", season, week]);

    fork("postNewStats.js", [username, password, "FRAN", season, week]);

    fork("postNewStats.js", [username, password, "BUND", season, week]);

    fork("postNewStats.js", [username, password, "LIGA", season, week]);

    fork("postNewStats.js", [username, password, "SERI", season, week]);
  })
  .catch(error => {
    console.log("Creating fake account failed.");
    console.log(error);
  });
