/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Carbon from '../src/index';

describe('Carbon Components React', () => {
  it('can be imported using the correct path', () => {
    expect(typeof Carbon).toBe('object');
  });

  it('should export components', () => {
    expect(Object.keys(Carbon).sort()).toMatchInlineSnapshot(`
      Array [
        "Accordion",
        "AccordionItem",
        "AccordionSkeleton",
        "ActionableNotification",
        "AspectRatio",
        "Breadcrumb",
        "BreadcrumbItem",
        "BreadcrumbSkeleton",
        "Button",
        "ButtonSet",
        "ButtonSkeleton",
        "Checkbox",
        "CheckboxSkeleton",
        "ClickableTile",
        "CodeSnippet",
        "CodeSnippetSkeleton",
        "Column",
        "ColumnHang",
        "ComboBox",
        "ComposedModal",
        "Content",
        "ContentSwitcher",
        "Copy",
        "CopyButton",
        "DangerButton",
        "DataTable",
        "DataTableSkeleton",
        "DatePicker",
        "DatePickerInput",
        "DatePickerSkeleton",
        "DefinitionTooltip",
        "Dropdown",
        "DropdownSkeleton",
        "ErrorBoundary",
        "ErrorBoundaryContext",
        "ExpandableSearch",
        "ExpandableTile",
        "FeatureFlags",
        "FileUploader",
        "FileUploaderButton",
        "FileUploaderDropContainer",
        "FileUploaderItem",
        "FileUploaderSkeleton",
        "Filename",
        "FlexGrid",
        "FluidForm",
        "Form",
        "FormGroup",
        "FormItem",
        "FormLabel",
        "Grid",
        "HStack",
        "Header",
        "HeaderContainer",
        "HeaderGlobalAction",
        "HeaderGlobalBar",
        "HeaderMenu",
        "HeaderMenuButton",
        "HeaderMenuItem",
        "HeaderName",
        "HeaderNavigation",
        "HeaderPanel",
        "HeaderSideNavItems",
        "Heading",
        "IconButton",
        "IconSkeleton",
        "IconTab",
        "InlineLoading",
        "InlineNotification",
        "Layer",
        "Link",
        "ListItem",
        "Loading",
        "Modal",
        "ModalBody",
        "ModalFooter",
        "ModalHeader",
        "MultiSelect",
        "NotificationActionButton",
        "NotificationButton",
        "NotificationTextDetails",
        "NumberInput",
        "NumberInputSkeleton",
        "OrderedList",
        "OverflowMenu",
        "OverflowMenuItem",
        "Pagination",
        "PaginationNav",
        "PaginationSkeleton",
        "PasswordInput",
        "Popover",
        "PopoverContent",
        "PrimaryButton",
        "ProgressBar",
        "ProgressIndicator",
        "ProgressIndicatorSkeleton",
        "ProgressStep",
        "RadioButton",
        "RadioButtonGroup",
        "RadioButtonSkeleton",
        "RadioTile",
        "Row",
        "Search",
        "SearchFilterButton",
        "SearchLayoutButton",
        "SearchSkeleton",
        "SecondaryButton",
        "Section",
        "Select",
        "SelectItem",
        "SelectItemGroup",
        "SelectSkeleton",
        "SelectableTile",
        "SideNav",
        "SideNavDetails",
        "SideNavDivider",
        "SideNavFooter",
        "SideNavHeader",
        "SideNavIcon",
        "SideNavItem",
        "SideNavItems",
        "SideNavLink",
        "SideNavLinkText",
        "SideNavMenu",
        "SideNavMenuItem",
        "SideNavSwitcher",
        "SkeletonIcon",
        "SkeletonPlaceholder",
        "SkeletonText",
        "SkipToContent",
        "Slider",
        "SliderSkeleton",
        "Stack",
        "StructuredListBody",
        "StructuredListCell",
        "StructuredListHead",
        "StructuredListInput",
        "StructuredListRow",
        "StructuredListSkeleton",
        "StructuredListWrapper",
        "Switch",
        "Switcher",
        "SwitcherDivider",
        "SwitcherItem",
        "Tab",
        "TabContent",
        "TabList",
        "TabPanel",
        "TabPanels",
        "Table",
        "TableActionList",
        "TableBatchAction",
        "TableBatchActions",
        "TableBody",
        "TableCell",
        "TableContainer",
        "TableExpandHeader",
        "TableExpandRow",
        "TableExpandedRow",
        "TableHead",
        "TableHeader",
        "TableRow",
        "TableSelectAll",
        "TableSelectRow",
        "TableToolbar",
        "TableToolbarAction",
        "TableToolbarContent",
        "TableToolbarMenu",
        "TableToolbarSearch",
        "Tabs",
        "TabsSkeleton",
        "Tag",
        "TagSkeleton",
        "TextArea",
        "TextAreaSkeleton",
        "TextInput",
        "TextInputSkeleton",
        "Theme",
        "ThemeContext",
        "Tile",
        "TileAboveTheFoldContent",
        "TileBelowTheFoldContent",
        "TileGroup",
        "TimePicker",
        "TimePickerSelect",
        "ToastNotification",
        "Toggle",
        "ToggleSkeleton",
        "ToggleSmall",
        "ToggleSmallSkeleton",
        "Toolbar",
        "ToolbarDivider",
        "ToolbarItem",
        "ToolbarOption",
        "ToolbarSearch",
        "ToolbarTitle",
        "Tooltip",
        "UnorderedList",
        "VStack",
        "unstable_Menu",
        "unstable_MenuDivider",
        "unstable_MenuGroup",
        "unstable_MenuItem",
        "unstable_MenuRadioGroup",
        "unstable_MenuSelectableItem",
        "unstable_PageSelector",
        "unstable_Pagination",
        "unstable_TreeNode",
        "unstable_TreeView",
        "unstable_useContextMenu",
        "useFeatureFlag",
        "useFeatureFlags",
        "usePrefix",
        "useTheme",
      ]
    `);
  });
});
