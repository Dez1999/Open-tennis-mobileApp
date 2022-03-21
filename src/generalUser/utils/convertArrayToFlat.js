//Method: Helper function to return a flat array
function convertArrayToFlat(array) {

    const flatOccupancyList = array.reduce((acc, val) => {
        return acc.concat(val)
      }, []);

    console.log(flatOccupancyList);
    return flatOccupancyList;
    
}
module.exports = convertArrayToFlat;
