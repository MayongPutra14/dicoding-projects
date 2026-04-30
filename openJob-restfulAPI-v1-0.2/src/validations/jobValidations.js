import Joi from "joi";

export const jobSchema = Joi.object({
  // Identitas & Relasi
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),

  // Detail Pekerjaan
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().required(),

  // Kategori & Tipe
  job_type: Joi.string()
    .valid("full-time", "part-time", "contract", "internship")
    .required(),
  experience_level: Joi.string()
    .valid("junior", "mid", "senior", "expert")
    .required(),
  location_type: Joi.string().valid("remote", "onsite", "hybrid").required(),
  location_city: Joi.string().default("Unknown"),

  // Gaji
  salary_min: Joi.number().integer().min(0).allow(null),
  salary_max: Joi.number().integer().min(Joi.ref("salary_min")).allow(null),

  // Pengaturan Tambahan
  is_salary_visible: Joi.boolean().default(true),
  status: Joi.string().valid("open", "closed").default("open"),
});
