pragma solidity ^0.4.22;

contract gps {

  function differences(uint intOne, uint intTwo, uint floatOne, uint floatTwo) internal pure returns(uint, uint) {
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

  function generateGeoHash(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat, uint currentGeneration) internal pure returns (bytes32) {
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
    uint[4] memory data;
    data[0] = latitudeInt;
    data[1] = longitudeInt;
    data[2] = latitudeFloat;
    data[3] = longitudeFloat;
    string memory concateLocation = bytes32ArrayToString(data);
    return keccak256(abi.encodePacked(concateLocation));
  }

  function bytes32ArrayToString (uint[4] memory dataInt) internal pure returns (string) {
    bytes32[4] memory data;
    for (uint i = 0; i< 4; i++ ) {
      data[i] = bytes32(dataInt[i]);
    }
    bytes memory bytesString = new bytes(data.length * 32);
    uint urlLength;
    for (i=0; i<data.length; i++) {
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
