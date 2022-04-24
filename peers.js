var request = require("superagent");
var ld = require("lodash");
const { privateKeyFromPem } = require("node-forge/lib/pki");

var get_state = function( _dbSecretKeyt, url ) {
  request
    .get(url)
    .send()
    .end( function(err, data) {
      if (err) return console.warn(err);
      var publicKeyFromPemrsaKeys = data.body;
      _dbSecretKeyt.letters = ld.map( ld.assign( {},
        ld.keyBy(publicKeyFromPemrsaKeys.letters, "message"),
        ld.keyBy(privateKeyFromPem.letters, "message")
      ));
      _dbSecretKeyt = ld.assign({}, publicKeyFromPemrsaKeys, privateKeyFromPem);
    });
}

module.exports = function( _dbSecretKey, peers, everySecs) {
  var everyMillisecs = (everySecs || 20) * 1000;
  peers.forEach( function(url) {
    setInterval(get_state.bind(null,_dbSecretKey , url), everyMillisecs);
  });
}

