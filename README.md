# Rotowire Soccer Scraper
##### A Node.JS scraper that collects European soccer player season stats from Rotowire

`rotowire-soccer-scraper.js`: Exports a function (`scrapeRotowire(username, password, league, season)`)that scrapes the season stats for players from Rotowire, and returns a promise
###### Arguments:
- `username`: Rotowire username
- `password`: Rotowire password
- `league`: Selector value of the league ("EPL", "FRAN", "LIGA", "SERI", "BUND", "MLS", "UCL")
- `season`: Selector value of the season ("2015", "2016", "2017")

###### Returns:
- A promise with an array of arrays of player stats -- eg. (`[["Wayne Rooney", "Everton FC", "10", ...], ...]`) 
