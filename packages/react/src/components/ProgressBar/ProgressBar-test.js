/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ProgressBar from './ProgressBar';
import { render } from '@testing-library/react';

const prefix = 'cds';

describe('ProgressBar', () => {
  const props = {
    label: 'ProgressBar label',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = render(<ProgressBar {...props} />);
  });

  describe('renders as expected', () => {
    it('progress bar and label ids match', () => {
      const bar = wrapper.getByRole('progressbar');
      const label = wrapper.container.querySelector(
        `.${prefix}--progress-bar__label`
      );
      expect(bar).toHaveAttribute('aria-labelledby', label.id);
    });

    it('renders helper text when passed', () => {
      const text = 'ProgressBar helper text';
      wrapper.rerender(<ProgressBar {...props} helperText={text} />);
      const helperTextNode = wrapper.container.querySelector(
        `.${prefix}--progress-bar__helper-text`
      );
      const helperText = helperTextNode.firstChild.textContent;

      expect(helperText).toBe(text);
    });

    it('still renders accessible label when hideLabel is passed', () => {
      wrapper.rerender(<ProgressBar {...props} hideLabel />);
      const label = wrapper.container.querySelector(
        `.${prefix}--progress-bar__label`
      );

      expect(label).toHaveTextContent(props.label);
      expect(label).toHaveClass(`${prefix}--visually-hidden`);
    });

    it('renders as indeterminate when no value is passed', () => {
      const bar = wrapper.getByRole('progressbar');

      expect(bar).not.toHaveAttribute('aria-valuenow');
      expect(bar).not.toHaveAttribute('aria-valuemax');
      expect(bar).not.toHaveAttribute('aria-valuemin');
      expect(
        wrapper.container.querySelector(`.${prefix}--progress-bar`)
      ).toHaveClass(`${prefix}--progress-bar--indeterminate`);
    });

    it('sets aria-valuenow correctly', () => {
      const value = 42;
      wrapper.rerender(<ProgressBar {...props} value={value} />);

      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        value.toString()
      );
    });

    it('sets aria-valuemax correctly', () => {
      const max = 84;
      wrapper.rerender(<ProgressBar {...props} value={0} max={max} />);

      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuemax',
        max.toString()
      );
    });

    it('supports additional css class names', () => {
      const className = 'some-class';
      wrapper.rerender(<ProgressBar {...props} className={className} />);

      expect(
        wrapper.container.querySelector(`.${prefix}--progress-bar`)
      ).toHaveClass(className);
    });

    it('supports finished status', () => {
      wrapper.rerender(<ProgressBar {...props} status="finished" />);

      expect(
        wrapper.container.querySelector(`.${prefix}--progress-bar`)
      ).toHaveClass(`${prefix}--progress-bar--finished`);

      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '100'
      );
    });

    it('supports error status', () => {
      wrapper.rerender(<ProgressBar {...props} status="error" />);

      expect(
        wrapper.container.querySelector(`.${prefix}--progress-bar`)
      ).toHaveClass(`${prefix}--progress-bar--error`);

      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '0'
      );

      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });
  });

  describe('behaves as expected', () => {
    it('limits value to max', () => {
      const value = 200;
      const max = 50;
      wrapper.rerender(<ProgressBar {...props} value={value} max={max} />);

      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        max.toString()
      );
    });

    it('ensures a positive value', () => {
      const value = -10;
      wrapper.rerender(<ProgressBar {...props} value={value} />);

      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '0'
      );
    });
  });
});
