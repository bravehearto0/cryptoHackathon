pragma solidity ^0.4.22;

contract gps {

  function differences(int intOne, int intTwo, uint floatOne, uint floatTwo) internal pure returns(uint, uint) {
    floatOne = floatOne % (10 ** 6);
    floatTwo = floatTwo % (10 ** 6);
    int intDiff = intOne - intTwo;
    int floatDiff = int(floatOne) - int(floatTwo);
    if ((intDiff > 0 && floatDiff < 0) || (intDiff > 0 && floatDiff < 0)) {
      if(intDiff < 0) {
        intDiff = intDiff * -1 - 1;
        floatDiff = 10 ** 6 - floatDiff;
      } else {
        // intDiff is positive
        intDiff--;
        // float diff is negative.
        floatDiff = 10 ** 6 + floatDiff;
      }
    }
    if (intDiff < 0) {
      intDiff = intDiff * -1;
    }
    if (floatDiff < 0) {
      floatDiff = floatDiff * -1;
    }
    return(uint(intDiff), uint(floatDiff));
  }

  // latitudeFloat is six digits after dot
  function gpsDifference(int lastlatitudeInt, uint lastlatitudeFloat, int lastlongitudeInt, uint lastlongitudeFloat, int latitudeInt, uint latitudeFloat, int longitudeInt, uint longitudeFloat) internal pure returns (uint, uint) {
      uint laIntDiff;
      uint laFloatDiff;
      uint loIntDiff;
      uint loFloatDiff;
      (laIntDiff, laFloatDiff) = differences(lastlatitudeInt, latitudeInt, lastlatitudeFloat, latitudeFloat);
      (loIntDiff, loFloatDiff) = differences(lastlongitudeInt, longitudeInt, lastlongitudeFloat, longitudeFloat);
      return ((laIntDiff + loIntDiff), (laFloatDiff + loFloatDiff));
  }

  // not really a geoHash, a geoHash like hash generation
  function generateGeoHash(int latitudeInt, uint latitudeFloat, int longitudeInt, uint longitudeFloat, uint currentGeneration) internal pure returns (bytes32) {
    // some sanity check, only last 6 digits are meaningful for latitude and longitude float
    latitudeInt = (latitudeInt + 180) % 360;
    longitudeInt = (longitudeInt + 180) % 360;
    latitudeFloat = latitudeFloat % (10 ** 6);
    longitudeFloat = longitudeFloat % (10 ** 6);
    if (currentGeneration == 0) {
      latitudeFloat = latitudeFloat - latitudeFloat % (10 ** 4);
      longitudeFloat = longitudeFloat - longitudeFloat % (10 ** 4);
    } else if(currentGeneration <= 2) {
      latitudeFloat = latitudeFloat - latitudeFloat % (10 ** 3);
      longitudeFloat = longitudeFloat - longitudeFloat % (10 ** 3);
    } else {
      latitudeFloat = latitudeFloat - latitudeFloat % (10 ** 2);
      longitudeFloat = longitudeFloat - longitudeFloat % (10 ** 2);
    }
    return keccak256(abi.encodePacked(latitudeInt, longitudeInt, latitudeFloat, longitudeFloat));
  }

  // (laInt, laFloat, loInt, loFloat)
  // for demo purpose, manual tuned this for just the san Franciscoo Bay area.
  // [37.5000000, 37.800000] and [-122.500000, -122.250000]
  function generateRandomLocation() internal view returns(int, uint, int, uint) {
    int laInt = 37;
    int loInt = -122;
    uint laFloat = 500000 + random(17) % 300000;
    uint loFloat = 250000 + random(123) % 250000;
    return (laInt, laFloat, loInt, loFloat);
  }

  function random(uint rnd) private view returns (uint32) {
       return uint32(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, rnd)))% (2 ** 32));
   }

}
