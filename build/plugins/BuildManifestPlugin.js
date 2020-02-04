const path = require('path');
const fs = require('fs');

function BuildManifestPlugin() {}

BuildManifestPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compiler, callback) => {
    let manifest = JSON.stringify(
      compiler.getStats().toJson().assetsByChunkName,
    );
    compiler.assets['manifest.json'] = {
      source: function() {
        return manifest;
      },
      size: function() {
        return manifest.length;
      },
    };

    callback();
  });
};

module.exports = BuildManifestPlugin;
