/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';
require('./index.css');
/**
 * The class name added to dialog instances.
 */
var DIALOG_CLASS = 'p-Dialog';
/**
 * The class name added to dialog content node.
 */
var CONTENT_CLASS = 'p-Dialog-content';
/**
 * The class name added to dialog header node.
 */
var HEADER_CLASS = 'p-Dialog-header';
/**
 * The class name added to dialog title node.
 */
var TITLE_CLASS = 'p-Dialog-title';
/**
 * The class name added to dialog close icon node.
 */
var CLOSE_ICON_CLASS = 'p-Dialog-close';
/**
 * The class name added to dialog body node.
 */
var BODY_CLASS = 'p-Dialog-body';
/**
 * The class name added to a dialog content node.
 */
var FOOTER_CLASS = 'p-Dialog-footer';
/**
 * The class name added to a dialog button node.
 */
var BUTTON_CLASS = 'p-Dialog-button';
/**
 * The class name added to a dialog button icon node.
 */
var BUTTON_ICON_CLASS = 'p-Dialog-button-icon';
/**
 * The class name added to a dialog button text node.
 */
var BUTTON_TEXT_CLASS = 'p-Dialog-button-txt';
/*
 * The class name added to dialog OK buttons.
 */
var OK_BUTTON_CLASS = 'p-Dialog-ok-button';
/**
 * The class name added to dialog Cancel buttons.
 */
var CANCEL_BUTTON_CLASS = 'p-Dialog-cancel-button';
/**
 * A default "OK" button.
 */
exports.okButton = {
    text: 'OK',
    className: OK_BUTTON_CLASS
};
/**
 * A default "Cancel" button.
 */
exports.cancelButton = {
    text: 'Cancel',
    className: CANCEL_BUTTON_CLASS
};
/**
 * Create a dialog and show it.
 *
 * @param options - The dialog setup options.
 *
 * @returns The button item that was selected.
 */
function showDialog(options) {
    var host = options.host || document.body;
    var buttons = options.buttons || [exports.okButton, exports.cancelButton];
    var buttonNodes = buttons.map(createButton);
    var dialog = createDialog(options, buttonNodes);
    host.appendChild(dialog);
    buttonNodes[0].focus();
    return new Promise(function (resolve, reject) {
        buttonNodes.map(function (node) {
            node.onclick = function (event) {
                if (node.contains(event.target)) {
                    host.removeChild(dialog);
                    var button = buttons[buttonNodes.indexOf(node)];
                    if (button.command && button.command.isEnabled) {
                        button.command.execute(button.commandArgs);
                    }
                    resolve(button);
                }
            };
        });
        dialog.onkeydown = function (event) {
            // Check for escape key
            if (event.keyCode === 27) {
                host.removeChild(dialog);
                resolve(null);
            }
        };
        var close = dialog.getElementsByClassName(CLOSE_ICON_CLASS)[0];
        close.onclick = function () {
            host.removeChild(dialog);
            resolve(null);
        };
    });
}
exports.showDialog = showDialog;
/**
 * Create the dialog node.
 */
function createDialog(options, buttonNodes) {
    // Create the dialog nodes (except for the buttons).
    var node = document.createElement('div');
    var content = document.createElement('div');
    var header = document.createElement('div');
    var body = document.createElement('div');
    var footer = document.createElement('div');
    var title = document.createElement('span');
    var close = document.createElement('span');
    node.className = DIALOG_CLASS;
    content.className = CONTENT_CLASS;
    header.className = HEADER_CLASS;
    body.className = BODY_CLASS;
    footer.className = FOOTER_CLASS;
    title.className = TITLE_CLASS;
    close.className = CLOSE_ICON_CLASS;
    node.appendChild(content);
    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(footer);
    header.appendChild(title);
    header.appendChild(close);
    // Populate the nodes.
    title.textContent = options.title || '';
    if (options.body && typeof options.body === 'string') {
        var span = document.createElement('span');
        span.innerHTML = options.body;
        body.appendChild(span);
    }
    else if (options.body) {
        body.appendChild(options.body);
    }
    buttonNodes.map(function (buttonNode) { footer.appendChild(buttonNode); });
    return node;
}
/**
 * Create a node for a button item.
 */
function createButton(item) {
    var button = document.createElement('button');
    button.className = BUTTON_CLASS;
    if (item.className)
        button.classList.add(item.className);
    var icon = document.createElement('span');
    icon.className = BUTTON_ICON_CLASS;
    if (item.icon)
        icon.classList.add(item.icon);
    var text = document.createElement('span');
    text.className = BUTTON_TEXT_CLASS;
    text.textContent = item.text;
    button.appendChild(icon);
    button.appendChild(text);
    return button;
}
//# sourceMappingURL=index.js.map