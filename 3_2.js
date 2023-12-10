const fs = require('fs');

const data = fs.readFileSync('3.txt', { encoding: 'utf8', flag: 'r' });

let result = 0;


const getProduct = (obj, lines, lineIndex) => {
    // console.log('getProduct obj', obj);
    // console.log('getProduct lines', lines);
    console.log('lineIndex', lineIndex);
    let numArr = [];

    Object.keys(obj).forEach(key => {
        let numberStr = '';
        let startIndex = obj[key][0];
        
        while (startIndex < lines[key].length && !isNaN(Number(lines[key][startIndex])) && lines[key][startIndex] !== '.') {
            numberStr += lines[key][startIndex];
            startIndex++;
        }

        if (numberStr.length > 0) {
            numArr.push(Number(numberStr));
        }
    });

    console.log('numArr', numArr);
    return numArr.reduce((a, b) => a * b, 1); // Added 1 as initial value for reduce
}

const getSum = () => {
    let lines = data.split('\n')
    lines.forEach((line, lineIndex) => {
        // 1. get all indices of * in current line
        const indices = [];
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '*') {
                indices.push(i);
            }
        }
        const numbersFoundObj = {};
        // 2. if at least one * in line, check if numbers are touching it 
        if (indices.length) {
            // loop over all indices and get the numbers touching it
            indices.forEach(idx => {
                // store found number indices and lineIndex in obj

                // check in same line
                // console.log("check for numbers", lineIndex)
                if (idx > 0 && !isNaN(Number(line[idx-1]))) {
                    // console.log("number to the left", line[idx-1])
                    if (!numbersFoundObj[lineIndex]) {
                        numbersFoundObj[lineIndex] = [idx-1];
                    } else {
                        numbersFoundObj[lineIndex] = [idx-1]
                    }
                }
                if (idx > 0 && !isNaN(Number(line[idx+1]))) {
                    // console.log("number to the right", line[idx+1])
                    if (!numbersFoundObj[lineIndex]) {
                        numbersFoundObj[lineIndex] = [idx+1];
                    } else {
                        // console.log("failed in line ", lineIndex + 1);
                        numbersFoundObj[lineIndex].push(idx+1);
                    }
                }

                // check previous and next line
                // check if previous line exists
                if (lineIndex > 0) {
                    // console.log("previous line exists", lineIndex)
                    // check previous line diagonal left
                    if (!isNaN(Number(lines[lineIndex-1][idx-1]))) {
                        if (!numbersFoundObj[lineIndex-1]) {
                            numbersFoundObj[lineIndex-1] = [idx-1];
                        } else {
                            numbersFoundObj[lineIndex-1].push(idx-1);
                        }
                    }

                    // check previous line above
                    if (!isNaN(Number(lines[lineIndex-1][idx]))) {
                        if (!numbersFoundObj[lineIndex-1]) {
                            numbersFoundObj[lineIndex-1] = [idx];
                        } else {
                            numbersFoundObj[lineIndex-1].push(idx);
                        }
                    }
                    // check previous line diagonal right
                    if (!isNaN(Number(lines[lineIndex-1][idx+1]))) {
                        if (!numbersFoundObj[lineIndex-1]) {
                            numbersFoundObj[lineIndex-1] = [idx+1];
                        } else {
                            numbersFoundObj[lineIndex-1].push(idx+1);
                        }
                    }

                }
                // check if next line exists
                if (lineIndex < lines.length - 1) {
                    // console.log("next line exists", lineIndex)
                    
                    // check next line diagonal left
                    if (!isNaN(Number(lines[lineIndex+1][idx-1]))) {
                        if (!numbersFoundObj[lineIndex+1]) {
                            numbersFoundObj[lineIndex+1] = [idx-1];
                        } else {
                            numbersFoundObj[lineIndex+1].push(idx-1);
                        }
                    }

                    // check next line above
                    if (!isNaN(Number(lines[lineIndex+1][idx]))) {
                        if (!numbersFoundObj[lineIndex+1]) {
                            numbersFoundObj[lineIndex+1] = [idx];
                        } else {
                            numbersFoundObj[lineIndex+1].push(idx);
                        }
                    }
                    // check next line diagonal right
                    if (!isNaN(Number(lines[lineIndex+1][idx+1]))) {
                        if (!numbersFoundObj[lineIndex+1]) {
                            numbersFoundObj[lineIndex+1] = [idx+1];
                        } else {
                            numbersFoundObj[lineIndex+1].push(idx+1);
                        }
                    }

                }
                // console.log("numbers found 1", numbersFoundObj);
                // if (Object.keysnumbersFoundObj(numbersFoundObj).length && Object.keysnumbersFoundObj(numbersFoundObj).length === 1 && )
                Object.keys(numbersFoundObj).forEach(key => {
                    if (numbersFoundObj[key].length > 1) {
                        if (numbersFoundObj[key].length === 2) {
                            if (numbersFoundObj[key][1] - numbersFoundObj[key][0] === 1) {
                                numbersFoundObj[key] = [numbersFoundObj[key][0]]
                            }
                        }
                        if (numbersFoundObj[key].length === 3) {
                            if (numbersFoundObj[key][2] - numbersFoundObj[key][0] === 2) {
                                numbersFoundObj[key] = [numbersFoundObj[key][0]]
                            }
                        }
                    }
                })
                // console.log("numbers found 2", numbersFoundObj);
            })
        }
        if (Object.keys(numbersFoundObj).length > 1) {
            // console.log("star in line", lineIndex + 1 + " has at least 2 numbers so it shoudl be considered")
            result += getProduct(numbersFoundObj, lines, lineIndex + 1)
        }
        
    })
console.log("result",result)
}

getSum();