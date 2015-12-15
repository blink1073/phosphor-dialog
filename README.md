phosphor-dialog
===============

[![Build Status](https://travis-ci.org/phosphorjs/phosphor-dialog.svg)](https://travis-ci.org/phosphorjs/phosphor-dialog?branch=master)
[![Coverage Status](https://coveralls.io/repos/phosphorjs/phosphor-dialog/badge.svg?branch=master&service=github)](https://coveralls.io/github/phosphorjs/phosphor-dialog?branch=master)

A Phosphor widget which provides a modal dialog.

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
