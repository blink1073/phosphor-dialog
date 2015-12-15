/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  ICommand
} from 'phosphor-command';

import {
  hitTest
} from 'phosphor-domutil';

import {
  Message
} from 'phosphor-messaging';

import {
  Widget
} from 'phosphor-widget';

import './index.css';


/**
 * The class name added to dialog instances.
 */
const DIALOG_CLASS = 'p-Dialog';

/**
 * The class name added to dialog content node.
 */
const CONTENT_CLASS = 'p-Dialog-content';

/**
 * The class name added to dialog header node.
 */
const HEADER_CLASS = 'p-Dialog-header';

/**
 * The class name added to dialog body node.
 */
const BODY_CLASS = 'p-Dialog-body';

/**
 * The class name added to dialog content node.
 */
const FOOTER_CLASS = 'p-Dialog-footer';

/**
 * The class name added to dialog button nodes.
 */
const BUTTON_CLASS = 'p-Dialog-button';

/**
 * The class name added to dialog OK buttons.
 */
const OK_BUTTON_CLASS = 'p-Dialog-ok-button';

/**
 * The class name added to dialog Cancel buttons.
 */
const CANCEL_BUTTON_CLASS = 'p-Dialog-cancel-button';


/**
 * A button applied to a dialog.
 */
export
interface IButtonItem {
  /**
   * The text for the button.
   */
  text: string;

  /**
   * The icon class for the button.
   */
  icon?: string;

  /**
   * The extra class name to associate with the button.
   */
  className?: string;

  /**
   * The command for the button.
   */
  command?: ICommand;

  /**
   * The args object for the button command.
   */
  commandArgs?: any;
}


/**
 * A default "OK" button.
 */
export
const okButton: IButtonItem = {
  text: 'OK',
  className: OK_BUTTON_CLASS
}


/**
 * A default "Cancel" button.
 */
export
const cancelButton: IButtonItem = {
  text: 'Cancel',
  className: CANCEL_BUTTON_CLASS
}


/**
 * Create a dialog and show it.
 *
 * @param title - The top level text for the dialog.
 *
 * @param host - The host node for the dialog.
 *
 * @param body - The node containing the dialog main body.
 *
 * @param buttons - List of button items.  Defaults to using the [[okButton]]
 *   and the [[cancelButton]].
 *
 * @returns The button item that was selected.
 */
export
function showDialog(title: string, host: HTMLElement, body: HTMLElement, buttons?: IButtonItem[]): Promise<IButtonItem>{
  let dialog = createDialog(host);
  let titleNode = dialog.getElementsByClassName(HEADER_CLASS)[0];
  titleNode.textContent = title;
  let bodyNode = dialog.getElementsByClassName(BODY_CLASS)[0];
  bodyNode.appendChild(body);
  let footer = dialog.getElementsByClassName(FOOTER_CLASS)[0];
  buttons = buttons || [okButton, cancelButton];
  let buttonNodes = buttons.map(createButton);

  return new Promise<IButtonItem>((resolve, reject) => {
    for (let node of buttonNodes) {
      footer.appendChild(node);
      node.onclick = (event: Event) => {
        for (let index = 0; index < buttons.length; index++) {
          host.removeChild(dialog);
          if (buttonNodes[index].contains(event.target as HTMLElement)) {
            let button = buttons[index];
            if (button.command && button.command.isEnabled) {
              button.command.execute(button.commandArgs);
            }
            resolve(button);
          }
        }
      }
    }
    host.appendChild(dialog);
  });
}


/**
 * Create the dialog node.
 */
function createDialog(host: HTMLElement): HTMLElement {
  // Create the dialog nodes (except for the buttons).
  let node = document.createElement('div');
  let content = document.createElement('div');
  let header = document.createElement('div');
  let body = document.createElement('div');
  let footer = document.createElement('div');
  node.className = DIALOG_CLASS;
  content.className = CONTENT_CLASS;
  header.className = HEADER_CLASS;
  body.className = BODY_CLASS;
  footer.className = FOOTER_CLASS;
  node.appendChild(content);
  content.appendChild(header);
  content.appendChild(body);
  content.appendChild(footer);
  return node;
}


/**
 * Create a node for a button item.
 */
function createButton(item: IButtonItem): HTMLElement {
  let button = document.createElement('button');
  button.className = BUTTON_CLASS;
  if (item.className) button.classList.add(item.className);
  let icon = document.createElement('i');
  if (item.icon) icon.classList.add(item.icon);
  let text = document.createElement('span');
  text.textContent = item.text;
  button.appendChild(icon);
  button.appendChild(text);
  return button;
}
