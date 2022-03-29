/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../AspectRatio-story.scss';

import React from 'react';
import { Grid, Column } from '../../Grid';
import { AspectRatio } from '../';

export default {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  decorators: [
    (Story) => (
      <div className="aspect-ratio-story">
        <Story />
      </div>
    ),
  ],
};

export const AspectRatioStory = () => {
  return (
    <Grid>
      <Column sm={1} md={2} lg={4}>
        <AspectRatio ratio="1x1">Content</AspectRatio>
      </Column>
      <Column sm={1} md={2} lg={4}>
        <AspectRatio ratio="1x1">Content</AspectRatio>
      </Column>
      <Column sm={1} md={2} lg={4}>
        <AspectRatio ratio="1x1">Content</AspectRatio>
      </Column>
      <Column sm={1} md={2} lg={4}>
        <AspectRatio ratio="1x1">Content</AspectRatio>
      </Column>
    </Grid>
  );
};

AspectRatioStory.storyName = 'AspectRatio';

export const Playground = {
  argTypes: {
    as: {
      control: {
        type: null,
      },
    },
    children: {
      control: {
        type: null,
      },
    },
    className: {
      control: {
        type: null,
      },
    },
    ratio: {
      control: {
        type: 'select',
      },
      defaultValue: '1x1',
      options: ['16x9', '9x16', '2x1', '1x2', '4x3', '3x4', '1x1'],
    },
  },
  render: ({ ratio }) => {
    return (
      <Grid>
        <Column sm={1} md={2} lg={4}>
          <AspectRatio ratio={ratio}>Content</AspectRatio>
        </Column>
        <Column sm={1} md={2} lg={4}>
          <AspectRatio ratio={ratio}>Content</AspectRatio>
        </Column>
        <Column sm={1} md={2} lg={4}>
          <AspectRatio ratio={ratio}>Content</AspectRatio>
        </Column>
        <Column sm={1} md={2} lg={4}>
          <AspectRatio ratio={ratio}>Content</AspectRatio>
        </Column>
      </Grid>
    );
  },
};
