const { join } = require('path');

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
}

module.exports = Helpers;