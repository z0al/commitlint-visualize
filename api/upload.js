// Packages
const { send, json } = require('micro')
const Joi = require('joi')
const microJoi = require('micro-joi')

/**
 * Report uploading API
 *
 * @param {*} req
 * @param {*} res
 */
const upload = async (req, res) => {
	const report = await json(req)
	const _id = await req.db.insert(report)

	return send(res, 200, { url: `/reports/${_id}` })
}

/**
 * Validate JSON body
 */
const validate = microJoi(
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
					sha: Joi.string().required(),
					valid: Joi.boolean().required(),

					errors: Joi.array()
						.items(
							Joi.object()
								.keys({
									name: Joi.string().required(),
									message: Joi.string().required()
								})
								.unknown()
						)
						.default([]),

					warnings: Joi.array()
						.items(
							Joi.object()
								.keys({
									name: Joi.string().required(),
									message: Joi.string().required()
								})
								.unknown()
						)
						.default([])
				})
			)
		})
		.label('report')
)

module.exports = validate(upload)
