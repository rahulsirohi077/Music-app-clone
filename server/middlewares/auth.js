import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) return res.status(401).json({
            success: false,
            message: "Token is missing"
        })

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            req.user = decoded
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            })
        }

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }

}

export {auth}