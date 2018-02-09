jest.mock('mongodb')

const { MongoClient, ObjectId } = require('mongodb')

process.env.DATABASE_URL = 'mongodb://user:password@host:1234/database'

const db = require('./db')

test('successfully connects to DB', async () => {
	await db()
	expect(MongoClient.connect).toBeCalled()

	const client = await MongoClient.connect()
	expect(client.db).toBeCalledWith('database')

	const dbc = client.db()
	expect(dbc.collection).toBeCalledWith('reports')
})

test('inserting new records', async () => {
	const client = await db()
	const id = await client.insert({})
	expect(id).toEqual('<object_id>')
})

test('fetching existing records', async () => {
	const client = await db()
	const rec = await client.fetch('<object_id>')
	expect(rec).toEqual({ _id: '<object_id>' })
})
