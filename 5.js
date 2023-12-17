const fs = require('fs');

const data = fs.readFileSync('5.txt', { encoding: 'utf8', flag: 'r' });

const splitted = data.split(/\n\s*\n/);
const seeds = splitted.shift().split(":")[1].trim().split(" ");
const parts = splitted
// console.log("parts: ", parts)

const getMappedValue = (source, part) => {
    let maps = part.split('\n').slice(1);
    // console.log("map: ", maps);
    let number;
    for (let i = 0; i < maps.length; i++) {
        const mapArr = maps[i].split(" ").map(Number);
        // console.log("mapArr: ", mapArr);
        if (source === mapArr[1]) {
            number = mapArr[0];
            break;
        } else if (source > mapArr[1] && source <= (mapArr[1] + mapArr[2])) {
            let diff = source - mapArr[1];
            number = mapArr[0] + diff;
            break; 
        }
    }
    return number !== undefined ? number : source;
}

// Example usage:
// let result = getMappedValue(sourceValue, partString);


const getLowestLocationNumber = () => {
    // console.log("seeds: ", seeds);
    let numArr = [];

    seeds.forEach(seed => {
        let number = Number(seed);
        for (let i = 0; i < parts.length; i++) {
            number = getMappedValue(number, parts[i])
        }
        numArr.push(number);
    });

    let smallestNumber = Math.min(...numArr);

    console.log("smallestNumber", smallestNumber);
}

getLowestLocationNumber()

