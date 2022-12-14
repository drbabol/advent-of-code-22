//day 7

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

 // function to create an object with folder and their content
const objCreation = data => {

    const dataLength = data.length
    const objDir = {}
    let files = 1

    for (let i=0; i<dataLength; i++){
        if (data[i] === '$ ls'){

            if (((data[i-1]).match(/\S+$/g) in objDir) === false) {
                objDir[(data[i-1]).match(/\S+$/g)] = []
                while( (data[i + files] != '$ ls') && ((i + files) != dataLength)) { 
                    if (/[$]+/g.test(data[i + files]) === false){
                        objDir[(data[i-1]).match(/\S+$/g)].push(convertString((data[i + files])))                
                    }
                    files = files + 1
                    }
                   
            }else{
                while( (data[i + files] != '$ ls') && ((i + files) != dataLength)) { 
                   
                    if (/[$]+/g.test(data[i + files]) === false){
                        objDir[(data[i-1]).match(/\S+$/g)].push(convertString((data[i + files])))   
                    }
                    files = files + 1
                    }   
            }
           
        }
        files = 1
    }
 
    /*
    for(i=0;i<Object.keys(objDir).length;i++){

        let array = objDir[Object.keys(objDir)[i]]
        const sum = array.reduce(function(prev, curr){return (Number(prev) || 0) + (Number(curr) || 0)})
        array = array.filter(x => isNaN(x));    
        objDir[Object.keys(objDir)[i]] = array
        //if(array.length != 1){
            objDir[Object.keys(objDir)[i]].push(sum)     
       // }
    }
    */
    return objDir
}

// function to create an obj of dir with only sizes and calculate each folder size
const calculateSize = objDir => {

    const keyLength = Object.keys(objDir).length
    let solutionSize = 0

    for (i=0;i<keyLength;i++){

        array = objDir[Object.keys(objDir)[i]]

        const onlyNumbers = array => {
            return array.every(element => {
              return typeof element === 'number';
            });
          }

        while (onlyNumbers(array) === false)  {
            array.forEach(element => {
                if (isNaN(element)){
                    array = array.concat(objDir[element])
                    removed = array.splice(array.indexOf(element),1)
                }  
            })
            onlyNumbers(array)
            objDir[Object.keys(objDir)[i]] = array
        }
    }    
  
    
    for (let i=0; i< keyLength;i++){

        //objDir[Object.keys(objDir)[i]] = objDir[Object.keys(objDir)[i]].flat(Infinity)
      
        const sum = objDir[Object.keys(objDir)[i]].reduce((accumulator, value) => {
             return accumulator + value;
          }, 0);
       
        objDir[Object.keys(objDir)[i]] = sum // I have an obj with all the folder and their size

        if (sum <= 100000){
            solutionSize = solutionSize + sum
        }
    }      
    
    return  console.log(objDir), console.log(solutionSize)
} 

console.log(objCreation(data))
calculateSize(objCreation(data))