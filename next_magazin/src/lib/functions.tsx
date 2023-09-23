export function formToObject<T>(FORM: HTMLFormElement) {
    return Object.fromEntries(new FormData(FORM).entries()) as T
}


export function turnOnOrOffButton(BUTTON: HTMLButtonElement) {
    BUTTON.disabled = !BUTTON.disabled
}




export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
