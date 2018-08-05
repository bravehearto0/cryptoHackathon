// experimental

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import './InlineLoadingStatic.scss';

const InlineLoading = ({ size, padding, ...props }) => {
  return (
    <span {...props}>
      <span className={`lds-ripple`}>
        <div>
        </div>
        <div>
        </div>
      </span>
    </span>
  );
};

InlineLoading.propTypes = {
  className: PropTypes.string,
  padding: PropTypes.string,
  size: PropTypes.string,
};

const sizeToAnimationName = (p) => {
  switch (p.size) {
    case 'small':
      return 'LoadingAni-small';
    default:
      return 'LoadingAni';
  }
};

const sizeToPixel = (p, pixel) => {
  let scale = 1;

  switch (p.size) {
    case 'small':
      scale = 1/2;
      break;
    default:
      break;
  }

  return `${pixel * scale}`;
};

export default styled(InlineLoading)`
  ${p => p.padding ? `padding: ${p.padding};` : ''}
  display: inline-block;
  width: ${p => sizeToPixel(p, 50)}px;
  height: ${p => sizeToPixel(p, 50)}px;
  vertical-align: middle;

  .lds-ripple {
    display: inline-block;
    position: relative;
  }
  .lds-ripple div {
    box-sizing: content-box;
    position: absolute;
    border-width: ${p => sizeToPixel(p, 20)}px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    -webkit-animation: ${sizeToAnimationName} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    animation: ${sizeToAnimationName} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(1) {
    border-color: #f5bb16;
  }
  .lds-ripple div:nth-child(2) {
    border-color: #3e92cc;
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .lds-ripple {
    width: 100%;
    height: 100%;
    -webkit-transform: translate(-${p => sizeToPixel(p, 50 - 16)}px, -${p => sizeToPixel(p, 50 - 16)}px) scale(${p => sizeToPixel(p, 0.5)}) translate(${p => sizeToPixel(p, 50)}px, ${p => sizeToPixel(p, 50)}px);
    transform: translate(-${p => sizeToPixel(p, 50 - 16)}px, -${p => sizeToPixel(p, 50 - 16)}px) scale(${p => sizeToPixel(p, 0.5)}) translate(${p => sizeToPixel(p, 50)}px, ${p => sizeToPixel(p, 50)}px);
  }
`;
