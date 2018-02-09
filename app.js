// Packages
const { parse } = require('url')
const { router, get, post } = require('microrouter')
const next = require('next')

// Ours
const { dev } = require('./utils/config')
const db = require('./utils/db')
const upload = require('./api/upload')
const fetch = require('./api/fetch')

const app = next({ dev })
const handle = app.getRequestHandler()

// Main
const start = async () => {
	await app.prepare()

	const dbclient = await db()

	// Injects DB client
	const wrap = handler => async (req, res) => {
		req.db = dbclient
		return handler(req, res)
	}

	return router(
		// API ->
		get('/api/fetch/:id', wrap(fetch)),
		post('/api/upload', wrap(upload)),

		// * ->
		get('*', async (req, res) => {
			return handle(req, res, parse(req.url, true))
		})
	)
}

module.exports = start()
