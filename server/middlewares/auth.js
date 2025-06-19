import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {

    try {
        const cookie = req.cookies.token;

        if (!token) return res.status(401).json({
            success: false,
            message: "Token is missing"
        })

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
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