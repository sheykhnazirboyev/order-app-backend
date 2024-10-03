import Joi from "joi";

export function validateOrder(order) {
  const schema = Joi.object({
    status: Joi.string().required(),
    product_name: Joi.string().required(),
    client_name: Joi.string().required(),
    product_count: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  });
  return schema.validate(order);
}
