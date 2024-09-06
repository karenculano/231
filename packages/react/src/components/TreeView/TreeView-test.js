/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TreeView from './TreeView';
import TreeNode from './TreeNode';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, within } from '@testing-library/react';

const prefix = 'cds';

describe('TreeView', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      render(<TreeView data-testid="test-id" label="Tree" />);

      expect(screen.getByRole('tree')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should respect active prop', () => {
      render(
        <TreeView active="Node 1" label="Tree">
          <TreeNode data-testid="Node 1" id="Node 1" label="Node 1" />
          <TreeNode id="Node 2" label="Node 2" />
        </TreeView>
      );

      const node = screen.getByTestId('Node 1');

      expect(node).toHaveClass(`${prefix}--tree-node--active`);
    });

    it('should render children as expected', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode isExpanded={true} data-testid="Node 1" label="Node 1">
            <TreeNode data-testid="Node 2" label="Node 2" />
          </TreeNode>
        </TreeView>
      );

      const nodeParent = screen.getByTestId('Node 1');
      const nodeChild = screen.getByTestId('Node 2');

      expect(nodeParent).toHaveClass(`${prefix}--tree-parent-node`);
      expect(nodeChild).toHaveClass(`${prefix}--tree-leaf-node`);

      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
    });

    it('should render children as expected when using dot syntax', () => {
      render(
        <TreeView label="Tree View">
          <TreeView.TreeNode
            isExpanded={true}
            data-testid="Node 1"
            label="Node 1">
            <TreeView.TreeNode data-testid="Node 2" label="Node 2" />
          </TreeView.TreeNode>
        </TreeView>
      );

      const nodeParent = screen.getByTestId('Node 1');
      const nodeChild = screen.getByTestId('Node 2');

      expect(nodeParent).toHaveClass(`${prefix}--tree-parent-node`);
      expect(nodeChild).toHaveClass(`${prefix}--tree-leaf-node`);

      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <TreeView className="custom-class" label="Tree" />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const ul = container?.getElementsByTagName('ul')[0];

      expect(ul).toHaveClass('custom-class');
    });

    it('should respect hideLabel prop', () => {
      render(
        <TreeView id="Tree" label="Tree View" hideLabel>
          <TreeNode id="Node 1" data-testid="Node 1" label="Node 1" />
        </TreeView>
      );

      expect(
        screen.queryByText('Tree View', { selector: 'label' })
      ).not.toBeInTheDocument();
    });

    it('should respect label prop', () => {
      render(
        <TreeView label="Tree View" selected={['Node 1']}>
          <TreeNode id="Node 1" data-testid="Node 1" label="Node 1" />
        </TreeView>
      );

      expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
    });

    it('should respect multiselect prop', async () => {
      const user = userEvent.setup();
      render(
        <TreeView multiselect label="Tree">
          <TreeNode data-testid="Node 1" label="Node 1" />
          <TreeNode data-testid="Node 2" label="Node 2" />
        </TreeView>
      );

      const lists = screen.getAllByRole('treeitem');

      await user.keyboard('[ControlLeft>]');
      await user.click(lists[0]);
      await user.click(lists[1]);

      expect(lists[0]).toHaveAttribute('aria-selected', 'true');
      expect(lists[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('should respect onSelect prop', () => {
      const onSelectSpy = jest.fn();

      render(
        <TreeView label="Tree View">
          <TreeNode
            onSelect={onSelectSpy}
            id="Node 1"
            data-testid="Node 1"
            label="Node 1"
          />
        </TreeView>
      );

      fireEvent.click(screen.getByTestId('Node 1'));

      expect(onSelectSpy).toHaveBeenCalled();
    });

    it('should respect selected prop', () => {
      render(
        <TreeView label="Tree View" selected={['Node 1']}>
          <TreeNode id="Node 1" data-testid="Node 1" label="Node 1" />
        </TreeView>
      );

      expect(screen.getByRole('treeitem', { name: 'Node 1' })).toHaveClass(
        `${prefix}--tree-node--selected`
      );
    });

    it('should respect size prop', () => {
      render(<TreeView size="xs" label="Tree" />);

      const tree = screen.getByRole('tree');

      expect(tree).toHaveClass(`${prefix}--tree--xs`);
    });
  });

  describe('behaves as expected', () => {
    it('should render tree with expanded node', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode data-testid="Node 1" label="Node 1" isExpanded={true}>
            <TreeNode data-testid="Node 2" label="Node 2" />
          </TreeNode>
        </TreeView>
      );

      const nodeParent = screen.getByTestId('Node 1');
      // eslint-disable-next-line testing-library/no-node-access
      const nodeChild = nodeParent?.querySelector('div > span');

      expect(nodeChild).toHaveClass(`${prefix}--tree-parent-node__toggle`);
      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeParent).getByText('Node 2')).toBeInTheDocument();
    });

    it('should render tree with disabled nodes', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode label="Node 1" data-testid="Node 1" />
          <TreeNode
            data-testid="Node 2"
            label="Node 2"
            disabled={true}
            isExpanded={true}>
            <TreeNode isExpanded={true} data-testid="Node 3" label="Node 3" />
          </TreeNode>
        </TreeView>
      );

      const nodeChild = screen.getByTestId('Node 2');

      expect(nodeChild).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render tree with icons', () => {
      const CustomIcon = jest.fn(() => {
        return <svg data-testid="test-icon" />;
      });

      render(
        <TreeView label="Tree View">
          <TreeNode
            renderIcon={CustomIcon}
            data-testid="Node 1"
            label="Node 1"
          />
        </TreeView>
      );

      expect(screen.getByTestId('Node 1')).toHaveClass(
        `${prefix}--tree-node--with-icon`
      );
    });
  });

  describe('keyboard navigation', () => {
    it('should focus on the first child node when right arrow is pressed on an expanded parent node', async () => {
      const user = userEvent.setup();

      render(
        <TreeView label="Tree View">
          <TreeNode
            data-testid="parent-node"
            label="Parent Node"
            isExpanded={true}>
            <TreeNode data-testid="child-node-1" label="Child Node 1" />
            <TreeNode data-testid="child-node-2" label="Child Node 2" />
          </TreeNode>
        </TreeView>
      );

      const parentNode = screen.getByTestId('parent-node');
      const childNode1 = screen.getByTestId('child-node-1');

      // Focus on the parent node
      parentNode.focus();
      expect(parentNode).toHaveFocus();

      // Press the right arrow key
      await user.keyboard('[ArrowRight]');

      // Check if the first child node is now focused
      expect(childNode1).toHaveFocus();
    });

    it('should expand a collapsed parent node when right arrow is pressed', async () => {
      const user = userEvent.setup();

      render(
        <TreeView label="Tree View">
          <TreeNode
            data-testid="parent-node"
            label="Parent Node"
            isExpanded={false}>
            <TreeNode data-testid="child-node" label="Child Node" />
          </TreeNode>
        </TreeView>
      );

      const parentNode = screen.getByTestId('parent-node');

      // Initially, the parent node should not be expanded
      expect(parentNode).not.toHaveAttribute('aria-expanded', 'true');

      // Focus on the parent node
      parentNode.focus();
      expect(parentNode).toHaveFocus();

      // Press the right arrow key
      await user.keyboard('[ArrowRight]');

      // The parent node should now be expanded
      expect(parentNode).toHaveAttribute('aria-expanded', 'true');

      // Now that the parent is expanded, we can check for the child node
      const childNode = screen.getByTestId('child-node');
      expect(childNode).toBeInTheDocument();

      // The parent node should still have focus
      expect(parentNode).toHaveFocus();
    });
  });
});
