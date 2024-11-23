import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default async function Auth(req, res, next) {
  try {
    const key = req.headers.authorization;
    
    if (!key) {
      return res.status(403).send({ msg: "Unauthorized access" });
    }

    const token = key.split(" ")[1];  // Get token from 'Bearer <token>'
    
    if (!token) {
      return res.status(403).send({ msg: "Token missing" });
    }

    // Verify the JWT token using the secret key
    const auth = await verify(token, process.env.JWT_KEY);

    // Attach user info to the request object
    req.user = auth;

    console.log(auth);  // Optionally log the authenticated user object

    next();  // Continue to the next middleware
  } catch (error) {
    console.error(error);  // Log the error for debugging
    return res.status(403).send({ msg: "Session expired or invalid token" });
  }
}
