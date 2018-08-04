const Nightmare = require("nightmare");

// create nightmare object
const nightmare = Nightmare({ show: false });

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

function randomPhoneNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000)
}

function abuseFreeTrial() {
  console.log("Creating free trial account now...");
  const username = randomString(10);
  const password = randomString(10);
  return new Promise((resolve, reject)  => {
    nightmare
    .goto("https://www.rotowire.com/users/free_trial.htm")
    .wait("main.page")
    .type("main.page > form :nth-child(2)", randomString(10))
    .type("main.page > form :nth-child(4)", randomString(10))
    .type("main.page > form :nth-child(6)", randomString(7) + "@" + randomString(5) + ".com")
    .type("main.page > form :nth-child(8)", username)
    .type("main.page > form :nth-child(10)", password)
    .type("main.page > form :nth-child(12)", password)
    .click("button.primary")
    .wait("a.account-top__logout")
    .end()
    .then(link => resolve({
      username: username,
      password: password
    }))
    .catch(error => {
      console.log(error);
      reject(error);
    })
  });
}

module.exports = abuseFreeTrial;
