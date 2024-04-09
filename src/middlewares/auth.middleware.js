import { User } from "../models/users.model";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    // req.cookie is available because of cookie-parser
    const token =
      req.cookies?.accessToken || req.headers["Authorization"].split(" ")[1];

    if (!token) throw new ApiError(401, "Unauthorized request");

    // learn from jwt.io documentation about verification
    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);

    // decodedToken contains information which we give while signing the jwt token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid access token");

    req.user = user; // manually setting the user onto request so that logged in user can be accessed anywhere in the node.
    next();
  } catch (error) {
    new ApiError(400, error?.message || "Invalid access token");
  }
};
