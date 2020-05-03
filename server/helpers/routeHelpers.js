import Joi from '@hapi/joi'

function validateBody(schema) {
  return (req, res, next) => {
    try {
      const result = schema.validate(req.body)
      if (result.error) {
        return res.status(400).json(result.error)
      }

      if (!req.value) {
        req.value = {}
      }
      req.value['body'] = result.value
      next()
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}

const schemas = {
  authSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

export { validateBody, schemas }
