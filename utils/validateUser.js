import Joi from "joi";

export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().required()
  });
  return schema.validate(user);
}
