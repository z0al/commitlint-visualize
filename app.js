// Packages
const { parse } = require('url')
const { router, get, post } = require('microrouter')
const next = require('next')

// Ours
const upload = require('./api/upload')
const { dev } = require('./config')

const app = next({ dev })
const handle = app.getRequestHandler()

// Main
const start = async () => {
	await app.prepare()
	return router(
		// API ->
		post('/api/upload', upload),
		// * ->
		get('*', async (req, res) => {
			return handle(req, res, parse(req.url, true))
		})
	)
}

module.exports = start()
