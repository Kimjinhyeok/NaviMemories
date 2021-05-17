import React from 'react'
import NonPassiveTouchTarget from '../../utils/NonPassiveTouchTarget';
import cx from 'classname';
import { makeStyles } from '@material-ui/core';

export default function CarouselContainer (props) {
    const {data, cursor, cardSize, carouselWidth, carouselState: {active, dragging}, ...rest} = props;

    let current = -Math.round(cursor) % data.length;
    const cardPadCount = 0;

    while (current < 0) {
      current += data.length;
    }
    // Put current card at center
    const translateX = (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2
    return (
      <NonPassiveTouchTarget
        className={cx(
          'carousel-container',
          {
            'is-active': active,
            'is-dragging': dragging
          }
        )}
      >
        <NonPassiveTouchTarget
          className='carousel-track'
          style={{transform: `translate3d(${translateX}px, 0, 0)`}}
          {...rest}
        />
  
        <div className='carousel-pagination-wrapper'>
          <ol className='carousel-pagination'>
            {data.map((_, index) => (
              <li
                key={index}
                className={current === index ? 'current' : ''}
              />
            ))}
          </ol>
        </div>
      </NonPassiveTouchTarget>
    )
  }