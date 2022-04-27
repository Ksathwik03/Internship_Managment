var express = require('express');
var router = express.Router();
var passport = require('passport');
const cors = require('cors')
const { isLoggedIn } = require('../middleWare/auth')
router.use(cors())

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

module.exports = router;
