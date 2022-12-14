//day 7

const fs = require('fs');
const fileName = 'input.txt'

const data = fs.readFileSync(fileName, {encoding:'utf8'})
//.split(/\$ .+(\r\n)/g)
// /\$ cd \S\n\$ ls/g (considera anche il primo ls), /\$ cd \w\r\n\$ ls/ (senza il primo ls)
// or /\$ .+/g (all the command)

//function to convert strings as desired result
const convertString = element => {
    //find all files
    if(/[0-9]+/g.test(element)){

        //const fileName = (/\S*$/g).exec(element)
        const fileSize = (/^\S*/g).exec(element)
        //const solutionFile = `- ${fileName} (file, size=${fileSize})`
        return fileSize[0]
    }
    //find dir command
    if(/^dir/g.test(element)){
        const dirName = (/\w+$/g).exec(element)
        //const solutionDir = `- ${dirName} (dir)`
        return dirName[0]
    }
 }

// function to create an array of array with folders and files without command
const dirAndFile = data => {

    const dataStep1 = data.split(/\$ .+(\r\n)/g)
    const dataStep2 = dataStep1.filter( n => (n != '' )&&( n!='\r\n'))

    dataStep2.forEach(element => {
        
        element = element.replace(/[\r]/g, '')
        const dataStep3 = element.split('\n')
        const dataStep4 = dataStep3.filter(x=> x != '')
        dataStep2.push(dataStep4)  
    })
    dataStep2.splice(0,dataStep2.length/2)   

    return dataStep2
}

 // function to get an array of all the dir
 const dirArray = (data) => {

    const dataElaborated = data.replaceAll(/[\r]/g, '')
    const dirListStep0 = dataElaborated.match(/(?:\$\scd\s)(.+)(?:\n\$\sls)/g)
    const dirList = []

    //array of dir
    dirListStep0.forEach(d => {
        dirList.push((d.match(/(\S+)/g)[2])) 
    })

    return dirList
 }

 //assign function result to variable
 const dirAndFiles = dirAndFile(data)
 console.log(dirAndFiles)
 const dirs = dirArray(data)
 console.log(dirs)

//function tu create an Object of dir and their files
const objectTree = (dir,content) =>{

    const objTree = {};
   
    content.forEach(array => {
        array.forEach(element => {
            array[array.indexOf(element)] = convertString(element)
        })        
    })
    
    for (i=0;i<dir.length;i++){
        objTree[dir[i]]=content[i]
    }
    return objTree
}

// assign function of object to a variable
const objTree = objectTree(dirs, dirAndFiles)

// function to calculate the size of each folder
const sizeOfFolder = tree => {

    let testNum = false
    let solutionSize = 0

    Object.values(tree).forEach(array => {

        //function to get the key of a value object
        function getObjKey(obj, value) {
            return Object.keys(obj).find(key => obj[key] === value);
          }
        
        let key = getObjKey(tree,array) 
        
        //function to have a boolean result of the elements of an array (all numbers = true)
        function onlyNumbers(array) {
            return array.every(elements => {
            return !isNaN(elements);
        });
        }

        testNum = onlyNumbers(array)
       
        while(testNum===false){

            array.forEach(element => {
                
                if((isNaN(element))){     
                    array[array.indexOf(element)] = Object.values(tree)[Object.keys(tree).indexOf(element)]
                    array = array.flat(Infinity) 
                }
            })          
            testNum = onlyNumbers(array)
        }
        
        //trasnform all the string number in real number
        array  = array.map((x) => + x);

        //sum of element of an array
        let totalDirSize = array.reduce((previous, next) => {
            return previous + next;
        });

        tree[key] = totalDirSize 

        if (totalDirSize <= 100000){
            solutionSize = solutionSize + totalDirSize
        }
    })
    console.log(solutionSize)
    //console.log(tree)  
}

console.log(objTree)
sizeOfFolder(objTree)
