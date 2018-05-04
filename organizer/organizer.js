const fs = require('fs');

const dMapper = {
  'images': ['png', 'jpg', 'jpeg'],
  'audios': ['mp3', 'flac'],
  'videos': ['mkv', 'avi', 'mp4'],
  'documents': ['pdf', 'doc', 'docx', 'epub', 'mobi'],
  'softwares': ['dmg', 'pkg'],
  'code': ['js', 'json'],
  'torrents': ['torrent'],
  'compressed': ['zip'],
};

module.exports = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const splitted = file.split('.');
    const ext = splitted[splitted.length-1];
    Object.keys(dMapper).forEach((type) => {
      const typeArr = dMapper[type];
      if(typeArr.indexOf(ext) > -1) {
        if (!fs.existsSync(`${dir}/${type}`)){
            fs.mkdirSync(`${dir}/${type}`);
        }
        fs.rename(`${dir}/${file}`, `${dir}/${type}/${file}`, (err) => {
          if (err) throw err;
        });
      }
    });
  });
};
