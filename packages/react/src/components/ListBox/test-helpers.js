/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const prefix = 'cds';
import userEvent from '@testing-library/user-event';

// Finding nodes in a ListBox
export const findListBoxNode = () => {
  return document.querySelector('.cds--list-box');
};

export const findMenuNode = () => {
  return document.querySelector(`.${prefix}--list-box__menu`);
};

export const findMenuItemNode = (index) => {
  const nodes = document.querySelectorAll(`.${prefix}--list-box__menu-item`);
  if (nodes[index]) {
    return nodes[index];
  }
  throw new Error(`Unable to find node at index: ${index} in: ${nodes}`);
};

export const findMenuIconNode = () => {
  return document.querySelector(`.${prefix}--list-box__menu-icon`);
};

export const findFieldNode = () => {
  return document.querySelector(`.${prefix}--list-box__field`);
};

export const findComboboxNode = () => {
  return document.querySelector(`.${prefix}--list-box[role="combobox"]`);
};

export const findPopupNode = () => {
  return document.querySelector('[aria-haspopup="listbox"]');
};

// Actions
export const openMenu = () => {
  userEvent.click(findFieldNode());
};

// Common assertions, useful for validating a11y props are set when needed
export const assertMenuOpen = (mockProps) => {
  expect(findMenuNode().childNodes.length).toBe(mockProps.items.length);

  expect(findMenuIconNode()).toHaveClass(
    `${prefix}--list-box__menu-icon--open`
  );

  expect(findPopupNode()).toHaveAttribute('aria-expanded', 'true');
};

export const assertMenuClosed = () => {
  expect(findMenuIconNode()).toHaveClass(`${prefix}--list-box__menu-icon`);

  expect(findMenuIconNode()).not.toHaveClass(
    `${prefix}--list-box__menu-icon--open`
  );
  expect(findPopupNode()).toHaveAttribute('aria-expanded', 'false');
};

/**
 * `GenericItem` corresponds to an item in a collection that is passed to
 * MultiSelect that is in a predictable shape and works with the default
 * `itemToString` out of the box.
 * @param {number} index
 *
 * @returns {{id: string, label: string, value: string}}
 */
export const generateGenericItem = (index) => ({
  id: `id-${index}`,
  label: `Item ${index}`,
  value: index,
});

/**
 * `CustomItem` corresponds to a potentially different item structure that
 * might be passed into MultiSelect that we would need to supply a custom
 * `itemToString` method for
 * @param {number} index
 *
 * @returns {{field: string, value: string}}
 */
export const generateCustomItem = (index) => ({
  field: `Item ${index}`,
  value: `Custom value ${index}`,
});

/**
 * Returns an Array filled by values generated by the `generator` function
 * @param {number} amount Number of elements to generate
 *
 * @returns {Array<object>} Array of objects generated by `generator`
 */
export const generateItems = (amount, generator) =>
  Array(amount)
    .fill(null)
    .map((_, i) => generator(i));

export const customItemToString = ({ field }) => field;
