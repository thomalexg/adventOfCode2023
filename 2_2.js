const fs = require('fs');

const data = fs.readFileSync('2.txt', { encoding: 'utf8', flag: 'r' });


const findMinNumberofItems = () => {
    let total = 0;
    let lines = data.split('\n')
    lines.forEach((line, index) => {
        let minObj = {
            red: 1,
            green: 1,
            blue: 1,
        }
        console.log("line", line)
        const cleanedInput = line.split(': ')[1].trim();
        const items = cleanedInput.split('; ');
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let colors = item.split(',');
            const colorObj = {};
            colors.forEach((take) => {
                let color = take.trim().split(' ')[1];
                console.log("color", color);
                console.log("take", take.trim()[0]);
                minObj[color] = Number(take.trim().split(' ')[0]) > minObj[color] ? Number(take.trim().split(' ')[0]) : minObj[color];
            });
        }
           console.log("minObj", minObj) 
           let product = 1;
    for (const key in minObj) {
        if (minObj.hasOwnProperty(key)) {
            product *= minObj[key];
        }
    }
    total += product;
           
    })

    console.log("total", total)
}


findMinNumberofItems();