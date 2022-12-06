const fs = require('fs');
const { default: test } = require('node:test');
const fileName = 'test.txt'

const data = fs.readFileSync(fileName, {encoding:'utf8'}).split('\n')

indexOfEmptyRow = data.indexOf('\r')

const stackData = data.slice(0,indexOfEmptyRow).reverse()
const istructionData = data.slice(indexOfEmptyRow + 1)

//console.log(stackData)
//console.log(istructionData)

const newStackData = []
 
stackData.forEach(element => {
    element = element.replace(/[\r\n]/g, '')
    newStackData.push(element.split(''))
})

arrayOfKeys = newStackData.slice(0,1).flat()
arrayOfValues = newStackData.slice(1)

//console.log(arrayOfKeys)
//console.log(arrayOfValues)


//bild the dictionary
const dictionary = {}

arrayOfKeys.forEach(key => {    
    if ((/\d/g).test(key)){
        indexOfKey = arrayOfKeys.indexOf(key)
        dictionary[key] = []
        for (i=0; i < arrayOfValues.length; i++){      
            dictionary[key].push((arrayOfValues[i][indexOfKey]))
        }
    }
})

//cancel empty element on valuesArray dictionary
for(j=1;j<=Object.keys(dictionary).length;j++){
    dictionary[j]= dictionary[j].filter(elm => (/\w+/g).test(elm))  
}

//console.log(dictionary)
//console.log( Object.keys(dictionary))
//console.log(data)

