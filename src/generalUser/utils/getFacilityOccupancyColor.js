//Method: Helper function to return the color of an Occupancy Status for each Facility
function getFacilityOccupancyColor(status) {
    if(status == 'FREE'){
      return '#28B625'
    }
    else if (status == 'BUSY'){
      return '#D32E2E'
    }
    else if (status == 'MODERATELY BUSY'){
      return '#F9B70F'
    }
    else {
      return '#696A6D' //Not available
    }

}
module.exports = getFacilityOccupancyColor;