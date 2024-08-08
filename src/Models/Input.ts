import { SyntheticEvent } from "react";

export interface Paste<T = Element> extends SyntheticEvent<T, ClipboardEvent> {
    clipboardData: DataTransfer;
}

export interface KeyDown<T = Element> extends SyntheticEvent<T, KeyboardEvent> {
    altKey: boolean;
    /** @deprecated */
    charCode: number;
    ctrlKey: boolean;
    getModifierState(key: string): boolean;
    key: string;
    /** @deprecated */
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    /** @deprecated */
    which: number;
}