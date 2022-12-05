// day5

const fs = require('fs');
const fileName = 'test.txt'

const data = fs.readFileSync(fileName, {encoding:'utf8'}).split('\n')

const dictionaryOfStack = {
    1: ['F','L','M','W'],
    2: ['F','M','V','Z','B'],
    3: ['Q','L','S','R','V','H'],
    4: ['J','T','M','P','Q','V','S','F'],
    5: ['W','S','L'],
    6: ['W','J','R','M','P','V','F'],
    7: ['F','R','N','P','C','Q','J'],
    8: ['B','R','W','Z','S','P','H','V'],
    9: ['W','Z','H','G','C','J','M','B']
}

const dictionaryTest = {
    1: ['N','Z'],
    2: ['D','C','M'],
    3: ['P']
}

//test move 1 from 2 to 1
const procedure = data => {

    data.forEach(element => {
        element = element.replace(/[\r\n]/g, '')

        const movedNumber = +(/move (\d+)/g).exec(element)[1]
        const fromStack = +(/from (\d+)/g).exec(element)[1]
        const toStack = +(/to (\d+)/g).exec(element)[1]

        for (i=0;i<movedNumber;i++){
                
            const arrayfrom = Object.values(dictionaryTest[fromStack])
            const arrayto = Object.values(dictionaryTest[toStack])

            arrayto.push(arrayfrom[arrayfrom.length-1])
            arrayfrom.pop()

            dictionaryTest[fromStack] = arrayfrom;
            dictionaryTest[toStack] = arrayto                    

        }

    })
    console.log(dictionaryTest)
}

procedure(data)