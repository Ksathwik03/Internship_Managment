var express = require('express');
var router = express.Router();
var passport = require('passport');
const cors = require('cors')
const { isLoggedIn } = require('../middleWare/auth');
const { registerFaculty, registerStudent, getProfile } = require('../controllers/auth');
router.use(cors({ origin: "http://localhost:3000", credentials: true }))

router.get('/failed', (req, res) => res.send('You Failed to log in!'))

router.get('/login/student', passport.authenticate('google-stu', { scope: ['profile', 'email'] }));
router.get('/login/faculty', passport.authenticate('google-fac', { scope: ['profile', 'email'] }));


router.get('/google/callback/student', passport.authenticate('google-stu', { failureRedirect: '/failed' }),
  function (req, res) {
    res.send("Successfully registered")
  }
);

router.get('/google/callback/faculty', passport.authenticate('google-fac', { failureRedirect: '/failed' }),
  function (req, res) {
    res.send("Successfully registered")
  }
);


router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

router.post('/register/student', isLoggedIn, registerStudent)
router.post('/register/faculty', isLoggedIn, registerFaculty)


router.get('/register/student', isLoggedIn, registerStudent)
router.get('/register/faculty', isLoggedIn, registerFaculty)

router.get('/profile', isLoggedIn, getProfile)
module.exports = router;