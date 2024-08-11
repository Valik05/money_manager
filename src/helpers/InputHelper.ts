import { KeyDown, Paste } from "../Models/Input";
import { SystemMsgObjWithOutId } from "../Models/SystemMsg";

export const handlePaste = (e: Paste, errorMsg: (msg: SystemMsgObjWithOutId) => void) => {
    if (e.currentTarget.attributes[0]?.nodeValue) {
        if (/[+\-eE]/.test(e?.clipboardData?.getData('Text'))) {
            errorMsg({ type: 'error', text: 'Pasted content contain invalid symbols' })
            e.preventDefault()
        }
    }
}

export const handleArrowsBlock = (e: KeyDown) => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === 'Enter') return;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || /[+\-eE]/.test(e.key)) e.preventDefault()
}

export const validationInstructionsForNumber = {
    validateLength: (str: any) => str.toString().length <= 16 || "The amount has 16 digits limit(",
    validateAmount: (str: any) => str > 0 || "Amount must be higher than 0",
}