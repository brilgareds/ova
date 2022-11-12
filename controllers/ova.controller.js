const { join } = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');
const { pathToUrl } = require('../common/helpers');
const Helpers = require('../common/helpers');

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
  
  static copyOva = (data) => {
    const { newPath, fields } = data;
    const currentPath = join(__dirname, '..', 'plantilla');
  
    try {
      fs.copySync(currentPath, newPath, { overwrite: true });
      fs.writeFileSync(`${newPath}/config.json`, JSON.stringify(fields, null, 4));
    } catch (err) {
      console.error(err);
    }
  };

  static addNewPictures = async (data) => {
    const { files={}, fields, newPath } = data;
    const countFiles = Object.keys(files);
    if (!countFiles) return;
    
    const picturesFolder = join(newPath, 'assets', 'images');

    if (files.presentationPicture) {
      const currentPath = files.presentationPicture.filepath;
      const newPath = join(picturesFolder, 'general-presentation.png');
      Helpers.moveFile({ currentPath, newPath });
    }

    if (files.objectivesPicture) {
      const currentPath = files.objectivesPicture.filepath;
      const newPath = join(picturesFolder, 'general-instructions.png');
      Helpers.moveFile({ currentPath, newPath });
    }

    if (files.contextPicture) {
      const currentPath = files.contextPicture.filepath;
      const newPath = join(picturesFolder, 'background7.png');
      Helpers.moveFile({ currentPath, newPath });
    }

    if (fields.decisionMaking) {
      fields.decisionMaking?.forEach((decision, i) => {
        const nameFile = `decisionMaking_${i+1}.png`;
        const pictureProp = `decisionMakingPicture_${i+1}`;
        const currentPath = files[pictureProp]?.filepath;
        const newPath = join(picturesFolder, nameFile);
        if (currentPath) Helpers.moveFile({ currentPath, newPath });
      });
    }
  };

  static copyOvaAndCompress = async (params) => {
    const { fields, files } = params;
    const newPath = join(__dirname, '..', 'public', 'exports', String(new Date().getTime()), 'ova');

    this.copyOva({ fields, newPath });
    this.addNewPictures({ files, fields, newPath });
    const zipPath = await this.compress(newPath);
    const newUrl = pathToUrl(zipPath);

    return newUrl;
  };
}

module.exports = OvaController;