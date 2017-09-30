const vscode = require('vscode');
const parse = require('../lib/parse')

function parseText () {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const currentFile = vscode.window.activeTextEditor.document
    const isJavascriptFile = currentFile.languageId === 'javascript'
    if (isJavascriptFile) {
        const fileText = currentFile.getText()
        const functions = parse.findFunctions(fileText)

        functions.forEach(async (func, i) => {
            const functionLine = currentFile.lineAt(func.loc.start.line)
            const params = func.params.map(param => param.name)
            console.log({
                line: func.loc.start.line,
                name: func.id.name,
                params
            })

            // just deal with the first function for the time-being
            if (i === 0) {
                const paramsDefininitions = {}
                // loop until params are declared in an await for..loop
                // store selections into a object.
                while (Object.keys(paramsDefininitions).length < params.length) {
                    // let selection;
                    // let exit;
                    const options = params.filter(p => !Object.keys(paramsDefininitions).includes(p))
                    const selection = await vscode.window.showQuickPick(options)
                    if (!selection) { break } // TODO: maybe continue instead and break in a different case?
                    const value = await vscode.window.showInputBox({ prompt: selection })
                    if (!value) { break } // TODO: maybe continue instead and break in a different case?
                    paramsDefininitions[selection] = value
                }
                const paramsString = params.map(p => `${p} = ${paramsDefininitions[p]}`).join(', ')
                console.log(paramsString)

            }
        })


        // const chars = fileText.split('').length
        // vscode.window.showInformationMessage(`This file has ${functions.length} function declarations`);
    } else {
        vscode.window.showErrorMessage('This plugin only works with Javascript files! 😕')
    }

}

module.exports = parseText

/*
function addTwoNumbers(a, b) {
    const result = a + b;
    return result;
}
*/
