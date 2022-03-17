function calculateOccupancyInd(item) {
    if (item > 0){
        return "BUSY"
    }
    else {
        return "FREE"
    }
}
module.exports = calculateOccupancyInd;