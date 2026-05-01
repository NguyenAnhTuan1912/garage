import Joi from "joi";

// Import constants
import { ID_LENGTH } from "../constants";

const companyIdValidator = Joi.string()
  .length(ID_LENGTH)
  .required()
  .messages({
    "string.base": "Company ID must be a string",
    "string.length": `Company ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "Company ID is required",
  });

const departmentIdValidator = Joi.string()
  .length(ID_LENGTH)
  .required()
  .messages({
    "string.base": "Department ID must be a string",
    "string.length": `Department ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "Department ID is required",
  });

const idValidator = Joi.string()
  .length(ID_LENGTH)
  .required()
  .messages({
    "string.base": "ID must be a string",
    "string.length": `ID must be exactly ${ID_LENGTH} characters`,
    "any.required": "ID is required",
  });

const createdDateValidator = Joi.date().iso().optional().messages({
  "date.base": "Created Date must be a valid ISO date string",
  "date.format": "Created Date must be in ISO format",
});

const updatedDateValidator = Joi.date().iso().optional().messages({
  "date.base": "Updated Date must be a valid ISO date string",
  "date.format": "Updated Date must be in ISO format",
});

export {
  companyIdValidator,
  departmentIdValidator,
  idValidator,
  createdDateValidator,
  updatedDateValidator,
};
