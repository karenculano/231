/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import SidePanel from './SidePanel';
import { ModalBody, ModalHeader, ModalFooter } from '../ComposedModal';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextInput from '../TextInput';
import Button from '../Button';
import mdx from './SidePanel.mdx';
import './SidePanel.stories.scss';

export default {
  title: 'Experimental/unstable__SidePanel',
  component: SidePanel,
  parameters: {
    docs: {
      page: mdx,
    },
    layout: 'fullscreen',
  },
  subcomponents: {
    ModalHeader,
    ModalBody,
    ModalFooter,
  },
};

const StoryTemplate = (args) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="side-panel-story--header">Global Header Placeholder</div>
      <div className="side-panel-story--content">
        <Button onClick={() => setOpen(true)}>Launch side panel</Button>
      </div>
      <SidePanel {...args} open={open} onClose={() => setOpen(false)}>
        <ModalHeader
          label="Account resources"
          title="Add a custom domain"
          {...args}
        />
        <ModalBody>
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
        </ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          {...args}
        />
      </SidePanel>
    </>
  );
};

export const SlideOver = {
  parameters: {
    controls: {
      include: ['alignment', 'selectorPageContent', 'size'],
    },
  },
  render: (args) => <StoryTemplate {...args} />,
};

export const SlideIn = {
  parameters: {
    controls: {
      include: ['alignment', 'selectorPageContent ', 'size'],
    },
  },
  argTypes: {
    'selectorPageContent ': {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    'selectorPageContent ': '.side-panel-story--content',
  },
  render: (args) => {
    const { 'selectorPageContent ': selectorPageContent, ...rest } = args;
    return (
      <StoryTemplate selectorPageContent={selectorPageContent} {...rest} />
    );
  },
};

export const Playground = {
  render: (args) => <StoryTemplate {...args} />,
};
