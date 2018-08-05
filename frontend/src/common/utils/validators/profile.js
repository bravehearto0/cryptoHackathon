import { inLength, inLengthMsg, required } from './common';

export default {
  firstName: {
    name: 'firstName',
    label: 'First name',
    validators: [
      {
        validator: required,
        message: () => 'Required',
      },
      {
        validator: inLength(2, 15),
        message: () => inLengthMsg(2, 15),
      },
    ],
  },
  lastName: {
    name: 'lastName',
    label: 'Last name',
    validators: [
      {
        validator: required,
        message: () => 'Required',
      },
      {
        validator: inLength(2, 15),
        message: () => inLengthMsg(2, 15),
      },
    ],
  },
};
