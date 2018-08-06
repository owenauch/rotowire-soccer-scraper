# $1 season
# $2 week
# $3 prev_week

node ~/git/personal_projects/lb-fantasy-soccer &
sleep 5
node ~/git/personal_projects/rotowire-soccer-scraper/leagueStatUpdate.js $1 $2 EPL &&
node ~/git/personal_projects/rotowire-soccer-scraper/leagueStatUpdate.js $1 $2 FRAN &&
node ~/git/personal_projects/rotowire-soccer-scraper/leagueStatUpdate.js $1 $2 LIGA &&
node ~/git/personal_projects/rotowire-soccer-scraper/leagueStatUpdate.js $1 $2 BUND &&
node ~/git/personal_projects/rotowire-soccer-scraper/leagueStatUpdate.js $1 $2 SERI &&
source ~/git/personal_projects/fs_stat_differ/env/bin/activate &&
python3 ~/git/personal_projects/fs_stat_differ/stat_differ.py $3 $2 $1 &&
kill %1