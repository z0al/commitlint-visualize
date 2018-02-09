const wrap = require('./wrapper')

test('wrapper', async () => {
	const obj = {}
	const fn = () => 'Hi!'
	const handler = (req, res) => req.sayHi()

	const asyncHandler = wrap(fn, 'sayHi', handler)
	expect(await asyncHandler({}, {})).toEqual('Hi!')
})
