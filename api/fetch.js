// Packages
const { send } = require('micro')

/**
 * Report fetching API
 *
 * @param {*} req
 * @param {*} res
 */
const fetch = async (req, res) => {
	try {
		const record = await req.db.fetch(req.params.id)
		return send(res, 200, record)
	} catch (err) {
		return send(res, 404)
	}
}

module.exports = fetch
