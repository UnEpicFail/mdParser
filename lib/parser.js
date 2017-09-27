var fs = require("fs");

var md = require("node-markdown").Markdown;
var Path = require('path');

var PATHS = {}
function parse(input) {
    let path = Path.normalize(input)
    fs.readFile(path, function (err, data) {
        if (err) {
            throw err;
        }
        let root = md(data.toString())
        //console.log('root', root);
        let current_position = path.split('/').slice(0, -1).join('/')
        
        if (!PATHS[path]) {
            PATHS[path] = true
            let links = (root.match(/href="(.*?)"/g) || [])
            links.map(l => {
                parse(current_position + '/' + l.split('=')[1].replace(/"/g, ''))
            })
        }
        //console.log(PATHS)
    });
}

module.exports.parse = parse