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
            entry
                .pipe(ezs(function (data, feed) {
                    if (this.isLast()) {
                        return feed.close();
                    }
                    const obj = JSON.parse(data.toString());
                    feed.write(obj);
                    feed.end();
                }))
                .pipe(ezs('debug'));
        }
        else {
            entry.autodrain();
        }
    });

