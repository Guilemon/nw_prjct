var passport = require('koa-passport');
var db = require("./lib/db.js");
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    db.users.findOne({ _id: id }, function (err, user) {
        done(err, user);
    });
});
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function (username, password, done) {
    db.users.findOne({ username: username }, function (err, user) {
        if (err) {
            done(err)
        }
        if (!user) {
            done(null, user)
        } else {
            if (username === user.username && password === user.password) {
                done(null, user);
            } else {
                done(null, false);
            }
        }
    });
}));
const GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) +
        '/auth/google/callback'
},
    function (token, tokenSecret, profile, done) {
        //we are using co function to use generator function yield functionality
        co(function* () {
            var user = yield db.users.findOne({ google_id: profile.id });
            if (!user) {
                //fetch google profile and save if not exists
                user = {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.emails[0].value,
                    provider: 'google',
                    password: '1234',
                    google_id: profile.id,
                    imgurl: profile.image.url,
                    gplusurl: profile.url,
                    gender: profile.gender,
                    createdAt: new Date,
                    bdate: new Date,
                    about: 'auth test!!!',
                    updatedAt: new Date
                };
                yield db.users.insert(user);
            }
            done(null, user)
        }).catch();
    }
));
module.exports = passport;