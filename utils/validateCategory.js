import Joi from "joi";

export function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
  });
  return schema.validate(category);
}
