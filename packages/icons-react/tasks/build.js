/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const meta = require('@carbon/icons/meta.json');
const fs = require('fs');
const path = require('path');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const virtual = require('./plugins/virtual');

const PACKAGE_DIR = path.resolve(__dirname, '../');
const BUNDLE_FORMATS = [
  {
    file: path.join(PACKAGE_DIR, 'es/index.js'),
    format: 'esm',
  },
  {
    file: path.join(PACKAGE_DIR, 'lib/index.js'),
    format: 'cjs',
  },
  {
    file: path.join(PACKAGE_DIR, 'umd/index.js'),
    format: 'umd',
  },
];

async function build() {
  const modules = meta.map(icon =>
    createIconComponent(icon.moduleName, icon.descriptor)
  );

  const entrypoint = `/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Icon from './Icon.js';

${modules.map(({ source }) => `export ${source}`).join('\n')}

export { Icon };
`;

  const bundle = await rollup({
    input: '__entrypoint__.js',
    external: ['@carbon/icon-helpers', 'react', 'prop-types'],
    plugins: [
      virtual({
        '__entrypoint__.js': entrypoint,
        './Icon.js': fs.readFileSync(
          path.resolve(__dirname, '../src/Icon.js'),
          'utf8'
        ),
      }),
      babel({
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
          '@babel/preset-react',
        ],
      }),
    ],
  });

  await Promise.all(
    BUNDLE_FORMATS.map(({ format, file }) => {
      const outputOptions = {
        format,
        file,
      };

      if (format === 'umd') {
        outputOptions.name = 'CarbonIconsReact';
        outputOptions.globals = {
          '@carbon/icon-helpers': 'CarbonIconHelpers',
          'prop-types': 'PropTypes',
          react: 'React',
        };
      }

      return bundle.write(outputOptions);
    })
  );
}

function createIconComponent(moduleName, descriptor) {
  const { attrs, content } = descriptor;
  const { width, height, viewBox } = attrs;
  const source = `const ${moduleName} = /*#__PURE__*/ React.forwardRef(
  function ${moduleName}(props, ref) {
    return (
      <Icon width={${width}} height={${height}} viewBox="${viewBox}" ref={ref} {...props}>
        ${content.map(convertToJSX).join('\n')}
        {props.children}
      </Icon>
    );
  }
);
`;

  return {
    source,
  };
}

function convertToJSX(node) {
  const { elem, attrs } = node;
  return `<${elem} ${formatAttributes(attrs)} />`;
}

function formatAttributes(attrs) {
  return Object.keys(attrs).reduce((acc, key, index) => {
    const attribute = `${key}="${attrs[key]}"`;
    if (index === 0) {
      return attribute;
    }
    return acc + ' ' + attribute;
  }, '');
}

build().catch(error => {
  console.error(error);
});
