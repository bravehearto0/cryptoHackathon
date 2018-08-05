import { Field } from 'redux-form';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Creatable, ReactSelect } from './ReactSelect';
import { Error } from './ReactstrapWrapper';
import { SizeProvider } from './';

export class InputField extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    meta: PropTypes.object,
    style: PropTypes.object,
    hideError: PropTypes.bool,
  };

  renderInput() {
    const {
      input,
      label,
      hideError = false,
      meta: { touched, error },
      ...props
    } = this.props;

    const errorOn = !hideError && touched && error;
    const className = errorOn ? 'input-error' : '';
    const allProps = {
      ...input,
      placeholder: props.label,
      ...props,
      className,
    };

    switch (props.type) {
      case 'select': {
        allProps.instanceId = allProps.name;
        return (
          <ReactSelect {...allProps}/>
        );
      }
      case 'select-creatable': {
        allProps.instanceId = allProps.name;
        return (
          <Creatable {...allProps}/>
        );
      }
      case 'text': {
        return (
          <Input autoComplete="off" {...allProps}/>
        );
      }
      default:
        return null;
    }
  }

  render() {
    const {
      style = {},
      className = '',
      hideError = false,
      meta: { touched, error },
    } = this.props;

    const errorOn = !hideError && touched && error;

    return (
      <div style={style} className={className}>
        { this.renderInput() }
        { errorOn && <Error small>{error}</Error> }
      </div>
    );
  }
}

export const RInput = ({width, height, ...props}) => {
  return (
    <SizeProvider width={width} height={height}>
      <Field
        {...props}
        component={InputField}
      />
    </SizeProvider>
  );
};

RInput.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
