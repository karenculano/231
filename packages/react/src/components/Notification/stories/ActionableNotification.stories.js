/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ActionableNotification } from '../../Notification';
import { Theme } from '../../Theme';
import { action } from '@storybook/addon-actions';
import mdx from '../Notification.mdx';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Notifications/Actionable',
  component: ActionableNotification,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    kind: 'error',
    lowContrast: false,
    hideCloseButton: false,
    ariaLabel: 'closes notification',
    statusIconDescription: 'notification',
    onClose: action('onClose'),
    onCloseButtonClick: action('onCloseButtonClick'),
  },
};

export const Default = () => (
  <Theme theme="g100">
    <ActionableNotification
      lowContrast
      title="Notification title"
      subtitle="Subtitle text goes here"
      closeOnEscape
      inline={false}
      actionButtonLabel="Action"
    />
  </Theme>
);

export const Playground = (args) => <ActionableNotification {...args} />;

Playground.argTypes = {
  ariaLabel: {
    table: {
      disable: true,
    },
  },
  onActionButtonClick: {
    action: 'clicked',
  },
  onClose: {
    action: 'clicked',
  },
  onCloseButtonClick: {
    action: 'clicked',
  },
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
};
Playground.args = {
  actionButtonLabel: 'Action',
  inline: false,
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};
