const MongoClient = {
	connect: jest.fn().mockResolvedValue({
		db: jest.fn().mockReturnValue({
			collection: jest.fn().mockReturnValue({
				insertOne: jest.fn().mockResolvedValue({
					insertedId: {
						toHexString: jest.fn().mockReturnValue('<object_id>')
					}
				}),
				findOne: jest.fn().mockResolvedValue({
					_id: '<object_id>'
				})
			})
		})
	})
}

const ObjectId = jest.fn().mockReturnValue({})

module.exports = { MongoClient, ObjectId }
