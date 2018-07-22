const Nightmare = require("nightmare");

// create nightmare object
const nightmare = Nightmare({ show: true });

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

  nightmare
    .goto("https://www.rotowire.com/users/free_trial.htm")
    .wait("#ftlp-form")
    .type("#ftlp-form :nth-child(1) > div.span8 > input", randomString(10))
    .type("#ftlp-form :nth-child(2) > div.span8 > input", randomString(10))
    .type("#ftlp-form :nth-child(3) > div.span8 > input", randomString(7) + "@" + randomString(5) + ".com")
    .type("#ftlp-form :nth-child(4) > div.span8 > input", randomPhoneNumber(10))
    .type("#ftlp-form :nth-child(5) > div.span8 > input", username)
    .type("#ftlp-form :nth-child(6) > div.span8 > input", password)
    .type("#ftlp-form :nth-child(7) > div.span8 > input", password)
    .click("input.btn-primary")
    .wait("p.loggedin")
    .end()
    .catch(error => console.log(error))

  return {
    username: username,
    password: password
  }
}

module.exports = abuseFreeTrial;
