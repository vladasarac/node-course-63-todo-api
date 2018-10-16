var {User} = require('./../models/user');
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  User.findByToken(token)
    .then((user) => {
      if(!user){//ako ne nadje usera sa pristiglim tokenom
        return new Promise((resolve, reject) => {
          reject();
        });
      }
      req.user = user;
      req.roken = token;
      next();
    })
    .catch((e) => {//ako token nije validan
      res.status(401).send();
    });
};

module.exports = {authenticate};

