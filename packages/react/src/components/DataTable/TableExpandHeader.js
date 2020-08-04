/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import requiredIfGivenPropIsTruthy from '../../prop-types/requiredIfGivenPropIsTruthy';
import React from 'react';
import { ChevronRight16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableExpandHeader = ({
  ariaLabel,
  className: headerClassName,
  enableExpando,
  isExpanded,
  onExpand,
  expandIconDescription,
  children,
  ...rest
}) => {
  const className = cx(`${prefix}--table-expand`, headerClassName);
  const previousValue = isExpanded ? 'collapsed' : undefined;

  return (
    <th
      scope="col"
      className={className}
      data-previous-value={previousValue}
      {...rest}>
      {!enableExpando ? null : (
        <button
          className={`${prefix}--table-expand__button`}
          onClick={onExpand}
          title={expandIconDescription}
          aria-label={ariaLabel}>
          <ChevronRight16
            className={`${prefix}--table-expand__svg`}
            aria-label={expandIconDescription}
          />
        </button>
      )}
      {children}
    </th>
  );
};

TableExpandHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  /**
   * Specify whether an expand all button should be displayed
   */
  enableExpando: PropTypes.bool,

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: requiredIfGivenPropIsTruthy('enableExpando', PropTypes.string),

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExapndedRow` work together
   */
  isExpanded: requiredIfGivenPropIsTruthy('enableExpando', PropTypes.bool),

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: requiredIfGivenPropIsTruthy('enableExpando', PropTypes.func),

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription: PropTypes.string,
};

export default TableExpandHeader;
