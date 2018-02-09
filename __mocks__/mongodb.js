const MongoClient = {
	connect: jest.fn().mockResolvedValue({
		db: jest.fn().mockReturnValue({
			collection: jest.fn().mockReturnValue({
				insertOne: jest.fn().mockResolvedValue({
					insertedId: {
						toHexString: jest.fn().mockReturnValue('<object_id>')
					}
				}),
				findOne: jest
					.fn()
					.mockResolvedValueOnce({
						_id: '<object_id>'
					})
					.mockResolvedValueOnce(null)
			})
		})
	})
}

const ObjectId = jest.fn().mockReturnValue({})

module.exports = { MongoClient, ObjectId }
