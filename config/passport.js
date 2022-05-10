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

      let myArray = profile._json.email.split("@")
      let enrollmentNumber = myArray[0]
      let branch = myArray[0].substring(1,3)

      let student = await Student.
        findOne({ 'email': profile._json.email })
        .catch((err) => { console.log(err) })

      if (!student) {
        student = new Student({
          'email': profile._json.email,
          'id': profile._json.id,
          'enrollmentNumber': enrollmentNumber,
          'branch': branch,
          'name': profile._json.name
        })
        await student.save()

      }
      return done(null, student)

    } catch (err) {
      return done(err, null)
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

      let myArray = profile._json.email.split("@")

      if(myArray[1] != 'iiita.ac.in'){
        return done("Only iiita Allowed", null)
      }

      let faculty = await Faculty.
        findOne({ 'email': profile._json.email })
        .catch((err) => { console.log(err) })

      if (!faculty) {
        faculty = new Faculty({
          'email': profile._json.email,
          'id': profile._json.id,
          'name': profile._json.name
        })
        await faculty.save()
      }

      return done(null, faculty)


    } catch (err) {
      return done(null, err)
    }
  }
));
