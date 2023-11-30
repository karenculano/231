import React from 'react';
import Button from '../Button';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../CheckboxGroup';
import ComboBox from '../ComboBox';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import Dropdown from '../Dropdown';
import { MultiSelect, FilterableMultiSelect } from '../MultiSelect';
import { NumberInput } from '../NumberInput';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import {
  ClickableTile,
  ExpandableTile,
  SelectableTile,
  Tile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from '../Tile';
import { IconButton } from '../IconButton';
import { ArrowRight, View, FolderOpen, Folders } from '@carbon/icons-react';
import { Slug, SlugContent, SlugActions } from '../Slug';
import './slug-story.scss';

export default {
  title: 'Experimental/unstable__Slug/Examples',
  component: null,
};

const textareaProps = {
  labelText: 'Text Area label',
  className: 'some-class',
  placeholder: 'Placeholder text',
  id: 'test5',
  rows: 4,
};

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input label',
  placeholder: 'Placeholder text',
};

const numberInputProps = {
  className: 'some-class',
  id: 'number-input-1',
  label: 'Number Input',
  min: 0,
  max: 100,
  value: 50,
  step: 10,
  iconDescription: 'Add/decrement number',
};

const items = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

const slug = (
  <Slug className="slug-container">
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <SlugActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View literature</Button>
      </SlugActions>
    </SlugContent>
  </Slug>
);

const slugFunc = (kind) => (
  <Slug kind={kind} className="slug-container">
    <SlugContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <SlugActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View literature</Button>
      </SlugActions>
    </SlugContent>
  </Slug>
);

export const _Checkbox = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <CheckboxGroup
      legendText="Group Label"
      slug={slugFunc()}
      style={{ flex: '1 1 auto' }}>
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-3" />
    </CheckboxGroup>

    <CheckboxGroup legendText="Group Label" style={{ flex: '1 1 auto' }}>
      <Checkbox
        labelText={`Checkbox label`}
        id="checkbox-label-4"
        slug={slugFunc()}
      />
      <Checkbox
        labelText={`Checkbox label`}
        id="checkbox-label-5"
        slug={slugFunc()}
      />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-6" />
    </CheckboxGroup>

    <CheckboxGroup legendText="Group Label" style={{ flex: '1 1 auto' }}>
      <Checkbox
        labelText={`Checkbox label`}
        id="checkbox-label-7"
        slug={slugFunc('inline')}
      />
      <Checkbox
        labelText={`Checkbox label`}
        id="checkbox-label-8"
        slug={slugFunc('inline')}
      />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-9" />
    </CheckboxGroup>
  </div>
);

export const _Combobox = (args) => (
  <div style={{ width: 400 }}>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      titleText="ComboBox title"
      helperText="Combobox helper text"
      slug={slug}
      {...args}
    />
  </div>
);

export const _DatePicker = (args) => (
  <div style={{ width: 400 }}>
    <DatePicker datePickerType="single">
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        size="md"
        id="date-picker"
        slug={slug}
        {...args}
      />
    </DatePicker>
  </div>
);

export const _Dropdown = (args) => (
  <div style={{ width: 400 }}>
    <Dropdown
      id="default"
      titleText="Dropdown title"
      helperText="This is some helper text"
      initialSelectedItem={items[1]}
      label="Option 1"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      slug={slug}
      {...args}
    />
  </div>
);

export const _FilterableMultiselect = (args) => (
  <div style={{ width: 400 }}>
    <FilterableMultiSelect
      label="Multiselect Label"
      id="carbon-multiselect-example"
      titleText="Multiselect title"
      helperText="This is helper text"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      selectionFeedback="top-after-reopen"
      slug={slug}
      {...args}
    />
  </div>
);

export const _Multiselect = (args) => (
  <div style={{ width: 400 }}>
    <MultiSelect
      label="Multiselect Label"
      id="carbon-multiselect-example"
      titleText="Multiselect title"
      helperText="This is helper text"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      selectionFeedback="top-after-reopen"
      slug={slug}
      {...args}
    />
  </div>
);

export const _NumberInput = (args) => (
  <div style={{ width: 400 }}>
    <NumberInput {...numberInputProps} slug={slug} {...args} />
  </div>
);

export const _RadioButton = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <RadioButtonGroup
      slug={slugFunc('default')}
      orientation="vertical"
      legendText="Group label"
      name="radio-button-group"
      defaultSelected="radio-1">
      <RadioButton
        labelText="Radio button label"
        value="radio-1"
        id="radio-1"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-2"
        id="radio-2"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-3"
        id="radio-3"
      />
    </RadioButtonGroup>

    <RadioButtonGroup
      orientation="vertical"
      legendText="Group label"
      name="radio-button-group-2"
      defaultSelected="radio-4">
      <RadioButton
        labelText="Radio button label"
        value="radio-4"
        id="radio-4"
        slug={slugFunc()}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-5"
        id="radio-5"
        slug={slugFunc()}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-6"
        id="radio-6"
      />
    </RadioButtonGroup>

    <RadioButtonGroup
      orientation="vertical"
      legendText="Group label"
      name="radio-button-group-3"
      defaultSelected="radio-7">
      <RadioButton
        labelText="Radio button label"
        value="radio-7"
        id="radio-7"
        slug={slugFunc('inline')}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-8"
        id="radio-8"
        slug={slugFunc('inline')}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-9"
        id="radio-9"
      />
    </RadioButtonGroup>
  </div>
);

export const _Select = (args) => (
  <div style={{ width: 400 }}>
    <Select
      id="select-1"
      labelText="Select an option"
      helperText="Optional helper text"
      slug={slug}
      {...args}>
      <SelectItem value="" text="" />
      <SelectItem
        value="An example option that is really long to show what should be done to handle long text"
        text="An example option that is really long to show what should be done to handle long text"
      />
      <SelectItem value="Option 2" text="Option 2" />
      <SelectItem value="Option 3" text="Option 3" />
      <SelectItem value="Option 4" text="Option 4" />
    </Select>
  </div>
);

export const _TextArea = (args) => (
  <div style={{ width: 400 }}>
    <TextArea {...textareaProps} slug={slug} {...args} />
  </div>
);

export const _TextInput = (args) => (
  <div style={{ width: 400 }}>
    <TextInput {...TextInputProps} slug={slug} {...args} />
  </div>
);

export const _Tile = (args) => (
  <div className="slug-tile-container">
    <Tile slug={slug} id="tile-1" {...args}>
      <h4>Title</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
        consectetur turpis mauris gravida penatibus.
      </p>
      <div className="ai-data">
        <div className="data-container">
          <p>Data Quality</p>
          <h3>85%</h3>
        </div>
        <div className="data-container">
          <p>Label text</p>
          <h3>16%</h3>
        </div>
      </div>
    </Tile>
    <ClickableTile
      href="https://www.carbondesignsystem.com/"
      slug
      id="tile-click"
      renderIcon={ArrowRight}
      {...args}>
      <h4>Title</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
        consectetur turpis mauris gravida penatibus.
      </p>
      <div className="ai-data">
        <div className="data-container">
          <p>Data Quality</p>
          <h3>85%</h3>
        </div>
        <div className="data-container">
          <p>Label text</p>
          <h3>16%</h3>
        </div>
      </div>
    </ClickableTile>
    <SelectableTile
      id="selectable-tile-1"
      name="tiles"
      value="selectable"
      slug={slug}
      {...args}>
      <h4>Title</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
        consectetur turpis mauris gravida penatibus.
      </p>
      <div className="ai-data">
        <div className="data-container">
          <p>Data Quality</p>
          <h3>85%</h3>
        </div>
        <div className="data-container">
          <p>Label text</p>
          <h3>16%</h3>
        </div>
      </div>
    </SelectableTile>
    <ExpandableTile
      id="expandable-tile-1"
      tileCollapsedIconText="Interact to Expand tile"
      tileExpandedIconText="Interact to Collapse tile"
      slug={slug}
      {...args}>
      <TileAboveTheFoldContent>
        <h4>Title</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
          consectetur turpis mauris gravida penatibus.
        </p>
        <div className="ai-data">
          <div className="data-container">
            <p>Data Quality</p>
            <h3>85%</h3>
          </div>
          <div className="data-container">
            <p>Label text</p>
            <h3>16%</h3>
          </div>
        </div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <h6>Expanded Section</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur. Posuere duis fermentum sit at
          consectetur turpis mauris.
        </p>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  </div>
);

_Tile.argTypes = {
  hasRoundedCorners: {
    control: {
      type: 'boolean',
    },
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
  slug: {
    table: {
      disable: true,
    },
  },
};
