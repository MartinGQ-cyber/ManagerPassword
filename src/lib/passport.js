const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

//ESTO ES PARA EL REGISTRO
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { ape1,ape2,email } = req.body; //de aqui cogo los otros datos del usuario del form sign up
  let newUser = {
    username,
    ape1,
    ape2,
    email,
    password
  };
  newUser.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO DatosUsers SET ? ', newUser); /// El objeto new user se  lo pasare a mi nueva bdd
  newUser.id = result.insertId;
  return done(null, newUser);
}));

// ESTO ES PARA EL LOGIN
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM DatosUsers WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido', user.username));
    } else {
      done(null, false, req.flash('message', ' Contraseña errónea'));
    }
  } else {
    return done(null, false, req.flash('message', 'No existe el usuario'));
  }
}));
//ESTO ES PARA LAS CUENTAS ALMACENADAS EN LA BDD





passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM DatosUsers WHERE id = ?', [id]);
  done(null, rows[0]);
});

