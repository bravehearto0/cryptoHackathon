import { isNumeric, inLength, inLengthMsg, required } from './common';

export default {
  name: {
    name: 'name',
    label: 'Name',
    validators: [
      {
        validator: required,
        message: () => 'Required',
      },
      {
        validator: inLength(2, 25),
        message: () => inLengthMsg(2, 25),
      },
    ],
  },
  volume: {
    name: 'volume',
    label: 'Gallon',
    validators: [
      {
        validator: isNumeric,
        message: () => 'Should be a number',
      },
    ],
  },
  temp: {
    name: 'temp',
    label: 'Temperature',
    validators: [
      {
        validator: isNumeric,
        message: () => 'Should be a number',
      },
    ],
  },
};
