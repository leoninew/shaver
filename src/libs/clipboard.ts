import Clipboard from 'clipboard'

export default function (text: string, container?: HTMLElement, appendToBody?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
        // make fake element
        const fakeEl = document.createElement('button')
        // setup a new Clipboard.js
        const clipboard = new Clipboard(fakeEl, {
            text: () => text,
            action: () => 'copy',
            container: container ?? document.body
        })
        clipboard.on('success', (e) => {
            clipboard.destroy()
            resolve();
        })
        clipboard.on('error', (e) => {
            clipboard.destroy()
            reject(e);
        })
        // appendToBody fixes IE
        if (appendToBody)
            document.body.appendChild(fakeEl)
        // simulate click
        fakeEl.click()
        // remove from body if appended
        if (appendToBody)
            document.body.removeChild(fakeEl)
    })
}