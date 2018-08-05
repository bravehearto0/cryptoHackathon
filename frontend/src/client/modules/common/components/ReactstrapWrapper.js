import {
  Form as RSForm,
  Button as RSButton,
  FormGroup,
  Label as RSLabel,
} from 'reactstrap';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import InlineLoading from './InlineLoading';

export const Label = styled(RSLabel)`
  padding-top: 6px;
`;

const ErrorWrap = styled.div`
  font-size: ${p => p.small ? '0.8em' : '1.1em'};
`;

export const Error = ({className, ...props}) => (
  <ErrorWrap
    {...props}
    className={`${className ? className : ''} text-danger`}
  />
);

Error.propTypes = {
  small: PropTypes.bool,
  className: PropTypes.string,
};

export const FormErrors = ({formErrors}) => {
  if (isEmpty(formErrors)) {
    return null;
  }

  return (<FormGroup>
    {
      formErrors.map((e) =>
        <Error key={e}>{e}</Error>
      )
    }
  </FormGroup>);
};

FormErrors.propTypes = {
  formErrors: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

export const Button = ({children, loading, ...props}) => {
  return (
    <RSButton {...props}>
      {loading ? <InlineLoading size="small" /> : children}
    </RSButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};


export const Form = (props) => <RSForm {...props} />;
