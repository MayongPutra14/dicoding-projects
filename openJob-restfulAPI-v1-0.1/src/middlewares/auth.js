import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorizarion

    if(!authHeader){
        return res.status(401).json({
            status: 'failed',
            message: 'Unauthorized'
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({
            status: "failed"
,            message: 'Invalid token'
        })        
    }
}

export default authenticate