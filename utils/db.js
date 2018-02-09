// Native
const { parse } = require('url')

// Packages
const { MongoClient, ObjectId } = require('mongodb')

// Ours
const { databaseURL } = require('./config')

module.exports = async () => {
	const dbName = parse(databaseURL).pathname.slice(1)

	const client = await MongoClient.connect(databaseURL)
	const db = client.db(dbName)
	const col = db.collection('reports')

	return {
		async insert(data) {
			const res = await col.insertOne(data)
			return res.insertedId.toHexString()
		},
		async fetch(hex) {
			return await col.findOne({ _id: ObjectId(hex) })
		}
	}
}
