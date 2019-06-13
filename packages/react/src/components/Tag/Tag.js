/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import Close16 from '@carbon/icons-react/lib/close/16';

const { prefix } = settings;

const TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
};

const Tag = ({
  children,
  className,
  type,
  filter,
  disabled,
  listItem,
  ...other
}) => {
  const tagClass = `${prefix}--tag--${type}`;
  const tagClasses = classNames(`${prefix}--tag`, tagClass, className, {
    [`${prefix}--tag--disabled`]: disabled,
    [`${prefix}--tag--filter`]: filter,
  });
  return filter ? (
    <span
      className={tagClasses}
      title="Clear filter"
      role={listItem ? 'listitem' : undefined}
      tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      {...other}>
      {children !== null && children !== undefined ? children : TYPES[type]}
      <Close16 aria-label="Clear filter" />
    </span>
  ) : (
    <span role={listItem && 'listitem'} className={tagClasses} {...other}>
      {children !== null && children !== undefined ? children : TYPES[type]}
    </span>
  );
};

Tag.propTypes = {
  /**
   * Provide content to be rendered inside of a <Tag>
   */
  children: PropTypes.node,

  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: PropTypes.string,

  /**
   * Specify the type of the <Tag>
   */
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,

  /**
   * Specify if the <Tag> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Determine if <Tag> is a filter/chip
   */
  filter: PropTypes.bool,

  /**
   * Adds the role="listitem" attribute to a tag -- for use when tags are rendered in UL
   */
  listItem: PropTypes.bool,
};

export const types = Object.keys(TYPES);
export default Tag;
