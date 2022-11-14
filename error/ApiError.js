export default class ApiError extends Error {
    status;
    error;

    constructor(status, message, err = []) {
        super(message);
        this.status = status;
        this.err = err;
    }

    static badRequest(message, err = []) {
        return new ApiError(400, message, err);
    }

    static notFound(message, err) {
        return new ApiError(404, message, err);
    }

    static authorizationFailure() {
        return new ApiError(401, "Ошибка авторизации");
    }

    static unknownError() {
        return new ApiError(520, "Неизвестная ошибка");
    }
};