// day3: Rucksack Reorganization

const { count } = require("console");


// 97 is the ASCII code for lower case 'a
// 65 uppercase 'A'


const fs = require('fs');
const fileName = 'input.txt'

const data = fs.readFileSync(fileName, {encoding:'utf8'}).split('\n')

const numberValue = []; //not necessary  
const letters = []


//populate array of numbersValue e letters
for (i=1;i<=52;i++){
    if (i<= 26) {
        numberValue.push(i)
        letters.push(String.fromCharCode(96 + i))
    } else {
        numberValue.push(i)
        letters.push(String.fromCharCode(65 + (i-27)))
    }
}

console.log(letters)
console.log(numberValue)

//function to assing value to common characters part 1
const count2Letters = input => {

    let sumValues = 0

input.forEach(element => {

    const elementLength = element.length
    let leftString = element.slice(0,elementLength/2)
    let rightString = element.slice(elementLength/2)
    
    const commonCharacter = commonCharacters(leftString,rightString)
    const valueCharacter = letters.indexOf(commonCharacter[0]) +1

    sumValues += valueCharacter
   
});
return sumValues
};

//function to assing value to common characters on 3 strings part 2
const countLetters3Strings = input => {

    let sumValues = 0

    for (i=0; i<input.length; i += 3){

        let firstString = input[i].replace(/[\r\n]/g, '')
        let secondString = input[i+1].replace(/[\r\n]/g, '')
        let thirdString = input[i+2].replace(/[\r\n]/g, '')
       
        const commonCharacter = commonCharacters3String(firstString,secondString,thirdString)
        const valueCharacter = letters.indexOf(commonCharacter[0]) + 1 
        sumValues += valueCharacter
    }
 
    return (sumValues)
};

//function to find common letters of two string (! this solution doesn not consider double letters)
const commonCharacters = (string1, string2) => {

    let duplicateCharacter = "";
    for (let i = 0; i < string1.length; i += 1) {
      if (duplicateCharacter.indexOf(string1[i]) === -1) {
        if (string2.indexOf(string1[i]) !== -1) {
          duplicateCharacter += string1[i];
        }
      }
    }
    return [...duplicateCharacter];
  };

//function to find common letters of three string (considering doubles)
const commonCharacters3String = (str1, str2, str3) => {

    const letters = []

    for (let i in str1) {

        if (str2.includes(str1[i]) & str3.includes(str1[i])) {
            str2 = str2.replace(str1[i],'')
            str3 = str3.replace(str1[i],'')
            letters.push(str1[i])
        }
    }
    return letters
}

console.log('Part1: '+ count2Letters(data))
console.log('Part2: ' + countLetters3Strings(data))

