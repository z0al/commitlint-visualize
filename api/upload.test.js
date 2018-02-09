jest.mock('mongodb')

// Packages
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')

// Ours
const db = require('../utils/db')
const api = require('./upload')

let service, url

beforeAll(async () => {
	const client = await db()

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
			commits: [{ valid: true, errors: [], warnings: [] }]
		}
	})

	expect(body._id).toEqual('<object_id>')
})
