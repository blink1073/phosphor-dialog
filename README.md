phosphor-dialog
===============

[![Build Status](https://travis-ci.org/phosphorjs/phosphor-dialog.svg)](https://travis-ci.org/phosphorjs/phosphor-dialog?branch=master)
[![Coverage Status](https://coveralls.io/repos/phosphorjs/phosphor-dialog/badge.svg?branch=master&service=github)](https://coveralls.io/github/phosphorjs/phosphor-dialog?branch=master)

A module which provides a lightweight modal dialog..

[API Docs](http://phosphorjs.github.io/phosphor-dialog/api/)

Package Install
---------------

**Prerequisites**
- [node](https://nodejs.org/)

```bash
npm install --save phosphor-dialog
```

Source Build
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)

```bash
git clone https://github.com/phosphorjs/phosphor-dialog.git
cd phosphor-dialog
npm install
```

**Rebuild**
```bash
npm run clean
npm run build
```

Run Tests
---------

Follow the source build instructions first.

```bash
npm test
```

Build Docs
----------

Follow the source build instructions first.

```bash
npm run docs
```

Navigate to `docs/index.html`.


Build Example
-------------

Follow the source build instructions first.

```bash
cd example
npm install
npm run serve
```


Supported Runtimes
------------------

The runtime versions which are currently *known to work* are listed below.
Earlier versions may also work, but come with no guarantees.

- IE 11+
- Firefox 32+
- Chrome 38+

Bundle for the Browser
----------------------

Follow the package install instructions first.

```bash
npm install --save-dev browserify
browserify myapp.js -o mybundle.js
```

Usage Examples
--------------

**Note:** This module is fully compatible with Node/Babel/ES6/ES5. Simply
omit the type declarations when using a language other than TypeScript.

```typescript
import {
  showDialog
} from 'phosphor-dialog';

let main = document.getElementById('main');
let button = document.getElementById('my-button');
let text = document.getElementById('my-textarea') as HTMLTextAreaElement;

button.onclick = () => {
  let dialogInput = document.createElement('textarea') as HTMLTextAreaElement;
  dialogInput.value = text.value;
  let options = {
    title: name,
    host: main,
    body: text.value
  }
  showDialog(options).then(item => {
    console.log(item);
    if (item && item.text === 'OK') {
      text.value = dialogInput.value;
    }
  });
}
```
