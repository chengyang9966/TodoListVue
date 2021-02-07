const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../Model/User");
const { findById } = require("../Model/User");
//@routes  GET api/auth
// desc get logged user
// access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@routes  POST api/auth
// desc Auth users & get token
// access Public
router.post(
  "/",
  [
    check("email").isEmail().withMessage("Please include a valid email"),
    check("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    console.log("🚀 ~ file: auth.js ~ line 32 ~ req", req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //check email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credential" });
      }

      //password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credential" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      //jwt Token
      jwt.sign(
        payload,
        config.jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
