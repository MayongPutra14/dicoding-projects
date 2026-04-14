import { loginUser } from "../services/authService";
export const login = async (req, res, next) => {
    try {
        const tokens = await loginUser(req.body)

        res.json({
            status: 'success',
            data: tokens
        })
    } catch (error) {
        next(error)
    }
}