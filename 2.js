const fs = require('fs');
// 12 red cubes, 13 green cubes, and 14 blue cubes
// red: 12
// green: 13
// blue: 14
let game = {
    red: 12,
    green: 13,
    blue: 14,
    sum: 39
}
// Read the file synchronously
const data = fs.readFileSync('2.txt', { encoding: 'utf8', flag: 'r' });

function checkIfGamePossible1(obj) {
    if (obj.red && obj.red <= game.red ) return true;
    if (obj.green && obj.green <= game.green ) return true;
    if (obj.blue && obj.blue <= game.blue) return true;
    return false;
}

function checkIfGamePossible2(obj) {
    let res = true;
    for (let key in obj) {
        if (obj[key] && obj[key] <= game[key]) {
            continue;
        } else {
            // condition not met, set res to false and break out of the loop
            res = false;
            break;
        }
    }
    return res;
}


function checkIfGamePossible3(obj) {
    if (obj.red <= game.red && obj.green <= game.green && obj.blue <= game.blue) return true;
    return false;
    
} 

const possibleIndexes = [];

const gamesPossible = () => {
    let lines = data.split('\n')

    lines.forEach((line, index) => {
        // console.log(line);
        const cleanedInput = line.split(': ')[1].trim();
        const items = cleanedInput.split('; ');
        // console.log(items);
        let count = 0
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let colors = item.split(',');
            const colorObj = {};
            colors.forEach((take) => {
                // console.log("take", take.trim()[0]);
                let color = take.trim().split(' ')[1];
                // console.log("color", color);
                colorObj[color] = Number(take.trim().split(' ')[0]);
            });
        
            // console.log("colorObj", colorObj);
            let res;
            switch (Object.keys(colorObj).length) {
                case 1:
                    res = checkIfGamePossible1(colorObj);
                    // console.log("res1", res)
                    break;
                case 2:
                    res = checkIfGamePossible2(colorObj);
                    // console.log("res2", res)
                    break;
                case 3:
                    res = checkIfGamePossible3(colorObj);
                    // console.log("res3", res)
                    break;
                default:
                    // console.log("Invalid length of colorObj");
                    res = false;
                    break;
            }
        
            // If res is false, break out of the for loop
            // console.log("item", item)
            // console.log("res", res)
            if (!res) {
                break;
            } else count++;
        }

        // console.log("count", count);
        if (count === items.length) possibleIndexes.push(index + 1)
        
    })
    console.log("possible", possibleIndexes.reduce((a,b) => a + b))
}

gamesPossible();