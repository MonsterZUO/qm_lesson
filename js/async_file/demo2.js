var fs = require('fs');
var path = require('path');

var readDir = function (dir) {
  return new Promise((resolve,reject) => {
    fs.readdir(dir,(err,files) => {
      if (err) {
        reject(err)
      }else {
        resolve(files)
      }
    });
  })
}

var stat = function (path) {
  return new Promise((resolve,reject) => {
    fs.stat(path,(err,stat) => {
      if (err) {
        reject(err)
      }else {
        resolve(stat)
      }
    });
  });
}

var findLargest = (dir) => {
  // 1. readdir 
  // 2. stats
  // 3. 本身也得是
  return readDir(dir)
    .then(files => {
      let promises = files.map(file => stat(path.join(dir,file)));
      return Promise.all(promises).then(stats => {
        return { stats,files }
      })
    })
    .then(data => {
      let largest = data.stats.filter(stat => stat.isFile()).reduce((prev,next) => {
        if (prev.size > next.size) {
          return prev;
        }else {
          return next;
        }
      })
      return data.files[data.stats.indexOf(largest)];
    })
}

findLargest('./src')
  .then(filename => {
    console.log(`最大文件是${filename}`);
  })
  .catch(err => {
    console.log(err);
  })