import { keys } from 'lodash';
import pkg from './package.json';

const imports = [
  'lodash/clone',
  'lodash/get',
  'lodash/filter',
  'lodash/first',
  'lodash/isEmpty',
  'lodash/isFunction',
  'lodash/isNumber',
  'lodash/isPlainObject',
  'lodash/isString',
  'lodash/trim',
];

export default [
  {
    input: 'src/index.js',
    external: [
      ...imports,
      ...keys(pkg.dependencies),
      ...keys(pkg.peerDependencies),
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        interop: false,
        esModule: false,
        preferConst: true,
        strict: true,
      },
      { file: pkg.module, format: 'es' },
    ],
  },
];
