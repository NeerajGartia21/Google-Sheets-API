var jwt = require('jsonwebtoken');

module.exports.signToken = async function (data) {
    try {
        return await jwt.sign(data, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error("Error in fetching access token from Google")
    }
}

module.exports.verifyToken = async function (req, res, next) {
    try {
        const token = req.header('authorization');
        if (!token) return res.status(403).send("Access denied.");
        let decode = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.token = decode;
        next()
    } catch (err) {
        res.status(400).send("Invalid token");
    }
}