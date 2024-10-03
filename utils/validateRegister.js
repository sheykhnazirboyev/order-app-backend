import Joi from "joi";

export function validateRegister(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(5).required(),
    isAdmin: Joi.boolean().default(false)
  });
  return schema.validate(user);
}
