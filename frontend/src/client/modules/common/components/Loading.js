import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import InlineLoadingStatic from './InlineLoadingStatic';

const Loading = ({className, ...props}) => {
  return (
    <div className={className} style={{ minHeight: (props.size === 'small' ? '' : '130px') }}>
      <InlineLoadingStatic {...props}/>
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

export default styled(Loading)`
  text-align: center;
`;
