const vscode = require('vscode');
const esprima = require('esprima');

function parseText () {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const currentFile = vscode.window.activeTextEditor.document
    const isJavascriptFile = currentFile.languageId === 'javascript'
    if (isJavascriptFile) {
        const fileText = currentFile.getText()
        const fileAST = esprima.parseScript(fileText, {loc: true})
        const functions = fileAST.body.filter(node => node.type === 'FunctionDeclaration')

        functions.forEach(func => {
            console.log('---------')
            console.log('line:', func.loc.start.line)
            console.log('name:', func.id.name)
            console.log('params:', func.params.map(param => param.name))
        })

        console.log(fileAST)
        // const chars = fileText.split('').length
        // vscode.window.showInformationMessage(`Hello World! You have ${chars} chars in this file`);
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
