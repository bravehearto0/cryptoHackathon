import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col,
} from 'reactstrap';

const ContentWrap = ({ children, fluid = false, ...props }) => (
  <Container fluid={fluid}>
    <Row>
      <Col
        {...props}
      >
        {children}
      </Col>
    </Row>
  </Container>
);

ContentWrap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  fluid: PropTypes.bool,
};

export default ContentWrap;

