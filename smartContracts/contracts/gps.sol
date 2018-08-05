pragma solidity ^0.4.22;

contract gps {
  modifier gpsCheck(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) {
    Access lastAccess = lastAccess[msg.sender];
    if (lastAccess.isValue) {
      uint intDiff;
      uint floatDiff;
      (intDiff, floatDiff) = gpsDifference(lastAccess, latitudeInt, latitudeFloat, longitudeInt, longitudeFloat);
      require(
        (intDiff < gpsThresholdInt) || (intDiff == gpsThresholdInt && floatDiff == gpsThresholdFloat)
        //"user rate limited. rateLimitInterval is " + string(rateLimitInterval)
        );
    }
    _;
  }

  function differences(uint intOne, uint intTwo, uint floatOne, uint floatTwo) internal pure return(uint, uint) {
    int intDiff = intOne - intTwo;
    int floatDiff = floatOne - floatTwo;
    if ((intDiff > 0 && floatDiff < 0) || intDiff > 0 && floatDiff < 0)) {
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
    return((uint)intDiff, (uint)floatDiff);
  }

  // latitudeFloat is six digits after dot
  function gpsDifference(Access lastAccess, uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) internal pure return (uint, uint) {
      uint laIntDiff;
      uint laFloatDiff;
      uint loIntDiff;
      uint loFloatDiff;
      (laIntDiff, laFloatDiff) = differences(lastAccess.latitudeInt, latitudeInt, lastAccess.latitudeFloat, latitudeFloat);
      (loIntDiff, loFloatDiff) = differences(lastAccess.longitudeInt, longitudeInt, lastAccess.longitudeFloat, longitudeFloat);
      return ((laIntDiff + loIntDiff), (laFloatDiff + loFloatDiff));
  }

  function generateGeoHash(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat, uint currentGeneration) internal pure returns (string) {
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
    uint [] data = new uint[4];
    data[0] = latitudeInt;
    data[1] = longitudeInt;
    data[2] = latitudeFloat;
    data[3] = longitudeFloat;
    string concateLocation = bytes32ArrayToString(data);
    return keccak256(concateLocation);
  }

  function bytes32ArrayToString (uint[] dataInt) returns (string) {
    bytes32 [] data = new bytes32[4];
    for (uint i = 0; i< 4; i++ ) {
      data[i] = bytes32(dataInt[i]);
    }
    bytes memory bytesString = new bytes(data.length * 32);
    uint urlLength;
    for (uint i=0; i<data.length; i++) {
        for (uint j=0; j<32; j++) {
            byte char = byte(bytes32(uint(data[i]) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[urlLength] = char;
                urlLength += 1;
            }
        }
    }
    bytes memory bytesStringTrimmed = new bytes(urlLength);
    for (i=0; i<urlLength; i++) {
        bytesStringTrimmed[i] = bytesString[i];
    }
    return string(bytesStringTrimmed);
}
}


}
