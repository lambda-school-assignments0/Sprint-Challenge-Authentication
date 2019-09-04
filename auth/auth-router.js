const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    // implement registration
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(res.status(201).json(user))
        .catch(err =>
            res
                .status(500)
                .json({ message: "Error: Could not register new user", err })
        );
});

router.post("/login", (req, res) => {
    // implement login
    const { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);

                res.status(200).json({
                    message: `Welcome back, ${username}!`,
                    token
                });
            } else {
                res.status(401).json({ message: "Error: Invalid credentials" });
            }
        })
        .catch(err =>
            res.status(500).json({ message: "Error: Could not login", err })
        );
});

function genToken(user) {
    const payload = {
        subject: "username",
        username: user.username
    };

    // hardcoded for time constraint
    const secret = "notsosecretsecret";

    const options = {
        expiresIn: "1h"
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;
