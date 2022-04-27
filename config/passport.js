const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const Student = require('../models/student')
const Faculty = require('../models/faculty')


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use('google-stu', new GoogleStrategy({
  clientID: process.env.clientId,
  clientSecret: process.env.clientSecret,
  callbackURL: '/google/callback/student'
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      // console.log(profile)
      let student = await Student.
        findOne({ 'email': profile._json.email })
        .catch((err) => { console.log(err) })

      if (!student) {
        student = new Student({
          'email': profile._json.email,
          'id': profile._json.id
        })
        await student.save()

      }
      return done(null, student)


    } catch (err) {
      console.log(err)
      return done(null, err)
    }

  }
));

passport.use('google-fac', new GoogleStrategy({
  clientID: process.env.clientId,
  clientSecret: process.env.clientSecret,
  callbackURL: '/google/callback/faculty'
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      // console.log(profile)
      let faculty = await Faculty.
        findOne({ 'email': profile._json.email })
        .catch((err) => { console.log(err) })

      if (!faculty) {
        faculty = new Faculty({
          'email': profile._json.email,
          'id': profile._json.id
        })
        await faculty.save()

      }
      return done(null, faculty)


    } catch (err) {
      console.log(err)
      return done(null, err)
    }
  }
));
