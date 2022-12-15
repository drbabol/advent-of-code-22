

input = [10,[5,5,5],10,10,[2,2,2],10]

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





console.log(resultArray(input))

console.log(onlyNumbers(input))