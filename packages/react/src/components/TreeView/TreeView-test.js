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
import { Document } from '@carbon/icons-react';

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

      expect(node).toHaveClass('cds--tree-node--active');
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

      expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
      expect(nodeParent).toHaveClass('cds--tree-parent-node');
      expect(nodeChild).toHaveClass('cds--tree-leaf-node');
      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <TreeView className="custom-class" label="Tree" />
      );

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

    it('should respect multiselect prop', () => {
      render(
        <TreeView multiselect label="Tree">
          <TreeNode data-testid="Node 1" label="Node 1" />
          <TreeNode data-testid="Node 2" label="Node 2" />
        </TreeView>
      );

      const tree = screen.getByRole('tree');
      const lists = tree?.getElementsByTagName('li');

      userEvent.click(lists[0], { ctrlKey: true });
      userEvent.click(lists[1], { ctrlKey: true });

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

      expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
      expect(screen.getByRole('treeitem', { name: 'Node 1' })).toHaveClass(
        'cds--tree-node--selected'
      );
    });

    it('should respect size prop', () => {
      render(<TreeView size="xs" label="Tree" />);

      const tree = screen.getByRole('tree');

      expect(tree).toHaveClass('cds--tree--xs');
    });
  });

  describe('behaves as expected', () => {
    it('should render tree with two nodes', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode label="Node 1" />
          <TreeNode label="Node 2" />
        </TreeView>
      );

      expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
      expect(screen.getByText('Node 1')).toBeInTheDocument();
      expect(screen.getByText('Node 2')).toBeInTheDocument();
    });

    it('should render tree with expanded node', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode data-testid="Node 1" label="Node 1" isExpanded={true}>
            <TreeNode data-testid="Node 2" label="Node 2" />
          </TreeNode>
        </TreeView>
      );

      const nodeParent = screen.getByTestId('Node 1');
      const nodeChild = nodeParent?.querySelector('div > span');

      expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
      expect(nodeChild).toHaveClass('cds--tree-parent-node__toggle');
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

      const nodeParent = screen.getByTestId('Node 1');
      const nodeChild = screen.getByTestId('Node 2');

      expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
      expect(nodeChild).toHaveClass('cds--tree-node--disabled');
      expect(within(nodeParent).getByText('Node 1')).toBeInTheDocument();
      expect(within(nodeChild).getByText('Node 2')).toBeInTheDocument();
      expect(within(nodeChild).getByText('Node 3')).toBeInTheDocument();
    });

    it('should render tree with icons', () => {
      render(
        <TreeView label="Tree View">
          <TreeNode renderIcon={Document} data-testid="Node 1" label="Node 1" />
        </TreeView>
      );

      expect(screen.getByLabelText('Tree View')).toBeInTheDocument();
      expect(screen.getByTestId('Node 1')).toHaveClass(
        'cds--tree-node--with-icon'
      );
    });
  });
});
