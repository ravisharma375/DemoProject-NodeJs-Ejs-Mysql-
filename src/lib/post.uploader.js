const fs = require("fs");
const HttpStatus = require("http-status");
const Joi = require("@hapi/joi");
const mkdir = require("mkdirp");
const { HttpError } = require("./http_error");

class fileController {
  static async uploadFile(extensionData, fileData) {
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const file = fileData;
      const ext = extensionData;
      const fileBuffer = Buffer.from(file, "base64");
      const base = "public/";
      const dir = `uploads/${year}/${month}/${day}/`;
      const path = base + dir;
      if (!fs.existsSync(path)) {
        await mkdir(path);
      }
      const fileName = `file_${Math.floor(100 + Math.random() * 9000000)}.${ext}`;
      await fs.writeFileSync(path + fileName, fileBuffer, "utf8");
      return dir + fileName;
    } catch (error) {
      return false;
    }
  }

  static async removeFile(filePath) {
    try {
      const del = fs.unlinkSync(`public/${filePath}`);
      console.log(del);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = fileController;
