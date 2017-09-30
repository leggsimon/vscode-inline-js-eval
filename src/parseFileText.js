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

        functions.forEach(func => {
            console.log({
                line: func.loc.start.line,
                name: func.id.name,
                params: func.params.map(param => param.name)
            })
        })

        // const chars = fileText.split('').length
        vscode.window.showInformationMessage(`This file has ${functions.length} function declarations`);
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
