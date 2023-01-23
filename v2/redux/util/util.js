import { GRADIENT } from "../../../AppV2";

//parameter: Array of JSON objects representing indivdual sensor info 
//parameter - scale: Boolean on whether or not pniFilesize needs to be scaled
//output: Array of JSON objects representing map-compatible sensor info
//Example:
//Raw: [{id: sensor1, lat: 38, long: 49, pniFileSize: 1025}, {id: sensor2, lat: 14, long: 29, pniFileSize: 28}]
//Output: [{id: sensor1, lat: 38, long: 49, weight: 13}, {id: sensor2, lat: 14, long: 29, weight: 3}]
//Converts fileSizes to scale number from 1-10.
export const allDataFormatter = (rawData, scalePniSize) => {
    //need to subtract one to make the scale 0 - 9 instead of 0 - 10 -> which would case an out-of-bounds error
    const GRADIENT_SIZE = GRADIENT.length - 1;
    rawData.forEach(sensor => {
        sensor.pniFilename = parseInt(sensor.pniFilename);
        sensor.lat = parseFloat(sensor.lat);
        sensor.long = parseFloat(sensor.long);
    });
    if (scalePniSize) {
        let pniWeights = rawData.map((sensor) => sensor.pniFilename);
        let min = Math.min(...pniWeights);
        let max = Math.max(...pniWeights);
        //range of values of pniFileSizes
        let scaleFactor = (max - min) / GRADIENT_SIZE;
        let formattedData = rawData;
        formattedData.map((sensor) => sensor.pniFilename = Math.ceil(sensor.pniFilename / scaleFactor - min / scaleFactor));
        return formattedData;
    }
    return rawData;
}