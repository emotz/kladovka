const assert = require('assert');
const sut = require('../src/utility.js');

describe('utility.js', function () {
    describe('createCallMethod', function () {
        it('should call remote', function () {
            const local = {
                mymethod: function () {
                    return 'local';
                }
            };
            const remote = {
                mymethod: function () {
                    return 'remote';
                }
            };
            const pred = function () {
                return true;
            };
            const method = sut.createCallMethod(remote, local, pred);

            const res = method(undefined, 'mymethod');
            assert.equal(res, 'remote');
        });

        it('should call local', function () {
            const local = {
                mymethod: function () {
                    return 'local';
                }
            };
            const remote = {
                mymethod: function () {
                    return 'remote';
                }
            };
            const pred = function () {
                return false;
            };
            const method = sut.createCallMethod(remote, local, pred);

            const res = method(undefined, 'mymethod');
            assert.equal(res, 'local');
        });

        it('should pass arguments', function () {
            const local = {
                mymethod: function () {
                    return 'local';
                }
            };
            const remote = {
                mymethod: function (context, arg) {
                    assert(arg === "helloworld");
                    return 'remote';
                }
            };
            const pred = function () {
                return true;
            };
            const method = sut.createCallMethod(remote, local, pred);

            const res = method(undefined, 'mymethod', "helloworld");
            assert.equal(res, 'remote');
        });

        it('should pass context', function () {
            const expectedContext = {};
            const local = {
                mymethod: function () {
                    assert(false);
                    return 'local';
                }
            };
            const remote = {
                mymethod: function (context) {
                    assert(context === expectedContext);
                    return 'remote';
                }
            };
            const pred = function () {
                return true;
            };
            const method = sut.createCallMethod(remote, local, pred);

            method(expectedContext, 'mymethod');
        });
    });
});
