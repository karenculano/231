/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import TextInput from '../TextInput';
import TextInputSkeleton from '../TextInput/TextInput.Skeleton';
import FluidForm from '../FluidForm/FluidForm';

const types = {
  None: '',
  'Text (text)': 'text',
  'For email (email)': 'email',
  'For password (password)': 'password',
};

const sizes = {
  'Extra large size (xl)': 'xl',
  'Default size': undefined,
  'Small size (sm)': 'sm',
};

const ControlledPasswordInputApp = React.forwardRef(
  function ControlledPasswordInputApp(props, ref) {
    const [type, setType] = useState('password');
    const togglePasswordVisibility = () => {
      setType(type === 'password' ? 'text' : 'password');
    };
    return (
      <>
        <TextInput.ControlledPasswordInput
          type={type}
          togglePasswordVisibility={togglePasswordVisibility}
          ref={ref}
          {...props}
        />
        <button onClick={() => setType('text')}>Show password</button>
        <button onClick={() => setType('password')}>Hide password</button>
      </>
    );
  }
);

const props = {
  TextInputProps: () => ({
    className: 'some-class',
    id: 'test2',
    defaultValue: text(
      'Default value (defaultValue)',
      'This is not a default value'
    ),
    size: select('Field size (size)', sizes, undefined) || undefined,
    labelText: text('Label text (labelText)', 'Text input label'),
    placeholder: text('Placeholder text (placeholder)', 'Placeholder text'),
    light: boolean('Light variant (light)', false),
    disabled: boolean('Disabled (disabled)', false),
    hideLabel: boolean('No label (hideLabel)', false),
    invalid: boolean('Show form validation UI (invalid)', false),
    invalidText: text(
      'Form validation UI content (invalidText)',
      'A valid value is required'
    ),
    helperText: text('Helper text (helperText)', 'Optional help text'),
    inline: boolean('Inline variant (inline)', false),
    onClick: action('onClick'),
    onChange: action('onChange'),
  }),
  PasswordInputProps: () => ({
    tooltipPosition: select(
      'Tooltip position (tooltipPosition)',
      ['top', 'right', 'bottom', 'left'],
      'bottom'
    ),
    tooltipAlignment: select(
      'Tooltip alignment (tooltipAlignment)',
      ['start', 'center', 'end'],
      'center'
    ),
    hidePasswordLabel: text(
      '"Hide password" tooltip label for password visibility toggle (hidePasswordLabel)',
      'Hide password'
    ),
    showPasswordLabel: text(
      '"Show password" tooltip label for password visibility toggle (showPasswordLabel)',
      'Show password'
    ),
  }),
};

TextInput.displayName = 'TextInput';

storiesOf('TextInput', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <TextInput
        type={select('Form control type (type)', types, 'text')}
        {...props.TextInputProps()}
      />
    ),
    {
      info: {
        text: `
            Text fields enable the user to interact with and input data. A single line
            field is used when the input anticipated by the user is a single line of
            text as opposed to a paragraph.
            The default type is 'text' and its value can be either 'string' or 'number'.
          `,
      },
    }
  )
  .add(
    'Fluid',
    () => (
      <FluidForm>
        <TextInput
          type={select('Form control type (type)', types, 'text')}
          {...props.TextInputProps()}
        />
      </FluidForm>
    ),
    {
      info: {
        text: `
            Text fields enable the user to interact with and input data. A single line
            field is used when the input anticipated by the user is a single line of
            text as opposed to a paragraph.
            The default type is 'text' and its value can be either 'string' or 'number'.
          `,
      },
    }
  )
  .add(
    'Toggle password visibility',
    () => {
      return (
        <TextInput.PasswordInput
          {...props.TextInputProps()}
          {...props.PasswordInputProps()}
        />
      );
    },
    {
      info: {
        text: `
          Text field with password visibility toggle.
        `,
      },
    }
  )
  .add(
    'Fully controlled toggle password visibility',
    () => {
      ControlledPasswordInputApp.__docgenInfo = {
        ...TextInput.PasswordInput.__docgenInfo,
        props: {
          ...TextInput.PasswordInput.__docgenInfo.props,
        },
      };

      return (
        <ControlledPasswordInputApp
          {...props.TextInputProps()}
          {...props.PasswordInputProps()}
        />
      );
    },
    {
      info: {
        text: `
        Fully controlled text field with password visibility toggle.
      `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div
        aria-label="loading text input"
        aria-live="assertive"
        role="status"
        tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      >
        <TextInputSkeleton />
        <br />
        <TextInputSkeleton hideLabel />
      </div>
    ),
    {
      info: {
        text: `
            Placeholder skeleton state to use when content is loading.
            `,
      },
    }
  );
