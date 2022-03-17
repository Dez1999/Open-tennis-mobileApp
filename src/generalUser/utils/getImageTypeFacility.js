//Import Images
const swimmingType = require('../images/swimming_area.jpg');
const tennisType = require('../images/tennis-court-dimensions.jpg');
const basketballType = require('../images/Basketball-court.png');

function getImageTypeFacility(type) {

     if(type == "TENNIS"){
        return tennisType;
      }
    
      if(type == "BASKETBALL"){
        return basketballType;
      }
    
      if(type == "SWIMMING"){
        return swimmingType;
      }
    
}
module.exports = getImageTypeFacility;