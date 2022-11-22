const { join } = require('path');
const fs = require('fs-extra');
const rimraf = require("rimraf");
const archiver = require('archiver');
const Helpers = require('../common/helpers');

class OvaController {
  static compress = (newPath) => new Promise((resolve, reject) => {
      const separator = Helpers.systemSeparator();
      const appVersion = newPath.substring(newPath.lastIndexOf(separator)+1);
      const fullPath = join(newPath, '..', `ova_${appVersion}.zip`);
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
    const { currentPath1, currentPath2, newPath1, newPath2, fields } = data;

    try {
      fs.copySync(currentPath1, newPath1, { overwrite: true });
      fs.writeFileSync(`${newPath1}/config.json`, JSON.stringify(fields, null, 4));
    } catch (err) {
      console.error(err);
    }

    try {
      fs.copySync(currentPath2, newPath2, { overwrite: true });
      fs.writeFileSync(`${newPath2}/config.json`, JSON.stringify(fields, null, 4));
    } catch (err) {
      console.error(err);
    }
  };

  static addNewPictures = async (data) => {
    const { files={}, fields, newPath1, newPath2 } = data;
    const countFiles = Object.keys(files)?.length;
    if (!countFiles) return;
    
    const picturesFolder1 = join(newPath1, 'assets', 'images');
    const picturesFolder2 = join(newPath2, 'assets', 'images');

    if (files.welcomePicture) {
      const currentPath = files.welcomePicture.filepath;
      const newPath1 = join(picturesFolder1, 'welcomePicture.png');
      const newPath2 = join(picturesFolder2, 'welcomePicture.png');

      fs.copySync(currentPath, newPath1);
      fs.copySync(currentPath, newPath2);
      rimraf.sync(currentPath);
    }

    if (files.presentationPicture) {
      const currentPath = files.presentationPicture.filepath;
      const newPath1 = join(picturesFolder1, 'general-presentation.png');
      const newPath2 = join(picturesFolder2, 'general-presentation.png');

      fs.copySync(currentPath, newPath1);
      fs.copySync(currentPath, newPath2);
      rimraf.sync(currentPath);
    }

    if (files.objectivesPicture) {
      const currentPath = files.objectivesPicture.filepath;
      const newPath1 = join(picturesFolder1, 'general-instructions.png');
      const newPath2 = join(picturesFolder2, 'general-instructions.png');

      fs.copySync(currentPath, newPath1);
      fs.copySync(currentPath, newPath2);
      rimraf.sync(currentPath);
    }

    if (files.contextPicture) {
      const currentPath = files.contextPicture.filepath;
      const newPath1 = join(picturesFolder1, 'contextPicture-small.png');
      const newPath2 = join(picturesFolder2, 'contextPicture-small.png');

      fs.copySync(currentPath, newPath1);
      fs.copySync(currentPath, newPath2);
      rimraf.sync(currentPath);
    }

    if (files.contextPictureBig) {
      const currentPath = files.contextPictureBig.filepath;
      const newPath1 = join(picturesFolder1, 'contextPicture-big.png');
      const newPath2 = join(picturesFolder2, 'contextPicture-big.png');

      fs.copySync(currentPath, newPath1);
      fs.copySync(currentPath, newPath2);
      rimraf.sync(currentPath);
    }

    if (fields.decisionMaking) {
      fields.decisionMaking?.forEach((decision, i) => {
        const nameFile = `decisionMaking_${i+1}.png`;
        const nameFile2 = `answersCompleted_${i+1}.png`;

        const pictureProp = `decisionMakingPicture_${i+1}`;
        const pictureProp2 = `answersCompleted_${i+1}`;

        const currentPath = files[pictureProp]?.filepath;
        const currentPath2 = files[pictureProp2]?.filepath;

        if (currentPath) {
          const newPath1 = join(picturesFolder1, nameFile);
          const newPath2 = join(picturesFolder2, nameFile);

          fs.copySync(currentPath, newPath1);
          fs.copySync(currentPath, newPath2);
          rimraf.sync(currentPath);
        }

        if (currentPath2) {
          const newPath1 = join(picturesFolder1, nameFile2);
          const newPath2 = join(picturesFolder2, nameFile2);

          fs.copySync(currentPath2, newPath1);
          fs.copySync(currentPath2, newPath2);
          rimraf.sync(currentPath2);
        }

        decision.options?.forEach((_v, j) => {
          const nameFile3 = `incorrectAnswer_${i+1}_${j+1}.png`;
          const pictureProp3 = `incorrectAnswer_${i+1}_${j+1}`;
          // incorrectAnswer_2_2
          const currentPath3 = files[pictureProp3]?.filepath;
  
          if (currentPath3) {
            const newPath1 = join(picturesFolder1, nameFile3);
            const newPath2 = join(picturesFolder2, nameFile3);
  
            fs.copySync(currentPath3, newPath1);
            fs.copySync(currentPath3, newPath2);
            rimraf.sync(currentPath3);
          }
        });
      });
    }
  };

  static copyOvaAndCompress = async (params) => {
    const { fields, files } = params;
    const version1 = 'SCORM_1.2';
    const version2 = 'SCORM_2004';
    const mainPath = join(__dirname, '..', 'public', 'exports', String(new Date().getTime()), 'todas_las_versiones');
    const templatesFolder = join(__dirname, '..', 'plantilla');

    const currentPath1 = join(templatesFolder, version1);
    const newPath1 = join(mainPath, version1);

    const currentPath2 = join(templatesFolder, version2);
    const newPath2 = join(mainPath, version2);
    const newPath3 = join(mainPath);

    this.copyOva({ fields, currentPath1, currentPath2, newPath1, newPath2 });
    this.addNewPictures({ files, fields, newPath1, newPath2 });

    await Promise.all([
      this.compress(newPath1),
      this.compress(newPath2),
    ]);

    rimraf.sync(newPath1);
    rimraf.sync(newPath2);

    const zipPath = await this.compress(newPath3);
    rimraf.sync(newPath3);

    const newUrls = Helpers.pathToUrl(zipPath);

    return newUrls;
  };
}

module.exports = OvaController;