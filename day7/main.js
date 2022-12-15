//day 7

const fs = require('fs');
const fileName ='test.txt'

let data = fs.readFileSync(fileName, {encoding:'utf8'})

/*
let data = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`
*/

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
    array.forEach(element => {
        if (!(isNaN(element))){sum = sum + element}
    });
    array = array.filter(x => typeof x != "number");
    array.push(sum)
    return array 
}

// function to determinate if an array has only numbers or not

function onlyNumbers(array) {
    return array.every(elements => {
    return !isNaN(elements);
});
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
                    (objDir[(data[i-1]).match(/\S+$/g)]) =  resultArray(objDir[(data[i-1]).match(/\S+$/g)])
            }else{
                while( (data[i + files] != '$ ls') && ((i + files) != dataLength)) { 
                   
                    if (/[$]+/g.test(data[i + files]) === false){
                        objDir[(data[i-1]).match(/\S+$/g)].push(convertString((data[i + files])))   
                    }
                    files = files + 1
                    }   
                    (objDir[(data[i-1]).match(/\S+$/g)]) =  resultArray(objDir[(data[i-1]).match(/\S+$/g)])
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
        if((array.length != 1) || (!isNaN(sum))){
            objDir[Object.keys(objDir)[i]].push(sum)     
        }

    }
    */
    return objDir
}



// function to create an obj of dir with only total sizes of calculate each folder size
const calculateSize = objDir => {

    const keyLength = Object.keys(objDir).length
    let solutionSize = 0
    let array = []
    let tester = false

      while (tester === false) {

        tester = true
        //cicle in the values array of the obj
        for (i=0;i<keyLength;i++){

            array = objDir[Object.keys(objDir)[i]]
        
            if (onlyNumbers(array)===false) {
    
            tester = false
                
                for (a=0;a<array.length;a++){
                    if(isNaN(array[a])){
                        if(onlyNumbers(objDir[array[a]])){
                            array = array.concat(objDir[array[a]])
                            removed = array.splice(a,1)
                            
                            array = resultArray(array)
                            objDir[Object.keys(objDir)[i]] = array
                        }
                    }
                }             
            } 
            
            /*  
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
            */
        }  
    }  
      /*
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
    */
    
    return  objDir//, console.log(solutionSize)
} 

//function to calculate the total size deired

const sizeDesired = objDir => {

    const array = Object.values(objDir)
    let sum = 0

    array.forEach(element => {
        if(element <= 100000){
            sum = sum + element[0]
        }
    })
    console.log(sum)
}

console.log(objCreation(data))
//console.log(calculateSize(objCreation(data)))
//sizeDesired(calculateSize(objCreation(data)))