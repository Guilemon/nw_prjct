var monk = require('monk')
// comonk is wrapper for monk. used for wrapping
// object into collections
var wrap = require('co-monk')
var db = monk('localhost/auth')

var users = wrap(db.get('users'))
module.exports.users = users