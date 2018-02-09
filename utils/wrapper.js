/**
 * Wrap Request object
 *
 * @param {*} obj
 * @param {*} name
 * @param {*} handler
 */
module.exports = (obj, key, handler) => {
	return async (req, res) => {
		const request = Object.assign({}, req, { [key]: obj })
		return handler(request, res)
	}
}
