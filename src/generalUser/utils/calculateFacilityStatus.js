//Method: Calculates the Occupancy of the Facility
function calculateFacilityStatus(flatOccupancyList){

    //1. Find total number of free areas
    var totalZeros;
    totalZeros = flatOccupancyList.filter(z => z === 0).length;

    //2. Calculate length of Array List
    var numDeviceAreas = flatOccupancyList.length;

    //2. Calculate Occupancy Status 
    var status = totalZeros / numDeviceAreas;

    //3. Filter into Occupancy Status Categories
    if (status >= 0.80){
      //80% of Facility is Free -> Result is Free
      return "FREE";
    }

    else if (status > 0.4 && status < 0.80){
      //41% - 79% of Facility is Free -> Result is Moderately Busy
      return "MODERATELY BUSY";
    }
    else if (status >= 0 &&  status <= 0.4){
      //Less than 40% of Facility is Free -> Result is Busy
      return "BUSY";
    }
    else {
      //Facility status is Not available
      return "NOT AVAILABLE";
    }

}

module.exports = calculateFacilityStatus;