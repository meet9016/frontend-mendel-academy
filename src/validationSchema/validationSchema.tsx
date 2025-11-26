import Joi from "joi";

export const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({ "string.empty": "First name is required" }),
  lastName: Joi.string()
    .required()
    .messages({ "string.empty": "Last name is required" }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
});

export const newsLatterSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().trim().messages({
    "string.empty": "Last name is required",
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
  medicalSchool: Joi.string().trim().required().messages({
    "string.empty": "Medical school is required",
  }),
  graduationYear: Joi.string()
    .pattern(/^\d{4}$/)
    .required()
    .messages({
      "string.empty": "Graduation year is required",
      "string.pattern.base": "Enter a valid year (e.g. 2025)",
    }),
});

export const paySchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Full name is required",
    }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be 10 digits",
    }),
});
