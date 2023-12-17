// smells like recursion
const fs = require('fs');

const data = fs.readFileSync('4.txt', { encoding: 'utf8', flag: 'r' });

const winningObj = {};
const countObj = {};
const cards = data.split('\n');
const recursive = (index, isRecursive = true) => {
    let card = cards[index];
    let count = 0;
    // console.log('card', index+1);
    // console.log("winning numbers: ", winningNumbers)
    // console.log("my numbers: ", myNumbers)
    const winningNumbersObj = {}
    if (!countObj[index+1]) {
        let numbers = card.split(':')[1].trim()
        let winningNumbers = numbers.split('|')[0].trim().split(' ');
        let myNumbers = numbers.split('|')[1].trim().split(' ');

        winningNumbers.forEach(winningNumber => {
            winningNumbersObj[winningNumber] ? winningNumbersObj[winningNumber]++ : winningNumbersObj[winningNumber] = 1;
        })
        // console.log("winning numbers obj: ", winningNumbersObj)
        myNumbers.forEach(number => {
            // console.log("number: ", number)
            if (number !== '' && winningNumbersObj[number]) {
                // console.log("number exists in obj", number)
                count++;
            }
        })
    } else {
        // console.log("already counted", countObj)
        count = countObj[index+1]
    }
    // console.log("count ", index+1 + ': ' + count )
    countObj[index+1] = count;
    if (!isRecursive) {

        if (winningObj[index+1]) {
            winningObj[index+1]++;
        } else {
            winningObj[index+1] = 1;
        }
    }
    if (count > 0) {
        for (let i = 2; i <count+2; i++) {
            if (winningObj[index+i]) {
                winningObj[index+i]++;
            } else {
                winningObj[index+i] = 1;
            }
            // console.log("call recursive", index+i-1)
            recursive(index+i-1)
        }
    } else {
        // console.log("final result", winningObj)
        return;
    }
    
}

cards.forEach((card, index) => recursive(index, false));
// recursive(0);
console.log("final result", winningObj)
function sumValues(obj) {
    return Object.values(obj).reduce((sum, value) => sum + value, 0);
}

const sum = sumValues(winningObj);
console.log("sum", sum); // Output will be the sum of the values
