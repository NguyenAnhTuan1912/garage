import Joi from "joi";

// Import constants
import {
  ID_LENGTH,
  MAX_CUSTOMER_NAME_LENGTH,
  MIN_CUSTOMER_NAME_LENGTH,
  MIN_ABBR_CUSTOMER_NAME_LENGTH,
  MAX_ABBR_CUSTOMER_NAME_LENGTH,
  MIN_TAXCODE_LENGTH,
  MAX_TAXCODE_LENGTH,
  VIETNAMESE_NAME_REGEX,
  NON_SPECIALCHARS_REGEX,
  VIETNAMESE_PHONENUMBER_REGEX,
} from "../constants";

const repIdValidator = Joi.string()
  .length(ID_LENGTH)
  .messages({
    "string.base": "Representative ID must be a string",
    "string.length": `Representative ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "Representative ID is required",
  });

const paymentIdValidator = Joi.string()
  .length(ID_LENGTH)
  .messages({
    "string.base": "Payment ID must be a string",
    "string.length": `Payment ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "Payment ID is required",
  });

const subpTypeIdValidator = Joi.string()
  .length(ID_LENGTH)
  .messages({
    "string.base": "Subscription type ID must be a string",
    "string.length": `Subscription type ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "Subscription type ID is required",
  });

const bizSecIdValidator = Joi.string()
  .length(ID_LENGTH)
  .messages({
    "string.base": "Business sector ID must be a string",
    "string.length": `Business sector ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "Business sector ID is required",
  });

const nameValidator = Joi.string()
  .pattern(VIETNAMESE_NAME_REGEX)
  .pattern(NON_SPECIALCHARS_REGEX)
  .min(MIN_CUSTOMER_NAME_LENGTH)
  .max(MAX_CUSTOMER_NAME_LENGTH)
  .messages({
    "string.base": "Name must be a string",
    "string.min": `Name must be at least ${MIN_CUSTOMER_NAME_LENGTH} characters`,
    "string.max": `Name must be no more than ${MAX_CUSTOMER_NAME_LENGTH} characters`,
    "any.required": "Name is required",
  });

const frnNameValidator = Joi.string()
  .pattern(VIETNAMESE_NAME_REGEX)
  .pattern(NON_SPECIALCHARS_REGEX)
  .min(MIN_CUSTOMER_NAME_LENGTH)
  .max(MAX_CUSTOMER_NAME_LENGTH)
  .messages({
    "string.base": "Foreign name must be a string",
    "string.min": `Foreign name must be at least ${MIN_CUSTOMER_NAME_LENGTH} characters`,
    "string.max": `Foreign name must be no more than ${MAX_CUSTOMER_NAME_LENGTH} characters`,
    "any.required": "Foreign name is required",
  });

const abbrNameValidator = Joi.string()
  .pattern(VIETNAMESE_NAME_REGEX)
  .pattern(NON_SPECIALCHARS_REGEX)
  .min(MIN_ABBR_CUSTOMER_NAME_LENGTH)
  .max(MAX_ABBR_CUSTOMER_NAME_LENGTH)
  .messages({
    "string.base": "Abbreviation name must be a string",
    "string.min": `Abbreviation name must be at least ${MIN_ABBR_CUSTOMER_NAME_LENGTH} characters`,
    "string.max": `Abbreviation name must be no more than ${MAX_ABBR_CUSTOMER_NAME_LENGTH} characters`,
    "any.required": "Abbreviation name is required",
  });

const taxCodeValidator = Joi.string()
  .pattern(NON_SPECIALCHARS_REGEX)
  .min(MIN_TAXCODE_LENGTH)
  .max(MAX_TAXCODE_LENGTH)
  .messages({
    "string.base": "Tax code must be a string",
    "any.required": "Tax code is required",
  });

const emailValidator = Joi.string()
  .email({ tlds: { allow: false } })
  .messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  });

const phoneValidator = Joi.string()
  .pattern(VIETNAMESE_PHONENUMBER_REGEX)
  .pattern(NON_SPECIALCHARS_REGEX)
  .messages({
    "string.pattern.base":
      "Phone number must be a valid Vietnamese phone number",
    "string.base": "Phone number must be a string",
    "any.required": "Phone number is required",
  });

const addressValidator = Joi.string().pattern(NON_SPECIALCHARS_REGEX).messages({
  "string.base": "Foreign name must be a string",
  "any.required": "Foreign name is required",
});

const subpStartDateValidator = Joi.date().iso().optional().messages({
  "date.base": "Subscription start date must be a valid ISO date string",
  "date.format": "Subscription start date must be in ISO format",
});

export {
  repIdValidator,
  paymentIdValidator,
  subpTypeIdValidator,
  bizSecIdValidator,
  nameValidator,
  frnNameValidator,
  abbrNameValidator,
  taxCodeValidator,
  emailValidator,
  phoneValidator,
  addressValidator,
  subpStartDateValidator,
};
