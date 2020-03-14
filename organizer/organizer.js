const fs = require('fs');

const dMapper = {
  'images': ['png', 'jpg', 'jpeg', 'heic'],
  'audios': ['mp3', 'flac'],
  'videos': ['mkv', 'avi', 'mp4'],
  'documents': ['pdf', 'doc', 'docx', 'epub', 'mobi'],
  'softwares': ['dmg', 'pkg'],
  'code': ['js', 'json', 'py'],
  'torrents': ['torrent'],
  'compressed': ['zip'],
};

module.exports = (dir) => {
  // Traversing every file in the directory
  fs.readdirSync(dir).forEach(file => {
    // Getting the extension of the file by splitting by dot and taking the last element
    const splitted = file.split('.');
    const ext = splitted[splitted.length-1];
    // Traversing the directory mapper object
    Object.keys(dMapper).forEach((type) => {
      // Getting each extension array
      const typeArr = dMapper[type];
      // If our current file extension is a part of current directory type, will move the file into that folder
      if(typeArr.indexOf(ext.toLowerCase()) > -1) {
        // If organized folder is not available, create one
        if (!fs.existsSync(`${dir}/${type}`)){
            fs.mkdirSync(`${dir}/${type}`);
        }
        // Moving the file into corresponding directory
        fs.rename(`${dir}/${file}`, `${dir}/${type}/${file}`, (err) => {
          if (err) throw err;
        });
      }
    });
  });
};
