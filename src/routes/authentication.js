const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotloggedin } = require('../lib/auth');

// SIGNUP
router.get('/signup', isNotloggedin ,(req, res) => {
  res.render('auth/signup');
});

router.post('/signup', isNotloggedin , passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/signin', isNotloggedin ,(req, res) => {
  res.render('auth/signin');
});

router.post('/signin', isNotloggedin ,(req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});
// CODIGO DE LASS CUENTAS ALMACENADA EN LAS BDD
router.get('/logout', isLoggedIn ,(req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

module.exports = router;
