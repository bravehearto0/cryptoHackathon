import { inLength, inLengthMsg, required } from './common';

export default {
  comment: {
    name: 'comment',
    label: 'Comment',
    validators: [
      {
        validator: required,
        message: () => 'Required',
      },
      {
        validator: inLength(2, 300),
        message: () => inLengthMsg(2, 300),
      },
    ],
  },
};
