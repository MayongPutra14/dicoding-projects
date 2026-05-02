import Joi from "joi";

export const applicationSchema = Joi.object({
  user_id: Joi.string().required().messages({
    "any.required": "User ID wajib diisi",
  }),

  job_id: Joi.string().required().messages({
    "any.required": "Job ID wajib diisi",
  }),

  status: Joi.string()
    .valid("pending", "accepted", "rejected")
    .default("pending"),
});
