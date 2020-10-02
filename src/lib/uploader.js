const fs = require("fs");
const HttpStatus = require("http-status");
const Joi = require("@hapi/joi");
const mkdir = require("mkdirp");
const { HttpError } = require("./http_error");

class fileController {
  static async uploadFile(req, res) {
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const file = req.body.fileData;
      const ext = req.body.extensionData;
      const fileBuffer = Buffer.from(file, "base64");
      const base = "public/";
      const dir = `uploads/${year}/${month}/${day}/`;
      const path = base + dir;
      if (!fs.existsSync(path)) {
        await mkdir(path);
      }
      const fileName = `file_${Math.floor(100 + Math.random() * 9000000)}.${ext}`;
      await fs.writeFileSync(path + fileName, fileBuffer, "utf8");
      return res.status(HttpStatus.OK).send({
        status: "success",
        data: {
          message: "File Uploaded Successfully!",
          filePath: dir + fileName,
        },
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(new HttpError(error.code, error.message));
    }
  }
  static async removeFile(filePath) {
    fs.unlinkSync(filePath);
  }
}
module.exports = fileController;
