/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const colors = require('./carbon-colors');
const elements = require('./carbon-elements');
const grid = require('./carbon-grid');
const iconsReact = require('./carbon-icons-react');
const layout = require('./carbon-layout');
const motion = require('./carbon-motion');
const type = require('./carbon-type');

const supportedPackages = new Map([
  [colors.name, colors.migrations],
  [elements.name, elements.migrations],
  [grid.name, grid.migrations],
  [iconsReact.name, iconsReact.migrations],
  [layout.name, layout.migrations],
  [motion.name, motion.migrations],
  [type.name, type.migrations],
]);

module.exports = {
  supportedPackages,
};
