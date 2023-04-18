import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { usersModel } from '../dao/mongoDB/models/users.model.js';
import { hashPassword } from '../utils.js';
import {Strategy as DiscordStrategy} from 'passport-discord';

//local passport
passport.use(
    'registro',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const usuario = await usersModel.find({ email })
        if (usuario.length !== 0) {
          return done(null, false)
        }
        const hashNewPassword = await hashPassword(password)
        const newUser = { ...req.body, password: hashNewPassword }
        const newUserBD = await usersModel.create(newUser)
        done(null, newUserBD)
      }
    )
  )


//discord passport
var DiscordStrategy = require('passport-discord').Strategy;

var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(new DiscordStrategy({
    clientID: '1085287771331121235',
    clientSecret: 'BTr-TXO0uLX_ZmtUcYkEw5V1QzagYR-9',
    callbackURL: 'http://localhost:3000/users/discord',
    scope: scopes
},
 async function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ discordId: profile.id }, function(err, user) {
        return cb(err, user);
    });

    if (!usuario) {
        const nuevoUsuario = {
          first_name: profile._json.name.split(' ')[0],
          last_name: profile._json.name.split(' ')[1] || ' ',
          email: profile._json.email,
          password: ' ',
        }
        const dbResultado = await usersModel.create(nuevoUsuario)
        done(null, dbResultado)
      } else {
        done(null, usuario)
      }}));