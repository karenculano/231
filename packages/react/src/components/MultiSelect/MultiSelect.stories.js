/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import MultiSelect from '.';
import FilterableMultiSelect from './FilterableMultiSelect';
import { Layer } from '../Layer';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  subcomponents: {
    'MultiSelect.Filterable': MultiSelect.Filterable,
  },
  argTypes: {
    invalid: {
      control: 'boolean',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    type: {
      options: ['default', 'inline'],
      control: { type: 'select' },
    },
    warn: {
      control: 'boolean',
    },
    warnText: { control: 'text' },
  },
};

const items = [
  {
    id: 'downshift-1-item-0',
    text: 'Option 1',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'downshift-1-item-3',
    text: 'Option 4',
  },
  {
    id: 'downshift-1-item-4',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
  {
    id: 'downshift-1-item-5',
    text: 'Option 5',
  },
];

export const Default = (args) => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

export const WithInitialSelectedItems = (args) => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        id="carbon-multiselect-example-2"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        initialSelectedItems={[items[0], items[1]]}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

export const _Filterable = (args) => {
  return (
    <div style={{ width: 300 }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

export const WithLayer = (args) => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="First Layer"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
      <Layer>
        <MultiSelect
          label="Second Layer"
          id="carbon-multiselect-example"
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...args}
        />
        <Layer>
          <MultiSelect
            label="Third Layer"
            id="carbon-multiselect-example"
            titleText="Multiselect title"
            helperText="This is helper text"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            selectionFeedback="top-after-reopen"
            {...args}
          />
        </Layer>
      </Layer>
    </div>
  );
};

export const _FilterableWithLayer = (args) => {
  return (
    <div style={{ width: 300 }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
        titleText="First Layer"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
      <Layer>
        <FilterableMultiSelect
          id="carbon-multiselect-example-3"
          titleText="Second Layer"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...args}
        />
        <Layer>
          <FilterableMultiSelect
            id="carbon-multiselect-example-3"
            titleText="Third Layer"
            helperText="This is helper text"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            selectionFeedback="top-after-reopen"
            {...args}
          />
        </Layer>
      </Layer>
    </div>
  );
};
