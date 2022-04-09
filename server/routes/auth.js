const express = require("express");
const router = express.Router();
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
// @router [GET] api/auth
// @desc check user is authorized
// acces public

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not found" });
    }

    // nếu tồn tại user thì trả lại kêt quả có chứa thông tin đăng nhập của user
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

// @router [POST] api/auth/register
// @desc  register user
// acces public

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({
      success: false,
      message: "missimg username and/or password",
      info: req.body,
    });
  }
  try {
    // check for exiting user
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user name already taken",
      });
    } else {
      // all good
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        userName: userName,
        password: hashedPassword,
      });
      newUser.save();

      //return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "user created successfully",
        accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
});

// @router [POST] api/auth/login
// @desc  login user
// access public
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  /// check validator simple
  if (!userName || !password) {
    return res.json({
      success: false,
      message: "missing user or password",
    });
  }
  try {
    const user = await User.findOne({ userName });

    // check user exiting
    if (!user) {
      return res.json({
        success: false,
        message: "incorrect user or password ",
      });
    }

    // check password
    const passwordValidator = await argon2.verify(user.password, password);
    if (!passwordValidator) {
      return res.json({
        success: false,
        message: "incorrect user or password ",
      });
    }

    // all good
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "login successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal error server",
    });
  }
});

module.exports = router;
