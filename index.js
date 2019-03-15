const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

fs.createReadStream('./data/istex-subset-2019-03-15-10.zip')
    .pipe(unzipper.Parse())
    .on('entry', entry => {
        const fileName = entry.path;
        const type = entry.type; // 'Directory' or 'File'
        if (fileName === 'manifest.json') {
            entry.autodrain();
        }
        else if (fileName.endsWith('.json')) {
            entry.pipe(fs.createWriteStream(__dirname+'/output/'+path.basename(fileName)));
        }
        else {
            entry.autodrain();
        }
    });

