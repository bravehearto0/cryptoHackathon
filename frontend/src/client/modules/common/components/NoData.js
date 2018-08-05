import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/styled';

const Wrap = styled.div`
  padding-top: 18vh;
  width: 100%;
  text-align: center;
  color: ${colors.gray};
`;

const NoData = ({copy = 'No data.'}) =>
  (
    <Wrap>
      <div>{copy}</div>
    </Wrap>
  );

NoData.propTypes = {
  copy: PropTypes.string,
};

export default NoData;
