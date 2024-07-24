// src/classes.js
(function(global) {
  class Team {
      constructor(abbreviation, name, wins, losses, W_L_percent, image) {
          this.abbreviation = abbreviation;
          this.name = name;
          this.wins = wins;
          this.losses = losses;
          this.W_L_percent = W_L_percent;
          this.image = image;
      }
  }
  global.Team = Team;
})(window);

(function(global) {
  class Hitter {
    constructor(name, image, age, teamAbbreviation, BA, OBP, SLG, OPS, ISO, rOBA, SB, CS, RS_percent, SB_percent) {
      this.name = name;
      this.image = image;
      this.age = age;
      this.teamAbbreviation = teamAbbreviation;
      this.BA = BA;
      this.OBP = OBP;
      this.SLG = SLG;
      this.OPS = OPS;
      this.ISO = ISO;
      this.rOBA = rOBA;
      this.SB = SB;
      this.CS = CS;
      this.RS = RS_percent;
      this.SBPercentage = SB_percent;
    }
  }
  global.Hitter = Hitter;
})(window);

(function(global) {
  class Starter {
    constructor(name, image, age, teamAbbreviation, FIP, HR9, BB9, SO9, QS_percent) {
      this.name = name;
      this.image = image;
      this.age = age;
      this.teamAbbreviation = teamAbbreviation;
      this.FIP = FIP;
      this.HR9 = HR9;
      this.BB9 = BB9;
      this.SO9 = SO9;
      this.QS = QS_percent;
    }
  }
  global.Starter = Starter;
})(window);

(function(global) {
  class Reliever {
    constructor(name, image, age, teamAbbreviation, FIP, IS_percent, SO9, SV) {
      this.name = name;
      this.image = image;
      this.age = age;
      this.teamAbbreviation = teamAbbreviation;
      this.FIP = FIP;
      this.IS = IS_percent;
      this.SO9 = SO9;
      this.SV = SV;
    }
  }
  global.Reliever = Reliever;
})(window);

(function(global) {
  class Closer {
    constructor(name, image, age, teamAbbreviation, SV, HR9, BSV, SV_percent) {
      this.name = name;
      this.image = image;
      this.age = age;
      this.teamAbbreviation = teamAbbreviation;
      this.SV = SV;
      this.HR9 = HR9;
      this.BSV = BSV;
      this.SVPercentage = SV_percent;
    }
  }
  global.Closer = Closer;
})(window);

  