const fs = require('fs/promises');
const fileName = 'input.txt'

async function displayMaxValue() {

    try {
        const data = await fs.readFile(fileName, { encoding: 'utf8' });
        const line = data.split('\n');
        const linesNumber = line.length;
        let value = 0;
        const backpackArray = []
        const max3Backpack = []

        if (linesNumber < 1) throw `Error!`;

        console.log('reading in progress...');
        for(let i = 0; i < linesNumber; i++){
            line[i] =  parseInt(line[i]);           
        }
        line.forEach((element) => {
                
            if (!(isNaN(element))) {
            value = value + element 
            } else {
                backpackArray.push(value)
                value = 0
            }
        })

        for(i = 0;i<3;i++) {
        const max = Math.max(...backpackArray)
        max3Backpack.push(max)
        const index = backpackArray.indexOf(max);
        backpackArray.splice(index, 1)
        }

        const sumMax3 = max3Backpack.reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
       
        console.log(max3Backpack)
        console.log(sumMax3)
        console.log('reading finished.\n');

    } catch (err) {
        console.log(`An error has occurred. The desired file does not exist or check the description error. ${err}`);
    }
}
displayMaxValue();