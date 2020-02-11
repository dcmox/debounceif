const debounceIfMap: IDebounceIfMap = {}

interface IDebounceIfMap {
	[key: string]: DebounceIf
}

const debounce = (func: () => any, timeMs: number = 500) => {
	const fn: string = func.toString()
	if (debounceIfMap[fn] === undefined) {
		debounceIfMap[fn] = new DebounceIf(func, timeMs)
	}
	debounceIfMap[fn].debounce()
}

const debounceIf = (
	func: () => any,
	timeMs: number = 500,
	debounceIf: (() => boolean) | boolean = false,
) => {
	const fn: string = func.toString()
	if (debounceIfMap[fn] === undefined) {
		debounceIfMap[fn] = new DebounceIf(func, timeMs, debounceIf)
	}
	debounceIfMap[fn].debounceIf()
}

class DebounceIf {
	private _timeMs: number = 500
	private _ifCallCount: number = 0
	private _func: () => any
	private _debounceTimer: any = null
	private _ifTimer: any = null
	private _ifCond: (() => boolean) | null
	private _ifConditionMet: boolean = false
	private _ifLimit: number = 20

	constructor(
		func: () => any,
		timeMs: number = 500,
		ifCond: (() => boolean) | boolean = false,
	) {
		this._func = func
		this._timeMs = timeMs
		this._ifCond =
			ifCond === true ? this.ifLimitFunc : ifCond ? ifCond : null
	}
	public setIfLimit = (limit: number) => {
		this._ifLimit = limit
	}
	public debounce = () => {
		clearTimeout(this._debounceTimer)
		this._debounceTimer = setTimeout(() => {
			if (this._ifCond && this._ifConditionMet === false) {
				// do nothing
			} else {
				this._func()
			}
		}, this._timeMs)
	}
	public debounceIf = () => {
		this._ifConditionMet = false
		this.debounce()
		this._if()
	}
	public ifLimitFunc = () => {
		this._ifCallCount++
		return this._ifCallCount >= this._ifLimit
	}
	public ifCallCount = () => {
		return this._ifCallCount
	}
	private _if = () => {
		this._ifCallCount = 0
		clearInterval(this._ifTimer)
		this._ifTimer = setInterval(() => {
			if (this._ifCond && this._ifCond()) {
				clearTimeout(this._debounceTimer)
				clearInterval(this._ifTimer)
				this._ifConditionMet = true
				this._func()
			}
		}, this._timeMs)
	}
}

module.exports = {
	DebounceIf,
	debounceIf,
	debounce,
}
