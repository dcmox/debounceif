import assert from 'assert'
import sinon from 'sinon'
import * as testSuite from '../debounceIf'

describe('debounceIf test suite', () => {
    it('should debounce the function call after 500ms', () => {
        const clock = sinon.useFakeTimers()
        const callback = sinon.spy()
        testSuite.debounce(callback, 500)
        assert.ok(!callback.called)
        clock.tick(500)
        assert.ok(callback.called)
    })

    it('should debounceIf the function call 3 and 4 times', () => {
        const clock = sinon.useFakeTimers()
        const callback = () => true
        let times = 0
        const intervalMs: number = 500
        let maxTimes: number = 3
        const spyObj = {
            debounceIf: () => {
                times++
                if (times >= maxTimes) {
                    return true
                }
                return false
            },
        }
        // check max times debounceIf is called (with 3 max)
        const debounceIfSpy = sinon.spy(spyObj, 'debounceIf')
        testSuite.debounceIf(callback, intervalMs, spyObj.debounceIf)
        clock.tick(intervalMs * 3)
        assert.equal(debounceIfSpy.callCount, 3)
        // check max times debounceIf is called (with 4 max)
        debounceIfSpy.resetHistory()
        times = 0
        maxTimes = 4

        testSuite.debounceIf(callback, intervalMs, spyObj.debounceIf)
        clock.tick(intervalMs * 4)
        assert.equal(debounceIfSpy.callCount, 4)
    })

    it('instantiates the class, sets ifCond limit, and matches the ifCond call count', () => {
        const clock = sinon.useFakeTimers()
        const times: number = 3
        const intervalMs: number = 500

        const debounceIf = new testSuite.DebounceIf(() => true, intervalMs, true)
        debounceIf.setIfLimit(times)
        debounceIf.debounceIf()
        clock.tick(intervalMs * times)
        assert.equal(debounceIf.ifCallCount(), times)
    })

})
