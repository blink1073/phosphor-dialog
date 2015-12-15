import { ICommand } from 'phosphor-command';
/**
 * A button applied to a dialog.
 */
export interface IButtonItem {
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
export declare const okButton: IButtonItem;
/**
 * A default "Cancel" button.
 */
export declare const cancelButton: IButtonItem;
/**
 * The options used to create a dialog.
 */
export interface IDialogOptions {
    /**
     * The tope level text for the dialog (defaults to an empty string).
     */
    title?: string;
    /**
     * The main body element for the dialog or a message to display,
     * which is wrapped in a <p> tag.
     */
    body?: HTMLElement | string;
    /**
     * The host element for the dialog (defaults to `document.body`).
     */
    host?: HTMLElement;
    /**
     * A list of button times to display (defaults to [[okButton]] and
     *   [[cancelButton]]).
     */
    buttons?: IButtonItem[];
}
/**
 * Create a dialog and show it.
 *
 * @param options - The dialog setup options.
 *
 * @returns The button item that was selected.
 */
export declare function showDialog(options: IDialogOptions): Promise<IButtonItem>;
