const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("../Config/default.json");
const User = require("../Model/User");
const { check, validationResult } = require("express-validator");

//@routes  POST api/users
// desc Register a user
// access Public
router.post(
  "/",
  [
    check("name").not().isEmpty().withMessage("name is required"),
    check("email").isEmail().withMessage("Please include a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please enter a password with 6 or more characters")
      .matches(/\d/)
      .withMessage("Please enter a password that contain a number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      user = new User({
        name,
        email,
        password,
      });
      //password bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
      console.log(error.message);
      res.status(500).send("server Error");
    }
  }
);

module.exports = router;
