import React from 'react';
import PropTypes from 'prop-types';

import bubbleIcon from '../assets/icon-bubble.svg';

export default class Item extends React.Component {
  static propTypes = {
    tank: PropTypes.object,
  };

  render() {
    const { tank } = this.props;
    return (
      <article className='item tank'>
        <div className='item-icon'></div>
        <div className='item-liner'></div>
        <div className='item-content'>
          <span className='item-tag'>Featured Tank</span>
          <header className='item-header'>{tank.name}</header>
          <span className='item-author'>
            <span className='item-author-header'>Owned By:</span> {tank.owner}, {tank.date}
          </span>
          <span className='item-comments'><img src={bubbleIcon} /> {tank.comments} Comments</span>
          <div className='item-summary' dangerouslySetInnerHTML={{__html: tank.summary}}/>
          <span className='item-read-more'>Read more...</span>
        </div>
        <div className='item-thumb'>
          <img src={tank.image} />
        </div>
      </article>
    );
  }
}
