const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Authorization header not found!',
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token is missing!',
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({
            success: false,
            message: 'Invalid token!',
        });
    }
};

const adminGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Authorization header not found!',
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token is missing!',
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedUser.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Permission denied!',
            });
        }

        req.user = decodedUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({
            success: false,
            message: 'Invalid token!',
        });
    }
};

module.exports = {
    authGuard,
    adminGuard,
};
