# i18n

[![Build Status](https://travis-ci.org/lykmapipo/i18n.svg?branch=master)](https://travis-ci.org/lykmapipo/i18n)
[![Dependencies Status](https://david-dm.org/lykmapipo/i18n/status.svg?style=flat-square)](https://david-dm.org/lykmapipo/i18n)

[i18n](https://github.com/mashpie/i18n-node) helpers.

*Note: Make sure you have `locales` inside your base directory. [Check](https://github.com/lykmapipo/i18n/tree/master/test/locales)*

## Requirements

- [NodeJS v8.11.1+](https://nodejs.org)
- [npm v5.6.0+](https://www.npmjs.com/)
- [i18n-node v0.8.3+](https://github.com/mashpie/i18n-node)

## Installation

```sh
npm install --save lodash @lykmapipo/env @lykmapipo/i18n
```

## Usage

```js
const { __ } = require('@lykmapipo/i18n');

// default locale
__('hello'); // Hello
__('hello', { name: 'John' }); // Hello John


// passing specific locale
__('hello', 'sw'); // Mambo
__('hello', 'sw', { name: 'John' }); // Mambo John

...

```

## Helpers

- `__(phrase:String, [locale:String], [options:Object])`: Translates a single 
phrase and adds it to locales if unknown. It returns translated parsed and 
substituted string.

Example:
```js
__('hello');
__('hello', { name: 'John' });

__('hello', 'sw');
__('hello', 'sw', { name: 'John' });

```

- `__n(phrase:String, [locale:String|count:Number], count:Number)`: Plurals translation of a single phrase. Singular and plural forms will get added to locales if unknown. Returns translated parsed and substituted string based on last count parameter.

Example:
```js
__n('You have %s message', 1);
__n('You have %s message', 10);

__n('You have %s message', 'sw', 1);
__n('You have %s message', 'sw', 10);

```

## Test

- Clone this repository

- Install all dependencies

```sh
npm install
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence

The MIT License (MIT)

Copyright (c) 2018 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
