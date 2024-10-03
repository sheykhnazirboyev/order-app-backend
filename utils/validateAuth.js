import Joi from "joi";

export function validateAuth(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
}
