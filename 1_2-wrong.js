const fs = require('fs');

// Read the file synchronously
const data = fs.readFileSync('test.txt', { encoding: 'utf8', flag: 'r' });
let lines = data.split('\n');
console.log('Read lines:', lines);
let result = 0;


const getFirstNumber = (line) => {
    console.log("getFirstNumber", line)
    return 0
}

const getLastNumber = (line) => {
    console.log("getLastNumber", line)
    return 0;
}

lines.forEach((line) => {

    let first = getFirstNumber(line)
    let last = getLastNumber(line)
    result += Number(String(first) + String(last))
})

console.log('Read result:', result)



