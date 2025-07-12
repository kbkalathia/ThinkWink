import { body, param } from "express-validator";

export const validateFetchTodos = [
  param("userId").isMongoId().withMessage("Invalid user ID"),
];

export const validateCreateTodo = [
  param("userId").isMongoId().withMessage("Invalid user ID"),

  body("title").notEmpty().withMessage("Title is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid date"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be true or false"),
];

export const validateUpdateTodo = [
  param("todoId").isMongoId().withMessage("Invalid todo ID"),

  body("title").optional().isString().withMessage("Title must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid date"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];

export const validateDeleteTodo = [
  param("todoId").isMongoId().withMessage("Invalid todo ID"),
];
