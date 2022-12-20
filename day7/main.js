//day7
const fs = require('fs');
const fileName ='input.txt'

let data = fs.readFileSync(fileName, {encoding:'utf8'})

data = data.replaceAll(/[\r]/g, '').split('\n')

//function to convert strings as desired result
const convertString = element => {
    //find all files
    if(/[0-9]+/g.test(element)){
        const fileSize = (/^\S*/g).exec(element)
        return parseInt(fileSize[0])
    }
    //find dir command
    if(/^dir/g.test(element)){
        const dirName = (/\w+$/g).exec(element)
        return dirName[0]
    }
 }
 
 //function to sum all number of an array and return strings element and sum
 function resultArray(array){
    let sum = 0;
    //array = array.sort().reverse()
    array.forEach(element => {
        if (!(isNaN(element))){sum = sum + element}
    });
    array = array.filter(x => typeof x != "number");
    array.push(sum)
    return array 
}

const createNestedObject = data => {

    const dataLength = data.length
    const objDir = {}
    let dir = []
    let path = ''
    let dirName = ''
    let fileSize = 0
    let totalfileSize = []

    for (let index = 0; index <= dataLength; index++){

        if (data[index] === '$ ls') {
            dir.push(data[index-1].match(/\S+$/g)[0])
            path =  dir.join('-')
            objDir[path] = []
            totalfileSize = []
            
        }  
        if (data[index] === '$ cd ..'){
            dir.pop()
            path =  dir.join('-')
        }
        if (/dir/g.test(data[index])){
            dirName = convertString(data[index])
            dirName = path + '-' + dirName
            totalfileSize.push(dirName)
            totalfileSize = totalfileSize.sort().reverse()
            objDir[path] = totalfileSize
        }
        if (/\d+/g.test(data[index])){
            fileSize = convertString(data[index])
            totalfileSize.push(fileSize)
            totalfileSize = resultArray(totalfileSize.sort().reverse())
            objDir[path] = totalfileSize
        }
    }
    return objDir    
}

const substitutionDirWithFiles = objDir => {
    let keys = Object.keys(objDir).sort((x,y) => [x].length > [x].length ? 1 : -1)

    keys.forEach((subArray)=>{
        objDir[subArray] = objDir[subArray].map((item)=>{
           
            if(objDir[item]){
                item = objDir[item]
            }
            return item
        })
        objDir[subArray] = (objDir[subArray].flatMap(x=>x)).reduce((a,b) => a+b)
    })
    return objDir
}

//function to calculate the total size deired
const sizeDesired = objDir => {
    const array = Object.values(objDir)
    let sum = 0
    array.forEach(element => {
        
        if((element <= 100000)){
            sum = sum + element
        }
    })
    return `part one: ${sum}`
}

//function to find the smallest directory to free up space
const findSmallestDir = objDir => {
    const array = Object.values(objDir)
    let arrayOfDir = []
    let minDir = 0
    const diskSize = 70000000
    const updatesize = 30000000

    totalSize = array[0]

    array.forEach(element => {
        	if((element) >= ((updatesize-(diskSize-totalSize)))){
                arrayOfDir.push(element)
            }
    })
    
    minDir = Math.min(...arrayOfDir)
    return `part two: ${minDir}`
}

//console.log(substitutionDirWithFiles(createNestedObject(data)))
console.log(sizeDesired(substitutionDirWithFiles(createNestedObject(data))))
console.log(findSmallestDir(substitutionDirWithFiles(createNestedObject(data))))


