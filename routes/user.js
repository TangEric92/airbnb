const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const db_user = require("../models/db_user");
const db_account = require("../models/db_account");

router.post("/api/user/sign_up", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const token = uid2(16);
    const salt = uid2(16);
    console.log(salt);
    const hash = SHA256(password + salt).toString(encBase64);

    const biography = req.body.biography;
    const newAccount = new db_account({
      username: username,
      biography: biography
    });
    await newAccount.save();
    const newUser = new db_user({
      account: newAccount,
      email: email,
      token: token,
      hash: hash,
      salt: salt,
      password: password
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/api/user/log_in", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await db_user.findOne({ email: email });

  if (user.length !== 0) {
    const salt = user.salt;
    const hash = SHA256(password + salt).toString(encBase64);

    if (hash === user.hash) {
      const userFilterData = await db_user.findOne(
        { email: email },
        { _id: 0, hash: 0, salt: 0, __v: 0 }
      );
      console.log("Vous êtes connectés");

      return res.json(userFilterData);
    } else {
      return res.json("Le mot de passe n'est pas correcte");
    }
  }
  return res.json("L'utilisateur n'existe pas.");
});
module.exports = router;
