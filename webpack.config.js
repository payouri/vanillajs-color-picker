const path = require('path');
module.exports = {
    mode: "production",
    entry: "./index.html",
    output: {
        path: path.resolve(__dirname, "dist"),
        filenames: "bundle.js",
    }
    module: {
        
    }
}