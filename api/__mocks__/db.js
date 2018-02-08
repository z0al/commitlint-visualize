module.exports = jest.fn().mockReturnValue({
	insert: jest.fn().mockReturnValue('123'),
	fetch: jest.fn().mockReturnValue({})
})
