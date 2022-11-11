const { join } = require('path');
const Formidable = require('formidable');

class Helpers {
  static systemSeparator = () => {
    let a = join('test', '1')?.substring(4);
    const b = a.substring(0, a.length-1);

    return b;
  };

  static pathToUrl = (path) => {
    const separator = this.systemSeparator();
    const url = path?.replaceAll(separator, '/');
    const index = url.indexOf('public')+7;
    const newUrl = url.substring(index);

    return newUrl;
  };

  static customFormidable = (req) => new Promise((resolve, reject) => {
    try {
      const form = new Formidable();

      form.parse(req, (err, fields, files) => {
        if (err) throw err;
  
        return resolve({ fields, files });
      });
    } catch (e) {
      return reject(e);
    }
  });

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