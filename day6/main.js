//day6

const fs = require('fs');
const fileName = 'input.txt'

const data = fs.readFileSync(fileName, {encoding:'utf8'}).split('')

count4Element = []
let solution1 = 0;

for(i=0;i<data.length;i++){

    for(j=0;j<14;j++){ //part1 = 4 part2 = 14
        count4Element.push(data[i+j])
    }

    const checkDuplicate = count4Element.some((e, i, arr) => arr.indexOf(e) !== i)
    
    if (checkDuplicate) {
        count4Element = []
    } else {

        solution1 = data.indexOf(data[i+13],i)+1 //part1 = 3 part2 = 13
        console.log(solution1)   
        break 
    }    
}
