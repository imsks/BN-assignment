const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../../knexfile");
const Error = require("../../utils/errors");

// FOR TESTING ONLY
exports.test = async (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "This route is only for testing.",
  });
};

// Auth Sign In Route
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  const user = await knex.select("email", "hashedPassword", "isBanker", "token").from("auth").where("email", email);

  if (user) {
    console.log(user)
    bcrypt.compare(password, user[0].hashedPassword, function (err, result) {
      if (result) {
        //create the access token with the shorter lifespan
        let accessToken = jwt.sign(
          { email: user[0].email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "3d",
          }
        );
        

        res.cookie("token", accessToken, { httpOnly: true }).status(200).json({
          success: "Success",
          message: "Sign in successful.",
          data: user,
          accessToken: user[0].token,
        });
      } else {
        res.status(400).json({
          success: "Fail",
          message: Error.errorMessages.signinFailed,
        });
      }
    });
  } else {
    res.status(400).json({
      success: "Fail",
      message: Error.errorMessages.signinFailed,
    });
  }
};

// Auth Sign In Route
exports.signUp = async (req, res) => {
  const { email, password, isBanker } = req.body;

  // 1. Search if the contact already exists
  const isAlreadyRegistered = await knex
    .select("email")
    .from("auth")
    .where("email", email);

  // 2. If not exists
  if (isAlreadyRegistered.length === 0) {
    bcrypt.hash(password, 10, (err, hash) => {
      // Implement JWT
      let accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "3d",
      });

      // Store hash in your password DB.
      knex("auth")
        .insert({ email, hashedPassword: hash, isBanker, token: accessToken })
        .then((data) => {
          knex
            .select("token")
            .from("auth")
            .where("email", email)
            .then((data) => {
              res.status(400).json({
                status: "Success",
                data,
              });
            });
        });
    });
  } else {
    res.status(400).json({
      status: "Fail",
      message: Error.errorMessages.userAlreadyExists,
    });
  }
};

// U1 => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhY2hpbnUxQGdtYWlsLmNvbSIsImlhdCI6MTYwNjIxNzA1OSwiZXhwIjoxNjA2NDc2MjU5fQ.ajRhxdN0SRFV4vwil9QSgu0GQXkhBMJX_7OgWSNb4PY
// U2 => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhY2hpbnUyQGdtYWlsLmNvbSIsImlhdCI6MTYwNjIxNzA5MiwiZXhwIjoxNjA2NDc2MjkyfQ.2-vgLlKmEVp1wUyR7TtQ5vvhtk6A__DmSb25cq_3iiY
// B1 => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhY2hpbmIxQGdtYWlsLmNvbSIsImlhdCI6MTYwNjIxNzExNywiZXhwIjoxNjA2NDc2MzE3fQ.3SPXXfpDsbQCFM1BaUQHkqG5dkuUHuhwf0ajnsrNThI