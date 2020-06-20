# i18n

[![Build Status](https://travis-ci.org/lykmapipo/i18n.svg?branch=master)](https://travis-ci.org/lykmapipo/i18n)
[![Dependencies Status](https://david-dm.org/lykmapipo/i18n.svg)](https://david-dm.org/lykmapipo/i18n)
[![Coverage Status](https://coveralls.io/repos/github/lykmapipo/i18n/badge.svg?branch=master)](https://coveralls.io/github/lykmapipo/i18n?branch=master)
[![GitHub License](https://img.shields.io/github/license/lykmapipo/i18n)](https://github.com/lykmapipo/i18n/blob/develop/LICENSE)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/@lykmapipo/i18n)](https://www.npmjs.com/package/@lykmapipo/i18n)

[i18n](https://github.com/mashpie/i18n-node) helpers.

*Note: Make sure you have `locales` inside your base directory. [Check](https://github.com/lykmapipo/i18n/tree/master/test/locales)*

## Requirements

- [NodeJS v13+](https://nodejs.org)
- [Npm v6.12+](https://www.npmjs.com/)

## Installation

```sh
npm install @lykmapipo/i18n --save
```

## Usage

```js
import { t } from '@lykmapipo/i18n';

// default locale
t('hello'); // => Hello
t('hello', { name: 'John' }); // => Hello John


// passing specific locale
t('hello', 'sw'); // => Mambo
t('hello', 'sw', { name: 'John' }); // => Mambo John

...

```
## Environment
```js
I18N_DEFAULT_LOCALE=en
I18N_LOCALES=en,sw
I18N_QUERY_PARAMETER=lang
I18N_DIRECTORY=./locales
I18N_OBJECT_NOTATION=true
```

## Helpers

- `t(phrase:String, [locale:String], [options:Object])`: Translates a single 
phrase and adds it to locales if unknown. It returns translated parsed and 
substituted string.

Example:
```js
t('hello');
t('hello', { name: 'John' });

t('hello', 'sw');
t('hello', 'sw', { name: 'John' });

```

- `n(phrase:String, [locale:String|count:Number], count:Number)`: Plurals translation of a single phrase. Singular and plural forms will get added to locales if unknown. Returns translated parsed and substituted string based on last count parameter.

Example:
```js
n('You have %s message', 1);
n('You have %s message', 10);

n('You have %s message', 'sw', 1);
n('You have %s message', 'sw', 10);

```

## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## License

The MIT License (MIT)

Copyright (c) lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
