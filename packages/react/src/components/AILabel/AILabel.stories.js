/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { AILabel, AILabelContent, AILabelActions } from '.';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import Button from '../Button';
import { IconButton } from '../IconButton';
import mdx from './AILabel.mdx';
import './ailabel-story.scss';

export default {
  title: 'Components/AILabel',
  component: AILabel,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const aiContent = (
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
);

export const Default = () => (
  <>
    <div className="slug-container slug-container-example">
      <AILabel autoAlign size="mini">
        <AILabelContent>{aiContent}</AILabelContent>
      </AILabel>
      <AILabel autoAlign size="2xs">
        <AILabelContent>{aiContent}</AILabelContent>
      </AILabel>
      <AILabel autoAlign size="xs">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
      <AILabel autoAlign size="sm">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
      <AILabel autoAlign size="md">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
      <AILabel autoAlign size="lg">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
      <AILabel autoAlign size="xl">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
    </div>
    <div className="slug-container-example slug-container">
      <AILabel autoAlign kind="inline" size="sm">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
      <AILabel autoAlign kind="inline" size="md">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
      <AILabel autoAlign kind="inline" size="lg">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
    </div>
    <div className="slug-container-example slug-container">
      <AILabel autoAlign kind="inline" size="sm" aiTextLabel="Text goes here">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
      <AILabel autoAlign kind="inline" size="md" aiTextLabel="Text goes here">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
      <AILabel autoAlign kind="inline" size="lg" aiTextLabel="Text goes here">
        <AILabelContent>
          {aiContent}
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
    </div>
  </>
);

export const Callout = (args) => {
  const { showSlugActions = true } = args;

  return (
    <div className="slug-container-example slug-container centered">
      <AILabel autoAlign={false} defaultOpen {...args}>
        <AILabelContent>
          {' '}
          <div>
            <p className="secondary">AI Explained</p>
            <h1>84%</h1>
            <p className="secondary bold">Confidence score</p>
            <p className="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p className="secondary">Model type</p>
            <p className="bold">Foundation model</p>
          </div>
          {showSlugActions && (
            <AILabelActions>
              <IconButton kind="ghost" label="View">
                <View />
              </IconButton>
              <IconButton kind="ghost" label="Open Folder">
                <FolderOpen />
              </IconButton>
              <IconButton kind="ghost" label="Folders">
                <Folders />
              </IconButton>
              <Button>View details</Button>
            </AILabelActions>
          )}
        </AILabelContent>
      </AILabel>
    </div>
  );
};

Callout.argTypes = {
  showSlugActions: {
    control: {
      type: 'boolean',
    },
    description: 'Playground only - toggle to show the callout toolbar',
  },
  align: {
    options: [
      'top',
      'top-start',
      'top-end',

      'bottom',
      'bottom-start',
      'bottom-end',

      'left',
      'left-end',
      'left-start',

      'right',
      'right-end',
      'right-start',
    ],
    control: { type: 'select' },
  },
  revertActive: {
    table: {
      disable: true,
    },
  },
  AILabelContent: {
    table: {
      disable: true,
    },
  },
  aiText: {
    table: {
      disable: true,
    },
  },
  aiTextLabel: {
    table: {
      disable: true,
    },
  },
  autoAlign: {
    table: {
      disable: true,
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
  kind: {
    table: {
      disable: true,
    },
  },
  onRevertClick: {
    table: {
      disable: true,
    },
  },
  revertLabel: {
    table: {
      disable: true,
    },
  },
  size: {
    table: {
      disable: true,
    },
  },
  slugContent: {
    table: {
      disable: true,
    },
  },
  slugLabel: {
    table: {
      disable: true,
    },
  },
};

export const Playground = (args) => {
  const { showSlugActions = true } = args;

  const renderedContent = (
    <>
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
      {showSlugActions && (
        <AILabelActions>
          <IconButton kind="ghost" label="View">
            <View />
          </IconButton>
          <IconButton kind="ghost" label="Open Folder">
            <FolderOpen />
          </IconButton>
          <IconButton kind="ghost" label="Folders">
            <Folders />
          </IconButton>
          <Button>View details</Button>
        </AILabelActions>
      )}
    </>
  );

  return (
    <>
      <div className="slug-container slug-container-example">
        <AILabel {...args}>
          <AILabelContent>{renderedContent}</AILabelContent>
        </AILabel>
      </div>
      <Button>Test</Button>
      <Button kind="danger">Test</Button>
    </>
  );
};

Playground.argTypes = {
  showSlugActions: {
    control: {
      type: 'boolean',
    },
    description: 'Playground only - toggle to show the callout toolbar',
  },
  align: {
    options: [
      'top',
      'top-start',
      'top-end',

      'bottom',
      'bottom-start',
      'bottom-end',

      'left',
      'left-end',
      'left-start',

      'right',
      'right-end',
      'right-start',
    ],
    control: { type: 'select' },
  },
  AILabelContent: {
    table: {
      disable: true,
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
  onRevertClick: {
    table: {
      disable: true,
    },
  },
  revertActive: {
    table: {
      disable: true,
    },
  },
  revertLabel: {
    table: {
      disable: true,
    },
  },
};
