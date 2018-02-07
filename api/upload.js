// Packages
const { send } = require('micro')

/**
 * Report uploading API
 *
 * @param {*} req
 * @param {*} res
 */
module.exports = async (req, res) => {
	return send(res, 200)
}
