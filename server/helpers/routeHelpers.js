import Joi from '@hapi/joi'

function validateBody(schema) {
  return (req, res, next) => {
    console.log('validating', req.body)
    try {
      const result = schema.validate(req.body)
      if (result.error) {
        console.log('not validated')
        return res.status(400).json(result.error)
      }

      if (!req.value) {
        req.value = {}
      }
      console.log('validated')
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
