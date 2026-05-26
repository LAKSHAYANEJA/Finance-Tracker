const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try{

        // Get token from header
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({message: 'No token, access denied'});
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user id to request 

        req.user = decoded;

        next();
    }
    catch(error){
        res.status(401).json({message: 'Token is invalid or expired'});
    }
};

module.exports = protect;