//Method: Calculates the Occupancy of an indivual area by returning FREE or BUSY
function calculateOccupancyInd(item) {
    if (item > 0){
        return "BUSY"
    }
    else {
        return "FREE"
    }
}
module.exports = calculateOccupancyInd;