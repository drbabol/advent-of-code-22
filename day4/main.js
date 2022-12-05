// day4

const fs = require('fs');
const fileName = 'input.txt'

const data = fs.readFileSync(fileName, {encoding:'utf8'}).split('\n')

const countInternalSet = data => {

    let internalSet = 0;
    let overlapSet = 0;

    data.forEach(element => {
        element = element.replace(/[\r\n]/g, '')
        
        const firstN = +(/^\d+/g).exec(element)[0]
        const secondN = +(/-(\d+),/g).exec(element)[1]
        const thirdN = +(/,(\d+)-/g).exec(element)[1]
        const forthN = +(/\d+$/g).exec(element)[0]
       
        //part1
        if ((firstN <= thirdN) && (secondN >= forthN) || ((thirdN <= firstN) && (forthN >= secondN))){
            internalSet ++
        } 
        //part2
        if ((secondN >= thirdN)&&(firstN <= thirdN) || (secondN <= forthN)&&(secondN >= thirdN) || (firstN >= thirdN)&&(firstN <= forthN)){
       
            overlapSet++
            //overlapSet += internalSet
        } 


    });
    return overlapSet
}

console.log(`solutions: ${countInternalSet(data)} `)