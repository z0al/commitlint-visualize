jest.mock('./db')

// Packages
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')

// Ours
const api = require('./upload')

let service, url

beforeAll(async () => {
	service = micro(api)
	url = await listen(service)
})

afterAll(() => {
	service.close()
})

test('returns report ID', async () => {
	const body = await request.post(url, {
		json: {
			context: { repo: 'owner/repo' },
			commits: [{ valid: true, errors: [], warnings: [] }]
		}
	})

	expect(body.id).toEqual('123')
})

test('returns 400 in case of bad report', async () => {
	return expect(request.post(url, { json: {} })).rejects.toThrow('400')
})
