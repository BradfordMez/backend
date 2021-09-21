const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("./users-model");
const tokenBuilder = require("../tokenBuilder/token-builder");
const { restricted } = require('../middleware/user-middleware')
const mid = require("../middleware/user-middleware");

router.post("/register",
  mid.checkUsernameFree,
  mid.validateUser,
  (req, res, next) => {
    const { username, password, name } = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(password, rounds);
    User.add({ username, name, password: hash })
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch(next);
  }
);

router.post("/login", mid.usernameExists, mid.validateUser, (req, res, next) => {
  // if (bcrypt.compareSync(req.body.password, req.user.password)) {
  //   const token = tokenBuilder(req.user);
  //   res.json({ message: `welcome, ${req.user.username}`, token });
  // } else {
  //   next({ status: 401, message: "invalid credentials" });
  // }
  let { password } = req.body;

  User.findBy(req.body.username)
    .then(([user])=>{
      if (user && bcrypt.compareSync(password, user.password)){
        const token = tokenBuilder(user)
        res.status(200).json({message: `${user.username} is back!`, token})
      }else{
        next({status:401, message: 'Invalid Credentials'})
      }
    })
});

router.get('/', (req, res, next)=>{
  User.get(req.query)
    .then((users)=>{
      res.status(200).json(users)
    })
})

router.get('/:user_id', mid.validateUserId, async (req, res, next )=>{
  res.json(req.user)
})

router.put('/:user_id', mid.validateUserId, async (req, res, next)=>{
  ////////////////////////////////////////////////////////
  User.update(req.params.user_id, req.body)
    .then(()=>{
      return User.findById(req.params.user_id);
    })
    .then((user)=>{
      res.json(user);
    })
    .catch(next)
})

module.exports = router;
