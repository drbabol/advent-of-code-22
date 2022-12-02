//day2 Rock Paper Scissors

// A X - Rock       - 1
// B Y - Paper      - 2
// C Z - Scissors   - 3

// LOST             - 0
// DRAW             - 3
// WIN              - 6

const fs = require('fs');
const fileName = 'input.txt'

const dictionaryCombination = {
                    'A X': 3, //X>Z
                    'A Y': 6, //Y>X
                    'A Z': 0, //Z>Y
                    'B X': 0, //ok
                    'B Y': 3, //ok
                    'B Z': 6, //ok
                    'C X': 6, //X>Y
                    'C Y': 0, //Y>Z
                    'C Z': 3, //Z>X
} 

const dictionaryNewCombination = {
                    'A X': 'A Z', //X>Z
                    'A Y': 'A X', //Y>X
                    'A Z': 'A Y', //Z>Y
                    'B X': 'B X', //ok
                    'B Y': 'B Y', //ok
                    'B Z': 'B Z', //ok
                    'C X': 'C Y', //X>Y
                    'C Y': 'C Z', //Y>Z
                    'C Z': 'C X', //Z>X
}

const dictionaryRPS = {
                    'X': 1,
                    'Y': 2,
                    'Z': 3,
}

const data = fs.readFileSync(fileName, {encoding:'utf8'}).split('\n')

gamesScore = []

data.forEach((element) => {
    element = element.replace(/[\r\n]/g, '');
    const newElement = (dictionaryNewCombination?.[element])
    const valueCombination = (dictionaryCombination?.[newElement]); //change newElement>element for part 1
    const valueSingle = (dictionaryRPS?.[newElement.substr(2,1)])  //change newElement>element for part 1
    const gameScore = valueCombination + valueSingle
    gamesScore.push(gameScore)
})

const sumGamesScore = gamesScore.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

console.log(sumGamesScore)