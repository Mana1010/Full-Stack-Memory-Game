import jwt from "jsonwebtoken";
import "dotenv/config";
function accessToken(id: string) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_KEY!, {
    expiresIn: "1d",
  });
}
function refreshToken(id: string) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY!, {
    expiresIn: "7d",
  });
}

export { accessToken, refreshToken };
