const fs = require('fs');

const data = fs.readFileSync('3.txt', { encoding: 'utf8', flag: 'r' });

let result = 0;

const getSum = () => {
    let lines = data.split('\n')
    lines.forEach((line, lineIndex) => {
        // 1. get index range of numbers for each line
        // let splitArray = line.split(/\D+/);
        // console.log(splitArray)
    let obj = {}

    // create obj with last index of corresponding number
        for(let i=0; i<line.length; i++) {
            if (!isNaN(Number(line[i]))) {
                // console.log("not a number", i, line[i]);
                if (obj[i-1]) {
                    obj[i] = obj[i-1] + line[i]
                    delete obj[i-1]
                } else {
                    obj[i] = line[i]
                }
            }
        }
    // end of obj creation
        // console.log(obj)

        // 2. check if there is the symbol connecnted to each num
        // 2.1. check same line
        Object.keys(obj).forEach(key => {
            // console.log("key", key)
            // console.log("length", obj[key].length)
            let startIndex;
            let endIndex;
            let numberAdded = false
            startIndex = Number(key) - obj[key].length
            endIndex = Number(key) + 1; // The position after the number
            // console.log("start index", startIndex)
            // console.log("does line exist", line[startIndex])
            // check if left or right is a symbol that is not a dot
            // console.log("endIndex", endIndex)
            // console.log("val of endindex",line[Number(endIndex)])
            if ((endIndex < line.length && line[endIndex] !== '.') || (startIndex >= 0 && line[startIndex] !== '.')) {
                // console.log("yeah")
                numberAdded = true
                // console.log("add Number same line", lineIndex + 1, Number(obj[key]))
                result += Number(obj[key])
            }

            // 2.2 and 2.3 create indexes where it can be in next line
            if (!numberAdded) {

                let indexes = []
                for (let i = startIndex; i <= endIndex; i++) {
                    if (i >= 0 && i < line.length)
                    indexes.push(i);
                }
                
                // 2.2 check next and previous line line
                for (let i = 0; i < indexes.length; i++) {
                    let val = indexes[i];
                    if (lineIndex+1 < lines.length && lines[lineIndex + 1][val] !== '.' || lineIndex > 0 && lines[lineIndex - 1][val] !== '.') {
                        // console.log("add Number", lineIndex + 1, Number(obj[key]))
                        result += Number(obj[key]);
                        break;
                    }
                }
            }
            

        })
        // console.log("lineIndex", lineIndex, result)
    })
console.log("result",result)
}

getSum();