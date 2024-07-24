// src/classes.js
class Team {
    constructor(abbreviation, name, image, wins, losses, W_L_percent) {
      this.abbreviation = abbreviation;
      this.name = name;
      this.image = image;
      this.wins = wins;
      this.losses = losses;
      this.W_L_percent = W_L_percent;
    }
  }
  
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
  
  module.exports = { Team, Hitter, Starter, Reliever, Closer };
  