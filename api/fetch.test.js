jest.mock('mongodb')

// Packages
const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise-native')
const { router, get } = require('microrouter')

// Ours
const api = require('./fetch')

let service, url
process.env.DATABASE_URL = 'mongodb://user:password@host:1234/database'

beforeAll(async () => {
	const client = await require('../utils/db')()
	// Injects DB client
	const wrap = handler => async (req, res) => {
		req.db = client
		return handler(req, res)
	}
	const route = router(get('/:id', wrap(api)))
	service = micro(route)
	url = await listen(service)
})

afterAll(() => {
	service.close()
})

test('returns report details', async () => {
	const body = await request.get(`${url}/id`)
	return expect(JSON.parse(body)).toEqual({ _id: '<object_id>' })
})

test('returns 404 if not found', async () => {
	return expect(
		request.get(`${url}/id`, { resolveWithFullResponse: true })
	).rejects.toEqual(expect.objectContaining({ statusCode: 404 }))
})
