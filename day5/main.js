// day5

const fs = require('fs');
const fileName = 'input.txt'

const data = fs.readFileSync(fileName, {encoding:'utf8'}).split('\n')

const dictionaryOfStack = {
    1: ['W','M','L','F'],                 
    2: ['B','Z','V','M','F'],               
    3: ['H','V','R','S','L','Q'],           
    4: ['F','S','V','Q','P','M','T','J'],  
    5: ['L','S','W'],                       
    6: ['F','V','P','M','R','J','W'],      
    7: ['J','Q','C','P','N','R','F'],      
    8: ['V','H','P','S','Z','W','R','B'],  
    9: ['B','M','J','C','G','H','Z','W']    
}
/* //test:
const data = ['move 1 from 2 to 1',
                'move 3 from 1 to 3',
                'move 2 from 2 to 1',
                'move 1 from 1 to 2']


const dictionaryOfStack = {
    1: ['Z','N'],
    2: ['M','C','D'],
    3: ['P']
}
*/

const procedure = data => {

    let finalString = '' 
    const dictionaryLength = Object.keys(dictionaryOfStack).length

    data.forEach(element => {
        element = element.replace(/[\r\n]/g, '')

        const movedNumber = +(/move (\d+)/g).exec(element)[1]
        const fromStack = +(/from (\d+)/g).exec(element)[1]
        const toStack = +(/to (\d+)/g).exec(element)[1]

        const arrayFrom = Object.values(dictionaryOfStack[fromStack])
        const arrayTo = Object.values(dictionaryOfStack[toStack])

        for (i=0;i<movedNumber;i++){
            //part 1
            //arrayto.push(arrayfrom[arrayfrom.length-1])
            //arrayfrom.pop()

            //dictionaryOfStack[fromStack] = arrayfrom;
            //dictionaryOfStack[toStack] = arrayto                    
        }

        // part 2
        const sliceArray = (arrayFrom.slice(-movedNumber))
        arrayFrom.splice(arrayFrom.length - movedNumber, movedNumber)
            
        sliceArray.forEach(element => {
            arrayTo.push(element)
        })
            
        dictionaryOfStack[fromStack] = arrayFrom;
        dictionaryOfStack[toStack] = arrayTo        

    })

    //read last element of values array in the object
    for(j=1;j<=dictionaryLength;j++) {
        arrayDictionary = Object.values(dictionaryOfStack[j])
        finalString += arrayDictionary[arrayDictionary.length-1] 
    }
    return finalString
}

console.log(procedure(data))