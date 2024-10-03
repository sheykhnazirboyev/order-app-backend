import Joi from "joi";

export function validateProduct(category) {
  const schema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    rate: Joi.number().required(),
    price: Joi.number().required(),
    color: Joi.string().required(),
    size: Joi.string().required()
  });
  return schema.validate(category);
}
