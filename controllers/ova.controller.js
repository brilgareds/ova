const { join } = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');
const { pathToUrl } = require('../common/helpers');

class OvaController {
  static compress = (newPath) => new Promise((resolve, reject) => {
      const fullPath = join(newPath, '..', 'ova.zip');
      const output = fs.createWriteStream(fullPath);
      const archive = archiver('zip');
      output.on('close', function () { resolve(fullPath); });
      archive.on('error', function(err){ reject(err); });
      archive.pipe(output);
    
      // append files from a sub-directory, putting its contents at the root of archive
      archive.directory(newPath, false);
      // append files from a sub-directory and naming it `new-subdir` within the archive
      archive.directory('subdir/', 'new-subdir');
    
      archive.finalize();
  }).catch(console.error);
  
  static copyOva = ({ newPath, data }) => {
    const currentPath = join(__dirname, '..', 'plantilla');
  
    try {
      fs.copySync(currentPath, newPath, { overwrite: true });
      fs.writeFileSync(`${newPath}/config.json`, JSON.stringify(data, null, 4));
    } catch (err) {
      console.error(err);
    }
  };
  
  static copyOvaAndCompress = async (data) => {
    const newPath = join(__dirname, '..', 'public', 'exports', String(new Date().getTime()), 'ova');
  
    this.copyOva({ newPath, data });
    const zipPath = await this.compress(newPath);
    const newUrl = pathToUrl(zipPath);
  
    return newUrl;
  };
}

module.exports = OvaController;