import { keys } from 'lodash';
import pkg from './package.json';

const imports = ['lodash/filter', 'lodash/first', 'lodash/isEmpty'];

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
