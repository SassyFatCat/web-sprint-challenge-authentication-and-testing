const router = require('express').Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  const credentials = req.body;
  if (credentials.username && credentials.password) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      const hash = bcryptjs.hashSync(credentials.password, rounds);
      credentials.password = hash;
      Users.add(credentials)
          .then(user => {
              const token = makeJWT(user);
              res.status(201).json({ data: user, token });
          })
          .catch(error => {
               res.status(500).json({ message: error.message });
          });
  } else {
      res.status(400).json({
          message: "please provide username and password and password shoud be alphanumeric",
      });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
      Users.findBy({ username: username })
          .then(([user]) => {
              if (user && bcryptjs.compareSync(password, user.password)) {
                  const token = makeJWT(user);
                  res.status(200).json({ token });
              } else {
                  res.status(401).json({ message: "Invalid credentials" });
              }
              })
          .catch(error => {
                  res.status(500).json({ message: error.message });
              });
      } else {
          res.status(400).json({
              message: "please provide username and password and the password shoud be alphanumeric",
          });
      }
});

// Make JSON Web Token
function makeJWT({ id, username}) {
  const payload = {
      username,
      id,
  };
  const config = {
      jwtSecret: process.env.JWT_SECRET || "is it secret, is it safe?",
  };
  const options = {
      expiresIn: "8 hours",
  };

  return jwt.sign(payload, config.jwtSecret, options);
}

module.exports = router;
