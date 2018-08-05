pragma solidity ^0.4.22;

contract gps {

  function differences(uint intOne, uint intTwo, uint floatOne, uint floatTwo) internal pure returns(uint, uint) {
    floatOne = floatOne % (10 ** 6);
    floatTwo = floatTwo % (10 ** 6);
    int intDiff = int(intOne) - int(intTwo);
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
  function gpsDifference(uint lastlatitudeInt, uint lastlatitudeFloat, uint lastlongitudeInt, uint lastlongitudeFloat, uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) internal pure returns (uint, uint) {
      uint laIntDiff;
      uint laFloatDiff;
      uint loIntDiff;
      uint loFloatDiff;
      (laIntDiff, laFloatDiff) = differences(lastlatitudeInt, latitudeInt, lastlatitudeFloat, latitudeFloat);
      (loIntDiff, loFloatDiff) = differences(lastlongitudeInt, longitudeInt, lastlongitudeFloat, longitudeFloat);
      return ((laIntDiff + loIntDiff), (laFloatDiff + loFloatDiff));
  }

  // not really a geoHash, a geoHash like hash generation
  function generateGeoHash(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat, uint currentGeneration) internal pure returns (bytes32) {
    // some sanity check, only last 6 digits are meaningful for latitude and longitude float
    latitudeFloat = latitudeFloat % (10 ** 6);
    longitudeFloat = longitudeFloat % (10 ** 6);
    if (currentGeneration == 0) {
      latitudeFloat = 0;
      longitudeFloat = 0;
    } else if(currentGeneration <= 2) {
      latitudeFloat = latitudeFloat - latitudeFloat % (10 ** 5);
      longitudeFloat = longitudeFloat - longitudeFloat % (10 ** 5);
    } else {
      latitudeFloat = latitudeFloat - latitudeFloat % (10 ** 4);
      longitudeFloat = longitudeFloat - longitudeFloat % (10 ** 4);
    }

    return keccak256(abi.encodePacked(latitudeInt, longitudeInt, latitudeFloat, longitudeFloat));
  }

  function generateRandomLocation() internal view returns(uint, uint) {
    uint intPart = random() % 360;
    uint floatPart = random() % (10 ** 6);
    return (intPart, floatPart);
  }

  function random() private view returns (uint32) {
       return uint32(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))% (2 ** 32));
   }

}
