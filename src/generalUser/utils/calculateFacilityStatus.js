function calculateFacilityStatus(flatOccupancyList){

    //1. Find total number of free areas
    var totalZeros;
    totalZeros = flatOccupancyList.filter(z => z === 0).length;
    //console.log("Facility : " + element.id + ". Num Empty Areas: " + totalZeros);
    
    //2. Calculate length of Array List
    var numDeviceAreas = flatOccupancyList.length;
    //console.log("Facility : " + element.id + ". Num Device Areas: " + numDeviceAreas);

    //2. Calculate Occupancy Status 
    var status = totalZeros / numDeviceAreas;
    //console.log("Facility Status: " + status);


    //3. Filter into Occupancy Status Categories

    if (status > 0.79){
      //Facility is Free
      return "FREE";
    }

    else if (status > 0.4 && status < 0.80){
      //Facility is Moderately Busy
      return "MODERATELY BUSY";
    }
    else if (status >= 0 &&  status <= 0.4){
      //Facility is Busy
      return "BUSY";
    }
    else {
      //Facility status is Not available
      return "NOT AVAILABLE";
    }

}

module.exports = calculateFacilityStatus;