/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { unstable__meta as meta, tokens } from '../tokens';

const { colors } = tokens;

describe('tokens', () => {
  describe('colors', () => {
    test.each(colors)('%s should be grouped in meta', (color) => {
      const entry = meta.colors.find((group) => {
        return group.tokens.includes(color);
      });
      expect(entry).toBeDefined();
    });
  });
});
