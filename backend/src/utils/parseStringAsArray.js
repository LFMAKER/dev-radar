module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(arrayString => arrayString.trim());
}