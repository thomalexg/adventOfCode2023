const fs = require('fs');

const data = fs.readFileSync('5.txt', { encoding: 'utf8', flag: 'r' });

const splitted = data.split(/\n\s*\n/);
const seeds = splitted.shift().split(":")[1].trim().split(" ");
const parts = splitted
// console.log("parts: ", parts)

const mapObj = {};

const createMapObject = (schema, index) => {
// console.log("schema: ", schema);
// console.log("index: ", index)
if (!mapObj[index]) mapObj[index] = {};
for (let i = 0; i < Number(schema[2]); i++) {
    mapObj[index][Number(schema[1])+i] = Number(schema[0])+i;
}
}

const convertFunc = (maps) => {
    // console.log("maps: ", maps)
    maps.forEach((map, index) => {
       let schemas = map.split('\n');
       let name = schemas.shift();
    //    console.log("name", name)
    //    console.log("schemas: ", schemas)
       schemas.forEach((schema) => {
        createMapObject(schema.split(" "), index)
       })

    })
    //    console.log("mapObj", mapObj)
}

const getLowestLocationNumber = () => {
    // console.log("seeds: ", seeds);
    let numArr = [];

    seeds.forEach(seed => {
        let number = Number(seed);
        Object.keys(mapObj).forEach((key) => {
            if (mapObj[key][number]) {
                number = Number(mapObj[key][number]);
            }
        });
        // console.log("seed", seed);
        // console.log("loop over", number);
        numArr.push(number);
    });

    let smallestNumber = Math.min(...numArr);

    console.log("smallestNumber", smallestNumber);
}

convertFunc(parts)
getLowestLocationNumber()

