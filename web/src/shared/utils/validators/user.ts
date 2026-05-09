import Joi from "joi";

// Import constants
import {
  ID_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
  NON_SPECIALCHARS_REGEX,
  VIETNAMESE_NAME_REGEX,
  VIETNAMESE_PHONENUMBER_REGEX,
} from "../constants";

const roleIdValidator = Joi.string()
  .length(ID_LENGTH)
  .required()
  .messages({
    "string.base": "Role ID must be a string",
    "string.length": `Role ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "Role ID is required",
  });

const usernameValidator = Joi.string()
  .pattern(NON_SPECIALCHARS_REGEX)
  .min(MIN_USERNAME_LENGTH)
  .max(MAX_USERNAME_LENGTH)
  .messages({
    "string.pattern.base":
      "Username must be a valid username. Don't include any special character.",
    "string.base": "Username must be a string",
    "string.empty": "Username cannot be empty",
    "string.min": `Username must be at least ${MIN_USERNAME_LENGTH} characters`,
    "string.max": `Username must be no more than ${MAX_USERNAME_LENGTH} characters`,
    "any.required": "Username is required",
  });

const passwordValidator = Joi.string()
  .pattern(PASSWORD_REGEX)
  .min(MIN_PASSWORD_LENGTH)
  .messages({
    "string.pattern.base":
      "Must be a valid password. At least one special character, uppercase character and number in password!",
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": `Password must be at least ${MIN_USERNAME_LENGTH} characters`,
    "any.required": "Password is required",
  });

const emailValidator = Joi.string()
  .email({ tlds: { allow: false } })
  .messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  });

const phoneNumberValidator = Joi.string()
  .pattern(VIETNAMESE_PHONENUMBER_REGEX)
  .pattern(NON_SPECIALCHARS_REGEX)
  .messages({
    "string.pattern.base":
      "Phone number must be a valid Vietnamese phone number",
    "string.base": "Phone number must be a string",
    "any.required": "Phone number is required",
  });

const fullNameValidator = Joi.string()
  .pattern(VIETNAMESE_NAME_REGEX)
  .pattern(NON_SPECIALCHARS_REGEX)
  .messages({
    "string.base": "Full name must be a string",
    "string.empty": "Full name cannot be empty",
    "string.pattern.base":
      "Full name must be in proper format (e.g., Nguyen Van A)",
    "any.required": "Full name is required",
  });

export {
  roleIdValidator,
  usernameValidator,
  passwordValidator,
  emailValidator,
  phoneNumberValidator,
  fullNameValidator,
};
