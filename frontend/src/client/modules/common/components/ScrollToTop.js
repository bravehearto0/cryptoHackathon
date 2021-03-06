import { Component } from 'react';
import { get } from 'lodash';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const path = get(this, 'props.location.pathname');

      // tank list keep the same
      if (!['/tanks'].includes(path)) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};

export default withRouter(ScrollToTop);
