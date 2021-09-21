const { JWT_SECRET } = require("../secret");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return next({
      status: 401,
      message: "Token required",
    });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return next({
        status: 401,
        message: "Token Invalid",
      });
    req.decodedJwt = decoded;
    next();
  });
};

const checkUsernameFree = async (req, res, next) => {
  try {
    const { username } = req.body
    const users = await Users.findBy({username});
    if (users) {
      next({ status: 422, message: "Username already Exists" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const usernameExists = async (req, res, next)=>{
    try{
        const user = await Users.findBy({username: req.body.username})
        if(user === undefined){
            next({ status: 401, message: "Invalid Credentials"})
        }else{
            req.user = user
            next()
        }
    }catch(err){
        next(err)
    }
}

const validateUser = (req, res, next)=>{
    try{
        const { username, password } = req.body
        if(!username || !username.trim() || typeof username !== 'string' ){
            next({status: 401, message: "Username is required"})
        }
        if(!password || !password.trim() || typeof password !== 'string' ){
            next({status: 401, message: "Password is required"})
        }
        req.body.username = username.trim()
        req.body.password = password.trim()
        next();
    }catch(err){
        next(err)
    }
}

const validateUserId = async (req, res, next,)=>{
  try {
    const user = await Users.findById(req.params.user_id)
    if(!user){
      res.status(404).json({message: 'user not found'})
    }else{
      req.user = user;
      next()
    }
  }catch(err){
    next({status: 500, message: 'Problem finding user'})
  }

}

module.exports = {
  restricted,
  checkUsernameFree,
  usernameExists,
  validateUser,
  validateUserId
};
