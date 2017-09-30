const { expect } = require('chai');
const parse = require('../../lib/parse')


describe('#findFunctions', () => {
    it('should find a named function', () => {
        const body = 'function testFunction() {}'
        const functions = parse.findFunctions(body)
        expect(functions.length).to.equal(1)
    });

    it('should find an arrow function declaration', () => {
        const body = 'const func = () => {}'
        const functions = parse.findFunctions(body)
        expect(functions.length).to.equal(1)
    });

    it('should find multiple functions', () => {
        const body = 'function testFunctionOne() {}\nfunction testFunctionTwo() {}'
        const functions = parse.findFunctions(body)
        expect(functions.length).to.equal(2)
    });

});
