// Packages
const { send } = require('micro')

/**
 * Report fetching API
 *
 * @param {*} req
 * @param {*} res
 */
const fetch = async (req, res) => {
	const report = await req.db.fetch(req.params.id)

	if (!report) return send(res, 404)

	return send(res, 200, report)
}

module.exports = fetch
