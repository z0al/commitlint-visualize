// Packages
const { send, json } = require('micro')
const Joi = require('joi')
const validator = require('micro-joi')

// Ours
const setup = require('./db')

/**
 * Report uploading API
 *
 * @param {*} req
 * @param {*} res
 */
const upload = async (req, res) => {
	const db = await setup()
	const report = await json(req)
	const id = await db.insert(report)

	return send(res, 200, { id })
}

/**
 * Validate JSON body
 */
const wrap = validator(
	Joi.object()
		.keys({
			// Context (mainly to construct commit URLs)
			context: Joi.object()
				.keys({
					repo: Joi.string().required()
				})
				.required(),

			// List of commits
			commits: Joi.array().items(
				Joi.object().keys({
					valid: Joi.boolean().required(),

					errors: Joi.array()
						.items(
							Joi.object().keys({
								level: Joi.number(),
								valid: Joi.boolean(),
								name: Joi.string().required(),
								message: Joi.string().required()
							})
						)
						.default([]),

					warnings: Joi.array()
						.items(
							Joi.object().keys({
								level: Joi.number(),
								valid: Joi.boolean(),
								name: Joi.string().required(),
								message: Joi.string().required()
							})
						)
						.default([])
				})
			)
		})
		.label('report')
)

module.exports = wrap(upload)
