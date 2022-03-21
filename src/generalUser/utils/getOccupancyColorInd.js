//Method: Helper function to return the color of an Occupancy Status for each individual area
function getOccupancyColorInd(status) {
    if(status == 'FREE'){
        return '#28B625'
      }
      else if (status == 'BUSY'){
        return '#D32E2E'
      }
      else{
        return '#696A6D' // No occupancy status
      }

}
module.exports = getOccupancyColorInd;
