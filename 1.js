const fs = require('fs');

// Read the file synchronously
const data = fs.readFileSync('1.txt', { encoding: 'utf8', flag: 'r' });

// Use the data from the file
// console.log(data);
// let str = 'h1llo'
// str.split("").forEach(val => {
//     console.log("val", val)
//     let number = Number(val)
//     console.log(!isNaN(number))
// })
let lines = data.split('\n')
console.log("lines", lines.length)
let total = 0; 
lines.forEach(line => {
    let first;
    let second;
    line.split("").forEach(val => {
        let num = Number(val)
        if (!isNaN(num)) {
            if (!first) {
                first = val;
                second = val;
                return; 
            } else second = val
        }
    })
    let result = Number(first + second)
    total += result;
})

console.log("total", total)
