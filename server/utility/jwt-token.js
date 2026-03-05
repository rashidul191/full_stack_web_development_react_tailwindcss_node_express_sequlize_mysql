const jwt = require("jsonwebtoken");

module.exports.generateToken = (auth) => {

  const payload = {
    id: auth.id,
    email: auth.email,
    role: auth.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d", // 2day
  });

  console.log(token);

  // res.cookie("access-token", token, {
  //   httpOnly: true,
  // });

  return token;
};
