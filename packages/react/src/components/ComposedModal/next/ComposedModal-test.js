/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { ModalHeader } from '../ComposedModal';

describe('ModalHeader', () => {
  afterEach(cleanup);

  it('should render title if has title text', () => {
    render(<ModalHeader title="Carbon" />);

    expect(screen.getByTitle('Carbon')).toHaveDisplayValue('Carbon');
  });

  it('should label if has label text', () => {
    render(<ModalHeader label="Carbon label" />);

    expect(screen.getByLabelText('Carbon label')).toHaveDisplayValue(
      'Carbon Label'
    );
  });
});

// TODO: write tests for composed modal
// TODO: write tests for modal body
// TODO: write tests for modal footer
