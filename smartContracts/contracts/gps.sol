contract Gps {
  modifier gpsCheck(uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) {
    Access lastAccess = lastAccess[msg.sender];
    if (lastAccess.isValue) {
      uint intDiff;
      uint floatDiff;
      (intDiff, floatDiff) = gpsDifference(lastAccess, latitudeInt, latitudeFloat, longitudeInt, longitudeFloat);
      require(
        (intDiff < gpsThresholdInt) || (intDiff == gpsThresholdInt && floatDiff == gpsThresholdFloat)
        "user rate limited. rateLimitInterval is " + string(rateLimitInterval)
        );
    }
    _;
  }

  function differences(uint intOne, uint intTwo, uint floatOne, uint floatTwo) private pure return(uint, uint) {
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
  function gpsDifference(Access lastAccess, uint latitudeInt, uint latitudeFloat, uint longitudeInt, uint longitudeFloat) private pure return (uint, uint) {
      uint laIntDiff;
      uint laFloatDiff;
      uint loIntDiff;
      uint loFloatDiff;
      (laIntDiff, laFloatDiff) = differences(lastAccess.latitudeInt, latitudeInt, lastAccess.latitudeFloat, latitudeFloat);
      (loIntDiff, loFloatDiff) = differences(lastAccess.longitudeInt, longitudeInt, lastAccess.longitudeFloat, longitudeFloat);
      return ((laIntDiff + loIntDiff), (laFloatDiff + loFloatDiff));
  }

}
