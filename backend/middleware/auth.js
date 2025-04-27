import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  req.body = req.body || {}; 
  const {token} = req.headers; // Extract token from headers
  if(!token){
    return res.json({success : false , message : "Not Authorised login again"});
  }
  try{
    const token_decode = jwt.verify(token,process.env.JWT_SECRET); // Verify token using secret key
    req.body.userId = token_decode.id; // Attach user ID to request body
    next(); // Proceed to the next middleware or route handler
  }catch(error){
    console.log(error);
    res.json({success : false , message : "Eroor!"}); // Handle token expiration or invalid token
  }
}


export default authMiddleware;

