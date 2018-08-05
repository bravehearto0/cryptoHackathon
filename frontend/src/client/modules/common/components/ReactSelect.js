import CreatablePure from 'react-select/lib/Creatable';
import React from 'react';
import ReactSelectPure from 'react-select';

import { colors } from '../../../styles/styled';

const customStyles = {
  control: (base) => ({
    ...base,
    border: `1px solid ${colors.inputBorder}`,
    borderRadius: 0,
    boxShadow: 0,
    ':hover': {
      border: `1px solid ${colors.inputBorder}`,
    },
  }),
  option: (base, { isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? colors.b3 : 'white',
    color: 'black',
    ':active': {
      backgroundColor: colors.b3,
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: colors.b3,
    ':hover': {
      backgroundColor: colors.b3,
    },
  }),
  multiValueRemove: (base) => ({
    ...base,
    cursor: 'pointer',
    backgroundColor: colors.b3,
    ':hover': {
      backgroundColor: colors.b3,
    },
  }),
};

export const Creatable = (props) => (
  <CreatablePure
    styles={customStyles}
    {...props}
  />
);

export const ReactSelect = (props) => (
  <ReactSelectPure
    styles={customStyles}
    {...props}
  />
);
