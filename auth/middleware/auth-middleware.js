import ApiError from "../../error/ApiError.js";
import TokenService from "../service/tokenService.js";

export default function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(ApiError.authorizationFailure());
        }
        const userData = TokenService.validateAccessToken(token);
        if (!userData) {
            return next(ApiError.authorizationFailure());
        }
        req.user = userData;
        next();
    } catch (e) {
        ApiError.authorizationFailure();
    }
}