const fs = require('fs-extra');
const { join } = require('path');
const Formidable = require('formidable');

class Helpers {
  static systemSeparator = () => {
    let a = join('test', '1')?.substring(4);
    const b = a.substring(0, a.length-1);

    return b;
  };

  static pathToUrl = (path) => {
    if (Array.isArray(path)) {
      return path?.map((realPath) => this.pathToUrl(realPath));
    } else {
      const separator = this.systemSeparator();
      const url = path?.replaceAll(separator, '/');
      const index = url.indexOf('public')+7;
      const newUrl = url.substring(index);
  
      return newUrl;
    }
  };

  static formatfields = (allFields) => {
    const fields = {};

    Object.keys(allFields || {})?.forEach((key) => {
      let value = allFields[key];

      try {
        value = JSON.parse(allFields[key]);
      } catch (e) {
        if (!isNaN(allFields[key])) value = Number(allFields[key]);
      }

      fields[key] = value;
    });

    return fields;
  };

  static validFileSize = (file) => {

  };

  static filterFiles = (allFiles) => {
    let filesFiltered = {};

    Object.keys(allFiles || {})?.forEach((key) => {
      const isArray = Array.isArray(allFiles[key]);

      if (!isArray) {
        const file = allFiles[key];
        const fileValue = (file.size) ? file : false;
        filesFiltered[key] = fileValue;
      }
      else {
        const files = allFiles[key];
        filesFiltered[key] = [];

        files?.forEach((file) => {
          const fileValue = (file.size) ? file : false;
          filesFiltered[key].push(fileValue);
        });
      }
    });

    return filesFiltered;
  };

  static customFormidable = ({ req }) => new Promise((resolve, reject) => {
    try {
      const form = Formidable({
        maxFileSize: 800 * 1024 * 1024
      });

      form.parse(req, (err, allFields, allFiles) => {
        if (err) throw err;
  
        const fields = this.formatfields(allFields);
        const files = this.filterFiles(allFiles);

        return resolve({ fields, files });
      });
    } catch (e) {
      return reject(e);
    }
  });

  static moveFile = ({ currentPath, newPath }) => {
    try {
      fs.copySync(currentPath, newPath);
      fs.removeSync(currentPath);
    } catch (e) {
      throw new Error(e);
    }
  };

  static asyncFormidable = (req) => new Promise((resolve, reject) => {
    const form = new Formidable({
      multiples: true,
      maxFileSize: 800 * 1024 * 1024,
    });
  
    form.parse(req, (err, fields, files) => {
      if (err) return reject(new Error(err.message));
  
      return resolve({ fields, files });
    });
  });
}

module.exports = Helpers;