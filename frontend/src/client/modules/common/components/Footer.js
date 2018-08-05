import React from 'react';
import styled from 'styled-components';

import { content } from '../../../styles/styled';

const FooterStyled = styled.div`
  padding: ${content.paddingBig};
  color: #b5b5b5;
  font-weight: bold;
  line-height: 25px;
  background: #f7f7f7;
`;

const Footer = () => (
  <footer>
    <FooterStyled className="text-center">
      crypto pokemon
    </FooterStyled>
  </footer>
);

export default Footer;
