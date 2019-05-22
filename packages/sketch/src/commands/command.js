/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import sketch from 'sketch';

export function command(name, fn) {
  const start = Date.now();

  sketch.UI.message('Hi 👋 We are still working on this! 🚧');
  fn();
  sketch.UI.message('Done! 🎉');

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Carbon Elements] ${name}: Done in ${Date.now() - start}ms`);
  }
}
