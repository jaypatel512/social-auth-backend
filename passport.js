'use strict'

require('./mongoose')()
var passport = require('passport')
var GoogleTokenStrategy = require('passport-google-token').Strategy
var User = require('mongoose').model('User')
var googleAuthConfig = require('./config/keys').googleAuth

module.exports = () => {
    passport.use(new GoogleTokenStrategy({
        clientID: googleAuthConfig.CLIENT_ID,
        clientSecret: googleAuthConfig.CLIENT_SECRET
    }, function (accessToken, refreshToken, profile, done) {
        console.log("Google Passport Received: ", accessToken, refreshToken, profile, done)
        User.upsertGoogleUser(accessToken, refreshToken, profile, function (err, user) {
            return done(err, user)
        })
    }))
}