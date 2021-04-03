const fs = require("fs");

const rawInput = fs.readFileSync("input.txt", "utf8");

const inputToStrings = (input) => {
  input = input.replace(/\n\n/g, "BREAK");
  input = input.replace(/\n/g, " ");
  input = input.split("BREAK");
  return input;
};

const stringToObject = (inputString) => {
  let retObj = {};
  let propvals = inputString.split(" ");
  let objVals = propvals.map((strings) => strings.split(":"));
  objVals.forEach((pair) => (retObj[pair[0]] = pair[1]));
  return retObj;
};

const inputToObjects = (input) => {
  return inputToStrings(input).map((passString) => stringToObject(passString));
};

let validatePassport = (passport, requirements) => {
  let passKeys = Object.keys(passport);
  let validated = true;
  passKeys.forEach((key) => {
    let keyValidated = passKeys.includes(key);
    value = passport[key];
    if (!keyValidated) {
      validated = false;
    } else {
      switch (key) {
        case "byr":
          validated = checkYear(
            value,
            requirements.byr[0],
            requirements.byr[1]
          );
          break;
        case "iyr":
          validated = checkYear(
            value,
            requirements.iyr[0],
            requirements.iyr[1]
          );
          break;
        case "eyr":
          validated = checkYear(
            value,
            requirements.eyr[0],
            requirements.eyr[1]
          );
          break;
        case "hgt":
          validated = checkHeight(value);
          break;
        case "hcl":
          validated = checkHairColor(value);
          break;
        case "ecl":
          validated = checkEcl(value);
          break;
        case "pid":
          validated = checkPassportID(value);
          break;
        case "cid":
          validated = true;
          break;
        default:
          validated = false;
          console.log("something went wrong");
          break;
      }
    }
  });
  return validated;
};

let checkYear = (input, lowerLimit, upperLimit) => {
  let yearReg = /\d{4}/;
  let year = parseInt(input);
  let numCheck = yearReg.test(year) ? true : false;
  switch (numCheck) {
    case false:
      return false;
    case true:
      return year <= upperLimit && year >= lowerLimit ? true : false;
    default:
      return false;
  }
};

let checkHairColor = (inputStr) => {
  return /^(#)[a-f0-9]{6}$/.test(inputStr);
};

let checkPassportID = (pidString) => {
  return /[0-9]{9}$/.test(pidString);
};

let checkHeight = (hgtStr) => {
  let isValid = /^(\d{2,3})(cm|in)$/.test(hgtStr);
  switch (isValid) {
    case true:
      let units = hgtStr.slice(hgtStr.length - 2);
      let magnitude = hgtStr.slice(0, hgtStr.length - 2);
      switch (units) {
        case "in":
          return 59 < magnitude && magnitude < 76 ? true : false;
        case "cm":
          return 150 < magnitude && magnitude < 193 ? true : false;
        default:
          console.log("this shouldn't happen");
          return false;
      }
      break;
    case false:
      return false;
    default:
      console.log("how did this happen");
      return false;
  }
};

let checkEcl = (eclStr) => {
  return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(eclStr);
};

let theWholeThing = (rawInput) => {
  let inputArr = inputToStrings(rawInput);
  let passportArr = inputArr.map((index) => stringToObject(index));
  let requirements = {
    ecl: [],
    pid: 9,
    eyr: [2020, 2030],
    hcl: null,
    byr: [1920, 2002],
    iyr: [2010, 2020],
    hgt: null,
  };
  let countValidated = 0;

  passportArr.forEach((passport) => {
    if (validatePassport(passport, requiredKeys1)) {
      countValidated++;
    }
  });
  return countValidated;
};

let testTrue = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

let testFalse = ``;

const requirements = {
  ecl: [],
  pid: 9,
  eyr: [2020, 2030],
  hcl: null,
  byr: [1920, 2002],
  iyr: [2010, 2020],
  hgt: null,
};
inputToObjects(testTrue).forEach(passport => console.log(validatePassport(passport, requirements)))

