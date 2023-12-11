const fs = require('fs');

const data = fs.readFileSync('4.txt', { encoding: 'utf8', flag: 'r' })

const getSum = () => {
const cards = data.split('\n');
let total = 0;
cards.forEach((card, index)=> {
    let result = 0.5;
    // console.log("card: ", card)
    let numbers = card.split(':')[1].trim()
    let winningNumbers = numbers.split('|')[0].trim().split(' ');
    let myNumbers = numbers.split('|')[1].trim().split(' ');
    // console.log("winning numbers: ", winningNumbers)
    // console.log("my numbers: ", myNumbers)
    const winningNumbersObj = {}
    winningNumbers.forEach(winningNumber => {
        winningNumbersObj[winningNumber] ? winningNumbersObj[winningNumber]++ : winningNumbersObj[winningNumber] = 1;
    })
    // console.log("winning numbers obj: ", winningNumbersObj)
    myNumbers.forEach(number => {
        // console.log("number: ", number)
        if (number !== '' && winningNumbersObj[number]) {
            // console.log("number exists in obj", number)
            result = result * 2;
        }
    })
    // console.log('game: ', index + ' result ' + result)
    if (result === 0.5) return
    total += result;
})
console.log("total: ", total)
}

getSum();