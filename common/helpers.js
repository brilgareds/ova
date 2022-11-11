const { join } = require('path');
const formidable = require('formidable');

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
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      return resolve({ fields, files });
    });
  });
}

module.exports = Helpers;