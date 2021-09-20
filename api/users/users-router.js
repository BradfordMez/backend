const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("./users-model");
const { tokenBuilder } = require("../tokenBuilder/token-builder");
const mid = require("../middleware/user-middleware");

router.post(
  "/register",
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

router.post("/login", mid.usernameExists, (req, res, next) => {
  let { password } = req.body;
  console.log(req.user);
  if (bcrypt.compareSync(password, req.user.password)) {
    const token = tokenBuilder(req.user);
    res.json({ message: `welcome, ${req.user.username}`, token });
  } else {
    next({ status: 401, message: "Invalid Credentials" });
  }
});

module.exports = router;
