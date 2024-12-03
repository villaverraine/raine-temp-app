import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: "Token is missing." });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Verification Failed." })
        }
        req.user = user;
        next();
    })
};

export default authenticateToken;