/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const meta = require('@carbon/icons/build-info.json');
const { camel } = require('change-case');
const fs = require('fs-extra');
const path = require('path');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const virtual = require('./plugins/virtual');

const PACKAGE_DIR = path.resolve(__dirname, '../');
const BUNDLE_FORMATS = [
  {
    file: path.join(PACKAGE_DIR, 'lib/index.js'),
    format: 'esm',
  },
  {
    file: path.join(PACKAGE_DIR, 'umd/index.js'),
    format: 'umd',
  },
];

const external = ['@carbon/icon-helpers'];
const babelConfig = {
  babelrc: false,
  exclude: /node_modules/,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
};

/**
 * Take the processed `meta.json` file from `@carbon/icons` and generate an
 * entrypoint for `@carbon/icons-vue`. This entrypoint is generated by
 * building icon components built on top of the `<Icon>` primitive in `src`.
 */
async function build() {
  const modules = meta.map(icon =>
    createIconComponent(icon.moduleName, icon.descriptor)
  );

  const entrypoint = `export const CarbonIconsVue = {
  install(Vue, options) {
    const { components } = options;

    ${modules.map(({ source }) => `Vue.component(${source.name})`).join('\n')}
  },
}`;

  const bundle = await rollup({
    input: '__entrypoint__.js',
    external,
    plugins: [
      virtual({
        '__entrypoint__.js': entrypoint,
        './Icon.vue': fs.readFileSync(
          path.resolve(__dirname, '../src/Icon.vue'),
          'utf8'
        ),
      }),
      babel(babelConfig),
    ],
  });

  await Promise.all(
    BUNDLE_FORMATS.map(({ format, file }) => {
      const outputOptions = {
        format,
        file,
      };

      if (format === 'umd') {
        outputOptions.name = 'CarbonIconsVue';
        outputOptions.globals = {
          '@carbon/icon-helpers': 'CarbonIconHelpers',
        };
      }

      return bundle.write(outputOptions);
    })
  );

  // Create aliases for `@carbon/icons-vue/es/<icon-name>/<size>`
  await Promise.all(
    meta.map(async icon => {
      const { moduleName, outputOptions } = icon;
      const pathToEntrypoint = Array.from({
        // The length of this is determined by the number of directories from
        // our `outputOptions` minus 1 for the bundle type (`es` for example)
        // and minus 1 for the filename as it does not count as a directory jump
        length: outputOptions.file.split('/').length - 2,
      })
        .fill('..')
        .join('/');

      await fs.ensureFile(outputOptions.file);
      await fs.writeFile(
        outputOptions.file,
        `import { ${moduleName} } from '${pathToEntrypoint}';
export default ${moduleName};
`
      );
    })
  );

  // Create aliases for `@carbon/icons-vue/lib/<icon-name>/<size>`
  // Our game plan is to use rollup's code-splitting functionality to build up
  // an input object to rollup where the key is the path to the file and the
  // value is the file source.
  //
  // We can then use a plugin with rollup to create these files in its virtual
  // module registry that are then included in the final bundle output.
  const commonjsInputs = meta.reduce((acc, icon) => {
    const { descriptor, moduleName, outputOptions } = icon;
    // Drop the first part of `outputOptions.file` as it contains the `es/`
    // directory
    const commonjsFilepath = outputOptions.file
      .split('/')
      .slice(1)
      .join('/');
    const { source: component } = createIconComponent(moduleName, descriptor);
    const source = `/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes } from '@carbon/icon-helpers';

${component}

export default ${moduleName};`;

    return {
      ...acc,
      [commonjsFilepath]: source,
    };
  }, {});

  // Using the mapping of file path to file source, we can specify our input to
  // rollup by formatting the filepath so that rollup outputs the file to the
  // correct place. The location is going to match the key that we use in the
  // virtual plugin to create this module in-memory.
  const commonjsBundles = await rollup({
    input: Object.keys(commonjsInputs).reduce((acc, key) => {
      const formattedKey = key
        .split('/')
        .map((subpath, i, paths) => {
          if (i !== paths.length - 1) {
            return subpath;
          }
          return path.basename(subpath, '.js');
        })
        .join('/');
      return {
        ...acc,
        [formattedKey]: key,
      };
    }, {}),
    external,
    plugins: [
      // We build up our modules in-memory using this virtual plugin, alongside
      // the shared Icon.js module that is used as the base for all components
      virtual({
        ...commonjsInputs,
        './Icon.vue': fs.readFileSync(
          path.resolve(__dirname, '../src/Icon.vue'),
          'utf8'
        ),
      }),
      babel(babelConfig),
    ],
  });

  await commonjsBundles.write({
    dir: 'lib',
    format: 'cjs',
    entryFileNames: '[name].js',
  });
}

/**
 * Generate an icon component, which in our case is the string representation
 * of the component, from a given moduleName and icon descriptor.
 * @param {string} moduleName
 * @param {object} descriptor
 * @returns {string}
 */
function createIconComponent(moduleName, descriptor) {
  const { attrs, content } = descriptor;
  const { width, height, viewBox } = attrs;
  const source = `{
  name: '${moduleName}',
  functional: true,
  // We use title as the prop name as it is not a valid attribute for an SVG
  // HTML element
  props: ['title'],
  render(createElement, context) {
    const { children, data, listeners, props } = context;
    const attrs = getAttributes({
      width: '${width}',
      height: '${height}',
      viewBox: '${viewBox}',
      preserveAspectRatio: 'xMidYMid meet',
      xmlns: 'http://www.w3.org/2000/svg',
      // Special case here, we need to coordinate that we are using title,
      // potentially, to get the right focus attributes
      title: props.title,
      ...data.attrs,
    });
    const svgData = {
      attrs,
      on: listeners,
    };
    if (data.staticClass) {
      svgData.class = {
        [data.staticClass]: true,
      };
    }
    if (data.class) {
      svgData.class[data.class] = true;
    }
    return createElement('svg', svgData, [
      props.title && createElement('title', null, props.title),
      ${content.map(convertToVue).join(', ')},
      children,
    ]);
  },
};`;

  return {
    source,
  };
}

/**
 * Convert the given node to a Vue string source
 * @param {object} node
 * @returns {string}
 */
function convertToVue(node) {
  const { elem, attrs } = node;
  return `<${elem} ${formatAttributes(attrs)} />`;
}

const attributeDenylist = ['data', 'aria'];

/**
 * Determine if the given attribute should be transformed when being converted
 * to a Vue prop or if we should pass it through as-is
 * @param {string} attribute
 * @returns {boolean}
 */
function shouldTransformAttribute(attribute) {
  return attributeDenylist.every(prefix => !attribute.startsWith(prefix));
}

/**
 * Serialize a given object of key, value pairs to an JSX-compatible string
 * @param {object} attrs
 * @returns {string}
 */
function formatAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, key, index) => {
    const attribute = shouldTransformAttribute(key)
      ? `${camel(key)}="${attrs[key]}"`
      : `${key}="${attrs[key]}"`;

    if (index === 0) {
      return attribute;
    }
    return acc + ' ' + attribute;
  }, '');
}

build().catch(error => {
  console.error(error);
});
