/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  Widget
} from 'phosphor-widget';

import {
  SplitPanel
} from 'phosphor-splitpanel';

import {
  showDialog
} from 'phosphor-dialog';


function createContent(name: string): Widget {
  let widget = new Widget();
  widget.addClass('content');
  widget.addClass(name);
  let button = document.createElement('button');
  let text = document.createElement('textarea');
  button.textContent = 'Show Dialog';
  widget.node.appendChild(button);
  widget.node.appendChild(text);
  button.onclick = () => {
    let userText = document.createElement('textarea');
    userText.value = text.value;
    showDialog(name, widget.node, userText).then(item => {
      console.log(item);
      if (item && item.text === 'OK') {
        text.value = userText.value;
      }
    });
  };
  return widget;
}


function main(): void {
  let red = createContent('red');
  let green = createContent('green');
  let panel = new SplitPanel();
  panel.addChild(red);
  panel.addChild(green);
  panel.id = 'main';
  panel.attach(document.body);
}


main();
