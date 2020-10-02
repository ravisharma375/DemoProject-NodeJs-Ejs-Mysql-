const HttpStatus = require("http-status");
const Joi = require("@hapi/joi");
const { HttpError } = require("../../lib/http_error");
const categoryService = require("./categoryService");
class categoryController {
  static async createCategory(req, res) {
    const { body } = req;
    const CategorySchema = Joi.object({
      Name: Joi.string().required(),
    });

    try {
      const { error } = CategorySchema.validate(body);
      if (error) {
        return res.status(HttpStatus.CREATED).send(new HttpError(error.name, error.message));
      }
      const getData = await categoryService.createCategory(body.Name);
      if (getData) {
        return res.status(HttpStatus.CREATED).send({ status: "Success", message: "Category  created successfully." });
      }
      return res.status(HttpStatus.CREATED).json(new HttpError("Bad Request", "Already Exist!"));
    } catch (error) {
      return res.status(HttpStatus.CREATED).json(new HttpError("Error", "Internal Server Error"));
    }
  }
  static async createSubCategory(req, res) {
    const { body } = req;
    const CategorySubSchema = Joi.object({
      subCategoryName: Joi.string().required(),
      subCategoryId: Joi.number().required(),
      status: Joi.string().required(),
    });

    try {
      const { error } = CategorySubSchema.validate(body);
      if (error) {
        return res.status(HttpStatus.CREATED).send(new HttpError(error.name, error.message));
      }
      const getData = await categoryService.createSubCategory(body);
      if (getData) {
        return res
          .status(HttpStatus.CREATED)
          .send({ status: "Success", message: "Sub Category created successfully." });
      }
      return res.status(HttpStatus.CREATED).json(new HttpError("Bad Request", "Already Exist!"));
    } catch (error) {
      return res.status(HttpStatus.CREATED).json(new HttpError("Error", "Internal Server Error"));
    }
  }
}
module.exports = categoryController;
