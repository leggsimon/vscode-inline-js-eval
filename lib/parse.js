const esprima = require('esprima');


function findFunctions(body) {
    const fileAST = esprima.parseScript(body, { loc: true })
    // console.log(fileAST)
    return fileAST.body.filter(node => node.type === 'FunctionDeclaration')
}

module.exports = {
    findFunctions
}
