import jwt from 'jsonwebtoken'

export const tokenCheck = (req, res, next) => {
    let exclusGET = ["/posts", "/commentaires"]

    if (req.originalUrl.includes("auth") || (req.method === 'GET' && exclusGET.map(u => req.originalUrl.includes(u)).includes(true))) {
        next();
    } else {
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
    }
}

export const cipher = text => {
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let byteHex = n => ("0" + Number(n).toString(16)).substr(-2)
    let applySaltToChar = code => textToChars(process.env.SECRET).reduce((a, b) => a ^ b, code)

    return text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('')
}