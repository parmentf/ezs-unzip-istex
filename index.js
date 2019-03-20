const unzipper = require('unzipper');
const fs = require('fs');
const ezs = require('ezs');

fs.createReadStream('./data/istex-subset-2019-03-15-10.zip')
    .pipe(unzipper.Parse())
    .on('entry', entry => {
        const fileName = entry.path;
        const type = entry.type; // 'Directory' or 'File'
        if (fileName === 'manifest.json') {
            entry.autodrain();
        }
        else if (fileName.endsWith('.json')) {
            let str = '';
            entry
                .on('data', buf => {
                    str += buf.toString();
                })
                .on('end', () => {
                    const obj = JSON.parse(str);
                    console.dir(obj);
                });
        }
        else {
            entry.autodrain();
        }
    });

