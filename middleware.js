import jwt from 'jsonwebtoken'

export const tokenCheck = (req, res, next) => {
    if (!req.originalUrl.includes("auth")) {
        let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];

        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Le token n\'est valide'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Non autorisé'
            });
        }
    } else next();
}