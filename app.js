// Packages
const { parse } = require('url')
const match = require('micro-route/match')
const next = require('next')

// Ours
const { dev } = require('./config')

const app = next({ dev })
const handle = app.getRequestHandler()

async function main(req, res) {
	const parsedUrl = parse(req.url, true)
	const { query } = parsedUrl

	if (match(req, '/api')) {
		return 'It works'
	}

	return handle(req, res, parsedUrl)
}

async function setup(handler) {
	await app.prepare()
	return handler
}

module.exports = setup(main)
