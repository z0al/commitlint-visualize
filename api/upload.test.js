jest.mock('mongodb')

// Packages
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')

// Ours
const api = require('./upload')

let service, url
process.env.DATABASE_URL = 'mongodb://user:password@host:1234/database'

beforeAll(async () => {
	const client = await require('../utils/db')()

	// Injects DB client
	const wrap = handler => async (req, res) => {
		req.db = client
		return handler(req, res)
	}

	service = micro(wrap(api))
	url = await listen(service)
})

afterAll(() => {
	service.close()
})

test('returns report ID', async () => {
	const body = await request.post(url, {
		json: {
			context: { repo: 'owner/repo' },
			commits: [{ valid: true, sha: 'abc', errors: [], warnings: [] }]
		}
	})

	expect(body.url).toEqual('/reports/<object_id>')
})
