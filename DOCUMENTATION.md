#### withEnv() 

Grab defaults from environment variables






##### Examples

```javascript

withEnv();
// => { defaultLocale: 'en', locales: ['en', ...], ... };
```


##### Returns


- `object`  environment options



#### withDefaults([optns&#x3D;{}]) 

Merge provided options with defaults




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | provided options | *Optional* |




##### Examples

```javascript

const optns = { locales: [...] };
const options = withDefaults(optns);
// => { locales: ['en', ...], ... };
```


##### Returns


- `object`  merged options



#### configure([optns&#x3D;{}]) 

i18n factory




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns&#x3D;{} | `object`  | valid i18n options | *Optional* |
| optns.reset&#x3D;false | `boolean`  | reset i18n | *Optional* |




##### Examples

```javascript

import { configure } from '@lykmapipo/i18n';

const i18n = configure({ ... });

i18n.t('hello'); // => Hello
i18n.t('hello', 'sw'); // => Mambo
```


##### Returns


- `object`  i18n helpers



#### reset() 

Reset i18n internals






##### Examples

```javascript

import { reset } from '@lykmapipo/i18n';

reset();
// => undefined
```


##### Returns


- `object`  i18n helpers



#### t(phrase[, locale&#x3D;en, optns&#x3D;{}]) 

Translates a single phrase and adds it to locales if unknown




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| phrase | `string`  | localized phrase | &nbsp; |
| locale&#x3D;en | `string`  | locale to use in translation or default | *Optional* |
| optns&#x3D;{} | `object`  | data to use on parse and substitution | *Optional* |




##### Examples

```javascript

import { t } from '@lykmapipo/i18n';

t('hello'); // => Hello
t('hello', 'sw'); // => Mambo
t('greeting', { name: 'John' }); // => Hello John
t('greeting', 'sw', { name: 'John' }); // => Mambo John
```


##### Returns


- `string`  translated parsed and substituted string



#### l(phrase) 

Provides list of translations for a given phrase in each language




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| phrase | `string`  | localized phrase | &nbsp; |




##### Examples

```javascript

import { l } from '@lykmapipo/i18n';

l('hello');
// => [ 'Hello', 'Mambo' ]
```


##### Returns


- `string`  translated parsed and substituted string



#### h(phrase) 

Provides hashed list of translations for a given phrase in each language.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| phrase | `string`  | localized phrase | &nbsp; |




##### Examples

```javascript

import { h } from '@lykmapipo/i18n';

h('hello');
// => [ { en: 'Hello' }, { sw: 'Mambo'} ]
```


##### Returns


- `string`  translated parsed and substituted string



#### n(phrase[, locale&#x3D;en, count&#x3D;0]) 

Plurals translation of a single phrase 
Note: Singular and plural forms will get added to locales if unknown




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| phrase | `string`  | localized phrase | &nbsp; |
| locale&#x3D;en | `string`  | locale to use in translation or default | *Optional* |
| count&#x3D;0 | `number`  | count to use on parse and substitution | *Optional* |




##### Examples

```javascript

import { n } from '@lykmapipo/i18n';

n('You have %s message', 1); // => You have 1 message
n('You have %s message', 'sw', 1); // => Una meseji 1
n('You have %s message', 4); // => You have 4 messages
n('You have %s message', 'sw', 4); // => Una meseji 4
```


##### Returns


- `string`  translated parsed and substituted string based on last count parameter



#### catalog([locale]) 

Provide a whole transalation catalog of a given locale




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| locale | `string`  | locale to obtain catalog for. | *Optional* |




##### Examples

```javascript

import { catalog } from '@lykmapipo/i18n';

catalog();
// => { en: { ... }, sw: { ... }, ... };

catalog('en');
// => { en: { ... } };
```


##### Returns


- `object`  translation catalog




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
