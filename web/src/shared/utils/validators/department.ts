import Joi from "joi";

// Import constants
import {
  ID_LENGTH,
  MIN_DEPARTMENT_NAME_LENGTH,
  MAX_DEPARTMENT_NAME_LENGTH,
  NON_SPECIALCHARS_REGEX,
  VIETNAMESE_NAME_REGEX,
} from "../constants";

const headIdValidator = Joi.string()
  .length(ID_LENGTH)
  .messages({
    "string.base": "Head ID must be a string",
    "string.length": `Head ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "Head ID is required",
  });

const nameValidator = Joi.string()
  .pattern(VIETNAMESE_NAME_REGEX)
  .pattern(NON_SPECIALCHARS_REGEX)
  .min(MIN_DEPARTMENT_NAME_LENGTH)
  .max(MAX_DEPARTMENT_NAME_LENGTH)
  .messages({
    "string.base": "Name must be a string",
    "string.min": `Name must be at least ${MIN_DEPARTMENT_NAME_LENGTH} characters`,
    "string.max": `Name must be no more than ${MAX_DEPARTMENT_NAME_LENGTH} characters`,
    "any.required": "Name is required",
  });

export { headIdValidator, nameValidator };
