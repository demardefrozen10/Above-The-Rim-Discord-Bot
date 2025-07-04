const sequelize = require('./sequelize.js');
const { NBATeams, Player } = require('./NBATeam.js');

const teamData = {
  'Phoenix Suns': [
      { playerName: 'Karl-Anthony Towns', position: 'PF', overall: 94 },
      { playerName: 'Stephon Castle', position: 'SG', overall: 89 },
      { playerName: 'Myles Turner', position: 'C', overall: 84 },
      { playerName: 'Clint Capela', position: 'C', overall: 82 },
      { playerName: 'Donte DiVincenzo', position: 'SG', overall: 82 },
      { playerName: 'Bradley Beal', position: 'SG', overall: 80 },
      { playerName: 'Adem Bona', position: 'C', overall: 79 },
      { playerName: 'Zeke Nnaji', position: 'C', overall: 78 },
      { playerName: 'Nikola Topić', position: 'PG', overall: 78 },
      { playerName: 'Andre Jackson Jr.', position: 'SG', overall: 77 },
      { playerName: 'Otto Porter', position: 'SF', overall: 75 },
      { playerName: 'Jeff Green', position: 'PF', overall: 72 },
      { playerName: 'Joe Ingles', position: 'SF', overall: 72 },
      { playerName: 'Davis Bertans', position: 'SF', overall: 72 },
      { playerName: 'Ulrich Chomche', position: 'C', overall: 70 },
  ],
  'Oklahoma City Thunder': [
      { playerName: 'Giannis Antetokounmpo', position: 'PF', overall: 97 },
      { playerName: 'Russell Westbrook', position: 'PG', overall: 86 },
      { playerName: 'Gary Trent Jr.', position: 'SG', overall: 81 },
      { playerName: 'Malik Beasley', position: 'SG', overall: 81 },
      { playerName: 'Rob Dillingham', position: 'PG', overall: 81 },
      { playerName: 'C.J. McCollum', position: 'SG', overall: 80 },
      { playerName: 'Jaxson Hayes', position: 'C', overall: 79 },
      { playerName: 'Taylor Hendricks', position: 'PF', overall: 79 },
      { playerName: 'Harrison Barnes', position: 'PF', overall: 78 },
      { playerName: 'Shake Milton', position: 'PG', overall: 78 },
      { playerName: 'Matisse Thybulle', position: 'SF', overall: 76 },
      { playerName: 'Joen Beringer', position: 'C', overall: 75 },
      { playerName: 'Dwight Powell', position: 'SF', overall: 74 },
      { playerName: 'Will Riley', position: 'SF', overall: 74 }
  ],
  'Minnesota Timberwolves': [
      { playerName: 'Devin Booker', position: 'PG', overall: 92 },
      { playerName: 'Chet Holmgren', position: 'PF', overall: 91 },
      { playerName: 'Tyrese Maxey', position: 'PG', overall: 90 },
      { playerName: 'Luguentz Dort', position: 'SG', overall: 82 },
      { playerName: 'Rui Hachimura', position: 'PF', overall: 81 },
      { playerName: 'Brandon Clarke', position: 'C', overall: 81 },
      { playerName: 'Ron Holland', position: 'PF', overall: 80 },
      { playerName: 'Cole Anthony', position: 'PG', overall: 79 },
      { playerName: 'Jarred Vanderbilt', position: 'PF', overall: 78 },
      { playerName: 'Tristan Da Silva', position: 'SF', overall: 78 },
      { playerName: 'Gui Santos', position: 'SF', overall: 77 },
      { playerName: 'Blake Wesley', position: 'PG', overall: 76 },
      { playerName: 'Julian Battle', position: 'SF', overall: 75 },
      { playerName: 'Vlad Goldman', position: 'C', overall: 69 }
  ],
  'Portland Trail Blazers': [
      { playerName: 'Trae Young', position: 'PG', overall: 90 },
      { playerName: 'Ivica Zubac', position: 'C', overall: 88 },
      { playerName: 'Shaedon Sharpe', position: 'SG', overall: 87 },
      { playerName: 'Zaccharie Risacher', position: 'SF', overall: 86 },
      { playerName: 'Payton Pritchard', position: 'PG', overall: 83 },
      { playerName: 'Gradey Dick', position: 'SG', overall: 82 },
      { playerName: 'Robert Williams III', position: 'C', overall: 82 },
      { playerName: 'Nick Smith Jr.', position: 'SG', overall: 81 },
      { playerName: 'Dalton Knecht', position: 'SF', overall: 81 },
      { playerName: 'Jaime Jaquez Jr.', position: 'SF', overall: 80 },
      { playerName: 'Brice Sensabaugh', position: 'SF', overall: 80 },
      { playerName: 'Ben Simmons', position: 'PG', overall: 79 },
      { playerName: 'Tre Johnson', position: 'SG', overall: 77 },
      { playerName: 'Derrick Queen', position: 'PF', overall: 76 },
      { playerName: 'Hugo Gonzalez', position: 'SG', overall: 72 }
  ],
  'Philadelphia 76ers': [
      { playerName: 'Nikola Jokic', position: 'C', overall: 99 },
      { playerName: 'Tyler Herro', position: 'PG', overall: 87 },
      { playerName: 'Collin Sexton', position: 'SG', overall: 83 },
      { playerName: 'Keldon Johnson', position: 'PF', overall: 81 },
      { playerName: 'Ayo Dosunmu', position: 'SF', overall: 80 },
      { playerName: 'Zach Collins', position: 'C', overall: 80 },
      { playerName: 'Isaac Okoro', position: 'SF', overall: 80 },
      { playerName: 'Day`Ron Sharpe', position: 'C', overall: 79 },
      { playerName: 'Jalen Smith', position: 'C', overall: 79 },
      { playerName: 'Marcus Smart', position: 'PG', overall: 78 },
      { playerName: 'Robert Covington', position: 'PF', overall: 78 },
      { playerName: 'Noah Clowney', position: 'PF', overall: 77 },
      { playerName: 'Lonnie Walker IV', position: 'SG', overall: 75 },
      { playerName: 'Patrick Beverley', position: 'PG', overall: 75 },
      { playerName: 'Jamir Watkins', position: 'SF', overall: 69 }
  ],
  'Milwaukee Bucks': [
      { playerName: 'Jimmy Butler', position: 'PF', overall: 86 },
      { playerName: 'Onyeka Okongwu', position: 'C', overall: 86 },
      { playerName: 'Dejounte Murray', position: 'PG', overall: 85 },
      { playerName: 'Bennedict Mathurin', position: 'SF', overall: 84 },
      { playerName: 'Nickeil Alexander-Walker', position: 'SG', overall: 80 },
      { playerName: 'Lonzo Ball', position: 'PG', overall: 80 },
      { playerName: 'Sam Hauser', position: 'SF', overall: 79 },
      { playerName: 'Brandon Boston Jr.', position: 'SG', overall: 79 },
      { playerName: 'Precious Achiuwa', position: 'PF', overall: 79 },
      { playerName: 'Jaden Hardy', position: 'PG', overall: 78 },
      { playerName: 'Jarace Walker', position: 'PF', overall: 78 },
      { playerName: 'Quinten Post', position: 'C', overall: 78 },
      { playerName: 'Caleb Jones', position: 'SF', overall: 77 },
      { playerName: 'Kevin Love', position: 'C', overall: 76 },
      { playerName: 'Justin Holiday', position: 'SG', overall: 71 }
  ],
  'Chicago Bulls': [
      { playerName: 'Donovan Mitchell', position: 'SG', overall: 93 },
      { playerName: 'Kristaps Porzingis', position: 'C', overall: 89 },
      { playerName: 'Jamal Murray', position: 'PG', overall: 86 },
      { playerName: 'Rudy Gobert', position: 'C', overall: 85 },
      { playerName: 'Keegan Murray', position: 'PF', overall: 82 },
      { playerName: 'Santi Aldama', position: 'PF', overall: 81 },
      { playerName: 'Tim Hardaway Jr.', position: 'SG', overall: 81 },
      { playerName: 'Naji Marshall', position: 'SF', overall: 81 },
      { playerName: 'Khris Middleton', position: 'SF', overall: 81 },
      { playerName: 'Terance Mann', position: 'SF', overall: 80 },
      { playerName: 'Gabe Vincent', position: 'PG', overall: 78 },
      { playerName: 'Thomas Bryant', position: 'C', overall: 77 },
      { playerName: 'Nick Clifford', position: 'SF', overall: 76 },
      { playerName: 'Derrick Rose', position: 'PG', overall: 73 }
  ],
  'Washington Wizards': [
  { playerName: 'Franz Wagner', position: 'SF', overall: 90 },
  { playerName: 'Coby White', position: 'SG', overall: 86 },
  { playerName: 'RJ Barrett', position: 'SF', overall: 85 },
  { playerName: 'Nikola Vucevic', position: 'C', overall: 84 },
  { playerName: 'Donovan Clingan', position: 'C', overall: 84 },
  { playerName: 'Jonathan Kuminga', position: 'PF', overall: 83 },
  { playerName: 'Keyonte George', position: 'PF', overall: 82 },
  { playerName: 'Jeremy Sochan', position: 'PF', overall: 82 },
  { playerName: 'Corey Kispert', position: 'SF', overall: 81 },
  { playerName: 'Tre Mann', position: 'PG', overall: 81 },
  { playerName: 'Julian Strawther', position: 'SG', overall: 79 },
  { playerName: 'Trayce Jackson-Davis', position: 'C', overall: 77 },
  { playerName: 'Christian Wood', position: 'C', overall: 75 },
  { playerName: 'Josh Richardson', position: 'PG', overall: 74 },
  { playerName: 'Ryan Nembhard', position: 'PG', overall: 68 }
],
'Cleveland Cavaliers': [
  { playerName: 'Shai Gilgeous-Alexander', position: 'PG', overall: 97 },
  { playerName: 'Isaiah Hartenstein', position: 'C', overall: 84 },
  { playerName: 'Kel’el Ware', position: 'PF', overall: 84 },
  { playerName: 'Keyonte George', position: 'PG', overall: 84 },
  { playerName: 'Cason Wallace', position: 'SG', overall: 82 },
  { playerName: 'Aaron Nesmith', position: 'SF', overall: 82 },
  { playerName: 'Andrew Wiggins', position: 'SF', overall: 81 },
  { playerName: 'PJ Washington', position: 'SF', overall: 81 },
  { playerName: 'Patrick Williams', position: 'PF', overall: 80 },
  { playerName: 'Max Christie', position: 'SG', overall: 79 },
  { playerName: 'Jalen Slawson', position: 'PF', overall: 79 },
  { playerName: 'Julian Champagnie', position: 'SF', overall: 79 },
  { playerName: 'Christian Koloko', position: 'C', overall: 77 },
  { playerName: 'Johni Broome', position: 'PF', overall: 72 }
],
'Boston Celtics': [
  { playerName: 'Jalen Williams', position: 'SF', overall: 90 },
  { playerName: 'Bam Adebayo', position: 'PF', overall: 88 },
  { playerName: 'Derrick White', position: 'SG', overall: 86 },
  { playerName: 'Mitchell Robinson', position: 'C', overall: 80 },
  { playerName: 'Kris Dunn', position: 'SG', overall: 77 },
  { playerName: 'Peyton Watson', position: 'SF', overall: 77 },
  { playerName: 'VJ Edgecombe', position: 'SG', overall: 77 },
  { playerName: 'Luke Kornet', position: 'C', overall: 77 },
  { playerName: 'Malcolm Brogdon', position: 'PG', overall: 76 },
  { playerName: 'Spencer Dinwiddie', position: 'PG', overall: 76 },
  { playerName: 'Olivier-Maxence Prosper', position: 'PF', overall: 76 },
  { playerName: 'Taurean Prince', position: 'SG', overall: 75 },
  { playerName: 'Ricky Council IV', position: 'SF', overall: 75 },
  { playerName: 'Daniel Theis', position: 'C', overall: 72 }
],
'Los Angeles Clippers': [
  { playerName: 'Victor Wembanyama', position: 'C', overall: 97 },
  { playerName: 'Anthony Edwards', position: 'SG', overall: 96 },
  { playerName: 'Jaden Edwards', position: 'SF', overall: 79 },
  { playerName: 'Nah’Shon Hyland', position: 'PG', overall: 78 },
  { playerName: 'Gary Payton II', position: 'SG', overall: 78 },
  { playerName: 'Dorian Finney-Smith', position: 'PF', overall: 76 },
  { playerName: 'DeAndre Jordan', position: 'C', overall: 76 },
  { playerName: 'Lamar Stevens', position: 'SF', overall: 76 },
  { playerName: 'Jordan Beringer', position: 'C', overall: 76 },
  { playerName: 'Dennis Smith Jr.', position: 'PG', overall: 75 },
  { playerName: 'Brandon Saraf', position: 'SG', overall: 74 },
  { playerName: 'Pacôme Dadiet', position: 'SF', overall: 74 },
  { playerName: 'Alex Newell', position: 'PF', overall: 73 },
  { playerName: 'Ricky Rubio', position: 'PG', overall: 72 },
  { playerName: 'Harison Nwosu', position: 'PG', overall: 62 }
],
'Memphis Grizzlies': [
  { playerName: 'LeBron James', position: 'SF', overall: 93 },
  { playerName: 'Jaren Jackson Jr.', position: 'PF', overall: 90 },
  { playerName: 'Anfernee Simons', position: 'PG', overall: 83 },
  { playerName: 'Toumani Camara', position: 'SF', overall: 83 },
  { playerName: 'Kendall Ellis', position: 'PG', overall: 81 },
  { playerName: 'Kyle Kuzma', position: 'SF', overall: 80 },
  { playerName: 'Johnathan Clark', position: 'SF', overall: 80 },
  { playerName: 'Max Strus', position: 'SF', overall: 79 },
  { playerName: 'Jordan Hawkins', position: 'SG', overall: 79 },
  { playerName: 'Grant Williams', position: 'PF', overall: 78 },
  { playerName: 'Jusuf Nurkic', position: 'C', overall: 77 },
  { playerName: 'Jalen Hood-Schifino', position: 'SG', overall: 77 },
  { playerName: 'Drew Eubanks', position: 'C', overall: 77 },
  { playerName: 'Kessler Edwards', position: 'C', overall: 77 },
  { playerName: 'Derrick Holmes II', position: 'PF', overall: 75 }
],
'Atlanta Hawks': [
  { playerName: 'Damian Lillard', position: 'PG', overall: 93 },
  { playerName: 'Zach LaVine', position: 'SG', overall: 87 },
  { playerName: 'Jarrett Allen', position: 'C', overall: 87 },
  { playerName: 'Jaden McDaniels', position: 'SF', overall: 85 },
  { playerName: 'Bobby Portis Jr.', position: 'PF', overall: 83 },
  { playerName: 'D’Angelo Russell', position: 'PG', overall: 80 },
  { playerName: 'Caris LeVert', position: 'SG', overall: 79 },
  { playerName: 'Isaiah Joe', position: 'SG', overall: 79 },
  { playerName: 'Chris Boucher', position: 'C', overall: 78 },
  { playerName: 'Eric Gordon', position: 'SG', overall: 71 },
  { playerName: 'Markieff Morris Sr.', position: 'PF', overall: 71 },
  { playerName: 'Bismack Biyombo', position: 'C', overall: 71 },
  { playerName: 'Adou Thiero', position: 'SF', overall: 70 },
  { playerName: 'Reggie Jackson', position: 'PG', overall: 69 },
  { playerName: '[CAP PG]', position: 'PG', overall: 40 }
],
'Miami Heat': [
  { playerName: 'Anthony Davis', position: 'PF', overall: 96 },
  { playerName: 'Domantas Sabonis', position: 'C', overall: 89 },
  { playerName: 'Brandon Miller', position: 'SG', overall: 87 },
  { playerName: 'Jaden Ivey', position: 'PG', overall: 84 },
  { playerName: 'De’Andre Hunter', position: 'SF', overall: 84 },
  { playerName: 'Chaundee Carrington', position: 'SG', overall: 82 },
  { playerName: 'Cam Whitmore', position: 'SG', overall: 82 },
  { playerName: 'Jarace Walker', position: 'PF', overall: 82 },
  { playerName: 'Wendell Carter Jr.', position: 'C', overall: 80 },
  { playerName: 'Isaiah Stewart', position: 'C', overall: 79 },
  { playerName: 'De’Anthony Melton', position: 'SG', overall: 78 },
  { playerName: 'Tidjane Salaun', position: 'PF', overall: 77 },
  { playerName: 'Orlando Robinson', position: 'C', overall: 76 },
  { playerName: 'Jae Crowder', position: 'SF', overall: 72 },
  { playerName: 'Ronnie Luis', position: 'SF', overall: 70 }
],
'Charlotte Hornets': [
  { playerName: 'James Harden', position: 'PG', overall: 93 },
  { playerName: 'Darius Garland', position: 'PG', overall: 89 },
  { playerName: 'Amen Thompson', position: 'SF', overall: 88 },
  { playerName: 'Cam Thomas', position: 'SG', overall: 86 },
  { playerName: 'Jabari Smith Jr.', position: 'PF', overall: 86 },
  { playerName: 'Kyle Filipowski', position: 'PF', overall: 82 },
  { playerName: 'Ronnie Dunn', position: 'SF', overall: 82 },
  { playerName: 'Reed Sheppard', position: 'SG', overall: 81 },
  { playerName: 'Deron Carter', position: 'PG', overall: 79 },
  { playerName: 'Aleksej Pokusevski', position: 'PF', overall: 76 },
  { playerName: 'Jordan Walsh', position: 'SF', overall: 75 },
  { playerName: 'Udoka Azubuike', position: 'C', overall: 75 },
  { playerName: 'Jonas Aidoo', position: 'C', overall: 74 },
  { playerName: 'Brooks Barnhizer', position: 'SG', overall: 72 },
  { playerName: 'Derrick Pate', position: 'SG', overall: 70 }
],
'Utah Jazz': [
  { playerName: 'Kevin Durant', position: 'PF', overall: 92 },
  { playerName: 'Alexandre Sarr', position: 'PF', overall: 87 },
  { playerName: 'Jalen Suggs', position: 'PG', overall: 87 },
  { playerName: 'Zach Edey', position: 'C', overall: 84 },
  { playerName: 'Matas Buzelis', position: 'PF', overall: 84 },
  { playerName: 'Guerschon Yabusele', position: 'PF', overall: 82 },
  { playerName: 'Kon Knueppel', position: 'SF', overall: 79 },
  { playerName: 'Ousmane Dieng', position: 'PF', overall: 78 },
  { playerName: 'Richaun Holmes', position: 'C', overall: 77 },
  { playerName: 'Cam Reddish', position: 'SF', overall: 77 },
  { playerName: 'Kentavious Caldwell-Pope', position: 'SG', overall: 75 },
  { playerName: 'Kyle Anderson', position: 'PF', overall: 75 },
  { playerName: 'Kevin Sanders', position: 'SG', overall: 75 },
  { playerName: 'Caleb Love', position: 'SG', overall: 69 }
],
'Sacramento Kings': [
  { playerName: 'Josh Giddey', position: 'PG', overall: 87 },
  { playerName: 'Brandon Ingram', position: 'SF', overall: 87 },
  { playerName: 'Mikal Bridges', position: 'SG', overall: 86 },
  { playerName: 'Jordan Poole', position: 'PG', overall: 84 },
  { playerName: 'Lauri Markkanen', position: 'SF', overall: 84 },
  { playerName: 'Yves Missi', position: 'C', overall: 84 },
  { playerName: 'Naz Reid', position: 'C', overall: 84 },
  { playerName: 'G.G. Jackson', position: 'PF', overall: 82 },
  { playerName: 'Isaiah Jackson', position: 'C', overall: 80 },
  { playerName: 'Dalano Banton', position: 'PG', overall: 78 },
  { playerName: 'AJ Green', position: 'SF', overall: 77 },
  { playerName: 'Grayson Allen', position: 'SG', overall: 77 },
  { playerName: 'Victor Oladipo', position: 'SG', overall: 77},
],

'New York Knicks': [
  { playerName: "Jalen Brunson", position: "PG", overall: 93 },
  { playerName: "John Collins", position: "PF", overall: 86 },
  { playerName: "Josh Hart", position: "PF", overall: 84 },
  { playerName: "Malik Monk", position: "SG", overall: 83 },
  { playerName: "Nic Claxton", position: "C", overall: 83 },
  { playerName: "Bol Bol", position: "PF", overall: 81 },
  { playerName: "Jaylin Williams", position: "C", overall: 81 },
  { playerName: "Dante Exum", position: "SG", overall: 80 },
  { playerName: "Kevin Huerter", position: "SF", overall: 79 },
  { playerName: "Royce O’Neale", position: "SF", overall: 79 },
  { playerName: "Chris Paul", position: "PG", overall: 79 },
  { playerName: "Justise Winslow", position: "SF", overall: 77 },
  { playerName: "Kai Jones", position: "C", overall: 77 },
  { playerName: "Quenton Jackson", position: "SG", overall: 75 },
  { playerName: "N. Penbe", position: "PF", overall: 70 }
],

'Los Angeles Lakers': [
  { playerName: "Cade Cunningham", position: "PG", overall: 95 },
  { playerName: "Walker Kessler", position: "C", overall: 88 },
  { playerName: "Christian Braun", position: "SG", overall: 87 },
  { playerName: "Jared McCain", position: "SG", overall: 85 },
  { playerName: "Michael Porter Jr.", position: "SF", overall: 84 },
  { playerName: "Dillon Brooks", position: "SF", overall: 84 },
  { playerName: "Mikal Bridges", position: "PF", overall: 83 },
  { playerName: "Al Horford", position: "PF", overall: 83 },
  { playerName: "Saddiq Bey", position: "SF", overall: 79 },
  { playerName: "Jose Alvarado", position: "PG", overall: 79 },
  { playerName: "Jerami Grant", position: "SF", overall: 78 },
  { playerName: "Mike Conley", position: "PG", overall: 78 },
  { playerName: "Mo Bamba", position: "C", overall: 77 },
  { playerName: "Sam Merrill", position: "SG", overall: 77 },
  { playerName: "Maxi Kleber", position: "PF", overall: 70 }
],

'Orlando Magic': [
  { playerName: "Ja Morant", position: "PG", overall: 93 },
  { playerName: "Jakob Poeltl", position: "C", overall: 84 },
  { playerName: "Trey Murphy III", position: "SF", overall: 83 },
  { playerName: "Da’Quan Harper", position: "SG", overall: 80 },
  { playerName: "Moritz Wagner", position: "C", overall: 79 },
  { playerName: "Tobias Harris", position: "PF", overall: 79 },
  { playerName: "Tyus Jones", position: "PG", overall: 79 },
  { playerName: "Jake LaRavia", position: "SF", overall: 78 },
  { playerName: "Bogdan Bogdanović", position: "SG", overall: 78 },
  { playerName: "Neemias Queta", position: "C", overall: 77 },
  { playerName: "Dalen Terry", position: "SG", overall: 77 },
  { playerName: "Jett Howard", position: "SF", overall: 77 },
  { playerName: "Caleb Williams", position: "SF", overall: 76 },
  { playerName: "KJ Martin Jr.", position: "PF", overall: 76 },
  { playerName: "Bojan Bogdanović", position: "SF", overall: 75 }
],

'Dallas Mavericks': [
  { playerName: "Luka Dončić", position: "PG", overall: 95 },
  { playerName: "De’Aaron Fox", position: "PG", overall: 90 },
  { playerName: "Alperen Şengün", position: "C", overall: 89 },
  { playerName: "Dereck Lively II", position: "C", overall: 86 },
  { playerName: "Ty Jerome", position: "PG", overall: 84 },
  { playerName: "Immanuel Quickley", position: "PG", overall: 83 },
  { playerName: "Cooper Flagg", position: "PF", overall: 83 },
  { playerName: "Sandro Mamukelashvili", position: "C", overall: 79 },
  { playerName: "Julian Champagnie", position: "PF", overall: 79 },
  { playerName: "Malaki Branham", position: "SG", overall: 79 },
  { playerName: "Jeremiah Robinson-Earl", position: "PF", overall: 79 },
  { playerName: "Jock Landale", position: "C", overall: 78 },
  { playerName: "Kobe Bufkin", position: "PG", overall: 78 },
  { playerName: "Hamidou Diallo", position: "SF", overall: 75 },
  { playerName: "Danny Green", position: "SF", overall: 71 }
],

'Brooklyn Nets': [
  { playerName: "Scottie Barnes", position: "PF", overall: 89 },
  { playerName: "Deni Avdija", position: "PF", overall: 87 },
  { playerName: "Julius Randle", position: "PF", overall: 87 },
  { playerName: "Bilal Coulibaly", position: "SF", overall: 85 },
  { playerName: "Mark Williams", position: "C", overall: 85 },
  { playerName: "Anthony Black", position: "PG", overall: 84 },
  { playerName: "Daniel Gafford", position: "C", overall: 84 },
  { playerName: "Cameron Johnson", position: "PF", overall: 83 },
  { playerName: "Miles McBride", position: "SG", overall: 81 },
  { playerName: "David Roddy", position: "PF", overall: 77 },
  { playerName: "Luke Kennard", position: "SG", overall: 77 },
  { playerName: "Josh Green", position: "SF", overall: 77 },
  { playerName: "Jevon Carter", position: "PG", overall: 76 },
  { playerName: "Delon Wright", position: "PG", overall: 75 },
  { playerName: "Donovan Wolf", position: "C", overall: 72 }
],

'Denver Nuggets': [
  { playerName: "Amen Thompson", position: "PF", overall: 92 },
  { playerName: "Desmond Bane", position: "SG", overall: 87 },
  { playerName: "Tari Eason", position: "PF", overall: 86 },
  { playerName: "Jalen Wells", position: "SF", overall: 82 },
  { playerName: "Ziaire Williams", position: "SF", overall: 81 },
  { playerName: "Scotty Pippen Jr.", position: "PG", overall: 81 },
  { playerName: "James Wiseman", position: "C", overall: 80 },
  { playerName: "Kevon Looney", position: "C", overall: 80 },
  { playerName: "Aaron Holiday", position: "PG", overall: 78 },
  { playerName: "Marvin Bagley III", position: "C", overall: 77 },
  { playerName: "Torrey Craig", position: "PF", overall: 74 },
  { playerName: "JT Thor", position: "PF", overall: 72 },
  { playerName: "RJ Hampton", position: "PG", overall: 72 },
  { playerName: "Dwight Powell", position: "C", overall: 72 },
  { playerName: "Ryan Kalkbrenner", position: "C", overall: 71 }
],

'Indiana Pacers': [
  { playerName: "Stephen Curry", position: "PG", overall: 99 },
  { playerName: "Quentin Grimes", position: "SG", overall: 87 },
  { playerName: "Brook Lopez", position: "C", overall: 87 },
  { playerName: "Klay Thompson", position: "SG", overall: 86 },
  { playerName: "Javonte Walter", position: "SG", overall: 80 },
  { playerName: "Kelly Oubre Jr.", position: "SF", overall: 80 },
  { playerName: "Charles Bassey", position: "C", overall: 80 },
  { playerName: "Moussa Diabate", position: "PF", overall: 80 },
  { playerName: "Trendon Watford", position: "PF", overall: 77 },
  { playerName: "Caleb Cowen", position: "SF", overall: 76 },
  { playerName: "Alec Burks", position: "SG", overall: 76 },
  { playerName: "Cameron Payne", position: "PG", overall: 76 },
  { playerName: "Bronny James Jr.", position: "SG", overall: 75 },
  { playerName: "Liam McNealy", position: "SF", overall: 73 },
  { playerName: "K. Breaux", position: "SF", overall: 70 }
],

'New Orleans Pelicans': [
  { playerName: "Jayson Tatum", position: "PF", overall: 95 },
  { playerName: "Kyrie Irving", position: "PG", overall: 92 },
  { playerName: "Jalen Duren", position: "C", overall: 86 },
  { playerName: "Herbert Jones", position: "SF", overall: 83 },
  { playerName: "Obi Toppin", position: "PF", overall: 82 },
  { playerName: "Ajay Mitchell", position: "PG", overall: 79 },
  { playerName: "Jordan Clarkson", position: "SG", overall: 78 },
  { playerName: "Dennis Schroder", position: "PG", overall: 78 },
  { playerName: "Andre Drummond", position: "C", overall: 78 },
  { playerName: "Kelly Olynyk", position: "PF", overall: 77 },
  { playerName: "Eli Demin", position: "PG", overall: 76 },
  { playerName: "Vince Williams Jr.", position: "SF", overall: 76 },
  { playerName: "Jaden Springer", position: "SG", overall: 76 },
  { playerName: "Seth Curry", position: "SG", overall: 75 },
  { playerName: "Juan Toscano", position: "PF", overall: 71 }
],

'Detroit Pistons': [
  { playerName: "Paolo Banchero", position: "PF", overall: 94 },
  { playerName: "Jalen Johnson", position: "PF", overall: 88 },
  { playerName: "Austin Reaves", position: "SG", overall: 87 },
  { playerName: "Deandre Ayton", position: "C", overall: 84 },
  { playerName: "Davion Mitchell", position: "PG", overall: 82 },
  { playerName: "Derrick Jones Jr.", position: "PF", overall: 80 },
  { playerName: "Kevin Porter Jr.", position: "PG", overall: 80 },
  { playerName: "Keon Johnson", position: "SG", overall: 78 },
  { playerName: "Trevion Vukcevic", position: "C", overall: 77 },
  { playerName: "Julian Tyson", position: "SF", overall: 77 },
  { playerName: "Ochai Agbaji", position: "SG", overall: 77 },
  { playerName: "Caleb Houstan", position: "SF", overall: 77 },
  { playerName: "Khaman Maluach", position: "C", overall: 77 },
  { playerName: "Haywood Highsmith", position: "SF", overall: 76 }
],
'Toronto Raptors': [
  { playerName: 'Joel Embiid', position: 'C', overall: 94 },
  { playerName: 'Pascal Siakam', position: 'PF', overall: 88 },
  { playerName: 'DeMar DeRozan', position: 'SG', overall: 87 },
  { playerName: 'OG Anunoby', position: 'SF', overall: 86 },
  { playerName: 'Norman Powell', position: 'SG', overall: 83 },
  { playerName: 'Fred VanVleet', position: 'PG', overall: 83 },
  { playerName: 'Jonas Valančiūnas', position: 'C', overall: 79 },
  { playerName: 'Jamall Shead', position: 'PG', overall: 78 },
  { playerName: 'Bruce Brown', position: 'SG', overall: 76 },
  { playerName: 'Kyle Lowry', position: 'PG', overall: 76 },
  { playerName: 'T.J. Warren', position: 'PF', overall: 74 },
  { playerName: 'Nicolas Batum', position: 'PF', overall: 73 },
  { playerName: 'P.J. Tucker', position: 'PF', overall: 70 },
  { playerName: 'Boban Marjanović', position: 'C', overall: 69 }
],
'Houston Rockets': [
    { playerName: 'Kawhi Leonard', position: 'SF', overall: 97 },
    { playerName: 'Evan Mobley', position: 'PF', overall: 95 },
    { playerName: 'Tyrese Haliburton', position: 'PG', overall: 93 },
    { playerName: 'Jaylen Brown', position: 'SF', overall: 92 },
    { playerName: 'Andrew Nembhard', position: 'SG', overall: 85 },
    { playerName: 'Draymond Green', position: 'SF', overall: 84 },
    { playerName: 'Isaiah Collier', position: 'PG', overall: 83 },
    { playerName: 'Reed Sheppard', position: 'PG', overall: 80 },
    { playerName: 'A.J. Johnson', position: 'SG', overall: 78 },
    { playerName: 'Josh Okogie', position: 'SF', overall: 78 },
    { playerName: 'Brandon Williams', position: 'PG', overall: 77 },
    { playerName: 'Jay Huff', position: 'C', overall: 77 },
    { playerName: 'Ike Badji', position: 'C', overall: 72 },
    { playerName: 'Rotimi Zikarsky', position: 'C', overall: 71 },
    { playerName: 'Malachi Kaba', position: 'PG', overall: 61 }
],
'San Antonio Spurs': [
    { playerName: 'Jalen Green', position: 'SG', overall: 90 },
    { playerName: 'Dyson Daniels', position: 'SG', overall: 88 },
    { playerName: 'Scoot Henderson', position: 'PG', overall: 85 },
    { playerName: 'Devin Vassell', position: 'SF', overall: 85 },
    { playerName: 'Aaron Gordon', position: 'PF', overall: 85 },
    { playerName: 'Jrue Holiday', position: 'PG', overall: 81 },
    { playerName: 'Goga Bitadze', position: 'C', overall: 80 },
    { playerName: 'Nikola Jovic', position: 'PF', overall: 79 },
    { playerName: 'Alex Caruso', position: 'SF', overall: 79 },
    { playerName: 'Ace Bailey', position: 'SG', overall: 79 },
    { playerName: 'Jonathan Isaac', position: 'PF', overall: 78 },
    { playerName: 'Vit Krejci', position: 'SF', overall: 76 },
    { playerName: 'Yves Hansen', position: 'C', overall: 75 },
    { playerName: 'Kris Jakucionis', position: 'PG', overall: 75 }
],
'Golden State Warriors': [
    { playerName: 'Zion Williamson', position: 'PF', overall: 91 },
    { playerName: 'LaMelo Ball', position: 'PG', overall: 91 },
    { playerName: 'Andrew Wiggins', position: 'SF', overall: 82 },
    { playerName: 'Brandin Podziemski', position: 'SG', overall: 82 },
    { playerName: 'Paul George', position: 'SF', overall: 80 },
    { playerName: 'Moses Moody', position: 'SF', overall: 80 },
    { playerName: 'Nick Richards', position: 'C', overall: 79 },
    { playerName: 'Onyeka Okongwu', position: 'C', overall: 77 },
    { playerName: 'Jeremiah Fears', position: 'PG', overall: 77 },
    { playerName: 'Pelle Larsson', position: 'SG', overall: 76 },
    { playerName: 'Jared Butler', position: 'PG', overall: 76 },
    { playerName: 'Amir Coffey', position: 'SF', overall: 76 },
    { playerName: 'Larry Nance Jr.', position: 'C', overall: 75 },
    { playerName: 'Terry Rozier III', position: 'PG', overall: 75 },
    { playerName: 'Steven Adams', position: 'C', overall: 75 }
],


};


async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ force: true }); 
    console.log('Database synced.');

    for (const [teamName, players] of Object.entries(teamData)) {
      const team = await NBATeams.create({ teamName });

      for (const player of players) {
        await Player.create({
          playerName: player.playerName,
          position: player.position,
          overall: player.overall,
          teamId: team.id,
        });
      }
    }

    console.log('Seeded NBA teams and players.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();