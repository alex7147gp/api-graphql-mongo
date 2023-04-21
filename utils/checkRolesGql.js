const boom = require("@hapi/boom")



function checkRolesGql (user, ...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (!roles.includes(user.role)) {
      throw boom.unauthorized("your role is not allow")
    }
    else {
      next(boom.unauthorized());
    }
  }
}

module.exports = checkRolesGql;