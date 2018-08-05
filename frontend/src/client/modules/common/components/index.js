import styled from 'styled-components';

import { content, thresholds } from '../../../styles/styled';

export { default as Button } from './button';

export const ContentBox = styled.div`
  padding: ${({padding})=> padding === 'small' ? '10px' : content.padding};
  @media (max-width: ${thresholds.md2}px) {
    padding: 4vw;
  }
`;

export const ContentHeader = styled.h3`
  ::after {
    content: "";
    clear: both;
    display: table;
  }
  @media (max-width: ${thresholds.md2}px) {
    font-size: 20px;
  }
`;

export const SizeProvider = styled.div`
  display: inline-block;
  width: ${p => p.width || 'auto'};
  height: ${p => p.height || 'auto'};
`;
