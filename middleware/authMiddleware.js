const jwt = require("jsonwebtoken");
const user = require("../db/models/user");
const asyncHandler = require("./asyncHandler");

const authentication = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new Error("Please login to get access");
  }

  const tokenDetails = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await user.findByPk(tokenDetails.id);

  if (!currentUser) {
    return next(new Error("User no longer exists"));
  }

  req.user = currentUser;

  return next();
});

const restrictTo = (...userType) => {
  const checkPermission = (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
      return next(new Error("You dont have permission to perform this action"));
    }
    return next();
  };

  return checkPermission;
};

module.exports = { authentication, restrictTo };
