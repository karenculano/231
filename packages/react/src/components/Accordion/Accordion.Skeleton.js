/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { ChevronRight16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import SkeletonText from '../SkeletonText';
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;

function AccordionSkeleton({ align, open, count, className, testId, ...rest }) {
  const classes = cx(`${prefix}--accordion`, `${prefix}--skeleton`, className, {
    [`${prefix}--accordion--${align}`]: align,
  });
  const numSkeletonItems = open ? count - 1 : count;
  return (
    <ul className={classes} data-testid={testId} {...rest}>
      {open && (
        <li
          data-testid={`${testId}-open-item`}
          open
          className={`${prefix}--accordion__item ${prefix}--accordion__item--active`}>
          <span className={`${prefix}--accordion__heading`}>
            <ChevronRight16 className={`${prefix}--accordion__arrow`} />
            <SkeletonText className={`${prefix}--accordion__title`} />
          </span>
          <div className={`${prefix}--accordion__content`}>
            <SkeletonText width="90%" />
            <SkeletonText width="80%" />
            <SkeletonText width="95%" />
          </div>
        </li>
      )}
      {Array.from({ length: numSkeletonItems }).map((_, i) => (
        <AccordionSkeletonItem key={i} testId={`${testId}-item-${i}`} />
      ))}
    </ul>
  );
}

AccordionSkeleton.propTypes = {
  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: PropTypes.oneOf(['start', 'end']),

  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Set number of items to render
   */
  count: PropTypes.number,

  /**
   * `false` to not display the first item opened
   */
  open: PropTypes.bool,

  /**
   * Id that can be used for testing. Will be added as data-testid attribute to the ul element.
   */
  testId: PropTypes.string,

  /**
   * Set unique identifier to generate unique item keys
   */
  uid: deprecate(PropTypes.any),
};

AccordionSkeleton.defaultProps = {
  open: true,
  count: 4,
  align: 'end',
  testId: 'accordionSkeleton',
};

function AccordionSkeletonItem({ testId }) {
  return (
    <li className={`${prefix}--accordion__item`} data-testid={testId}>
      <span className={`${prefix}--accordion__heading`}>
        <ChevronRight16 className={`${prefix}--accordion__arrow`} />
        <SkeletonText className={`${prefix}--accordion__title`} />
      </span>
    </li>
  );
}
AccordionSkeletonItem.propTypes = {
  testId: PropTypes.string,
};

export default AccordionSkeleton;
