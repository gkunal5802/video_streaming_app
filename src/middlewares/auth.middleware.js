import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, _, next) => {
  try {
    // req.cookie is available because of cookie-parser
    const token =
      req.cookies?.accessToken || req.headers("Authorization").split(" ")[1];

    if (!token) throw new ApiError(401, "Unauthorized request");

    // learn from jwt.io documentation about verification
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // decodedToken contains information which we give while signing the jwt token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid access token");

    req.user = user; // manually setting the user onto request so that logged in user can be accessed anywhere in the node.
    next();
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid access token");
  }
};
