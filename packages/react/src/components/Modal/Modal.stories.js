/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Modal from './Modal';
import Button from '../Button';
import Select from '../Select';
import MultiSelect from '../MultiSelect';
import Dropdown from '../Dropdown';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import mdx from './Modal.mdx';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
} from '../StructuredList';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <Modal
      open
      modalHeading="Add a custom domain"
      modalLabel="Account resources"
      primaryButtonText="Add"
      secondaryButtonText="Cancel">
      <p style={{ marginBottom: '1rem' }}>
        Custom domains direct requests for your apps in this Cloud Foundry
        organization to a URL that you own. A custom domain can be a shared
        domain, a shared subdomain, or a shared domain and host.
      </p>
      <TextInput
        data-modal-primary-focus
        id="text-input-1"
        labelText="Domain name"
        placeholder="e.g. github.com"
        style={{ marginBottom: '1rem' }}
      />
      <Select id="select-1" defaultValue="us-south" labelText="Region">
        <SelectItem value="us-south" text="US South" />
        <SelectItem value="us-east" text="US East" />
      </Select>
      <Dropdown
        id="drop"
        label="Dropdown"
        titleText="Dropdown"
        items={[
          { id: 'one', label: 'one', name: 'one' },
          { id: 'two', label: 'two', name: 'two' },
        ]}
      />
      <MultiSelect
        id="test"
        label="Multiselect"
        titleText="Multiselect"
        items={[
          {
            id: 'downshift-1-item-0',
            text: 'Option 1',
          },
          {
            id: 'downshift-1-item-1',
            text: 'Option 2',
          },
        ]}
        itemToString={(item) => (item ? item.text : '')}
      />
    </Modal>
  );
};

export const FullWidth = () => {
  return (
    <Modal
      open
      isFullWidth
      modalHeading="Full Width Modal"
      modalLabel="An example of a modal with no padding"
      primaryButtonText="Add"
      secondaryButtonText="Cancel">
      <StructuredListWrapper>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head noWrap>
              Column A
            </StructuredListCell>
            <StructuredListCell head noWrap>
              Column B
            </StructuredListCell>
            <StructuredListCell head noWrap>
              Column C
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell noWrap>Row 1</StructuredListCell>
            <StructuredListCell>Row 1</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Row 2</StructuredListCell>
            <StructuredListCell>Row 2</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Row 3</StructuredListCell>
            <StructuredListCell>Row 3</StructuredListCell>
            <StructuredListCell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor interdum.
            </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredListWrapper>
    </Modal>
  );
};

export const DangerModal = () => {
  return (
    <Modal
      open
      danger
      modalHeading="Are you sure you want to delete this custom domain?"
      modalLabel="Account resources"
      primaryButtonText="Delete"
      secondaryButtonText="Cancel"
    />
  );
};

const buttons = {
  'One (1)': '1',
  'Two (2)': '2',
  'Three (3)': '3',
};
const modalFooter = (numberOfButtons) => {
  const secondaryButtons = () => {
    switch (numberOfButtons) {
      case '1':
        return {
          secondaryButtons: [],
        };
      case '2':
        return {
          secondaryButtonText: 'Cancel',
        };
      case '3':
        return {
          secondaryButtons: [
            {
              buttonText: 'Keep both',
              onClick: action('onClick'),
            },
            {
              buttonText: 'Rename',
              onClick: action('onClick'),
            },
          ],
        };
      default:
        return null;
    }
  };
  return {
    ...secondaryButtons(),
  };
};

export const Playground = ({ numberOfButtons, ...args }) => {
  return (
    <Modal
      open
      modalHeading="Add a custom domain"
      primaryButtonText="Add"
      secondaryButtonText="Cancel"
      aria-label="Modal content"
      {...modalFooter(numberOfButtons)}
      {...args}>
      <p style={{ marginBottom: '1rem' }}>
        Custom domains direct requests for your apps in this Cloud Foundry
        organization to a URL that you own. A custom domain can be a shared
        domain, a shared subdomain, or a shared domain and host.
      </p>
      <TextInput
        data-modal-primary-focus
        id="text-input-1"
        labelText="Domain name"
        placeholder="e.g. github.com"
        style={{ marginBottom: '1rem' }}
      />
      <Select id="select-1" defaultValue="us-south" labelText="Region">
        <SelectItem value="us-south" text="US South" />
        <SelectItem value="us-east" text="US East" />
      </Select>
      {args.hasScrollingContent && (
        <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <h3>Lorem ipsum</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            accumsan augue. Phasellus consequat augue vitae tellus tincidunt
            posuere. Curabitur justo urna, consectetur vel elit iaculis,
            ultrices condimentum risus. Nulla facilisi. Etiam venenatis molestie
            tellus. Quisque consectetur non risus eu rutrum.{' '}
          </p>
        </>
      )}
    </Modal>
  );
};

Playground.args = {
  numberOfButtons: 'Two (2)',
};

Playground.argTypes = {
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
  id: {
    table: {
      disable: true,
    },
  },
  modalHeading: {
    control: 'text',
  },
  modalLabel: {
    control: 'text',
  },
  numberOfButtons: {
    description: 'Count of Footer Buttons',
    options: Object.keys(buttons),
    mapping: buttons,
    control: {
      type: 'inline-radio',
      labels: Object.keys(buttons),
    },
  },
  onKeyDown: {
    action: 'onKeyDown',
  },
  onRequestClose: {
    action: 'onRequestClose',
  },
  onRequestSubmit: {
    action: 'onRequestSubmit',
  },
  onSecondarySubmit: {
    action: 'onSecondarySubmit',
    table: {
      disable: true,
    },
  },
  primaryButtonText: {
    control: 'text',
  },
  secondaryButtons: {
    table: {
      disable: true,
    },
  },
  secondaryButtonText: {
    control: 'text',
    table: {
      disable: true,
    },
  },
  selectorPrimaryFocus: {
    table: {
      disable: true,
    },
  },
  selectorsFloatingMenus: {
    table: {
      disable: true,
    },
  },
};

export const WithStateManager = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Modal
        modalHeading="Add a custom domain"
        modalLabel="Account resources"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        open={open}
        onRequestClose={() => setOpen(false)}>
        <p style={{ marginBottom: '1rem' }}>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
          placeholder="e.g. github.com"
          style={{ marginBottom: '1rem' }}
        />
        <Select id="select-1" defaultValue="us-south" labelText="Region">
          <SelectItem value="us-south" text="US South" />
          <SelectItem value="us-east" text="US East" />
        </Select>
      </Modal>
      <Button onClick={() => setOpen(true)}>Launch modal</Button>
    </div>
  );
};

export const Nested = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <div>
      <Modal
        id="modal1"
        modalHeading="Modal One"
        passiveModal
        open={open1}
        onRequestClose={() => setOpen1(false)}>
        <Modal
          id="modal2"
          modalHeading="Modal Two"
          passiveModal
          open={open2}
          onRequestClose={() => setOpen2(false)}>
          <p>The second modal</p>
        </Modal>
        <Button onClick={() => setOpen2(true)}>Launch nested modal</Button>
      </Modal>
      <Button onClick={() => setOpen1(true)}>Launch modal</Button>
    </div>
  );
};

export const PassiveModal = () => {
  return (
    <Modal
      open
      passiveModal
      modalHeading="You have been successfully signed out"></Modal>
  );
};
