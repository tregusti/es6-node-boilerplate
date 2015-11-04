import mockery from 'mockery';
import sinon from 'sinon';
import { sync as resolve } from 'resolve';
import { expect } from 'chai';

describe('first', function() {
    let subject, second;

    beforeEach(function() {
        mockery.enable();
        mockery.registerAllowable(resolve('babel-preset-es2015'));

        second = {
            name: function() {
                // return 'Miliam'
            }
        };
        mockery.registerMock('./second', second);

        subject = load('../src/first');
    });

    afterEach(function() {
        mockery.disable();
    });

    describe('.name', function() {
        it('should be correct', function() {
            second.name = function() {
                return 'Miliam'
            };

            expect(subject.result()).to.equal('Miliam');
        });
    });

    function load(filepath) {
        mockery.registerAllowable(filepath);
        return require(filepath);
    }
});
