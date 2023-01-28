
class HttpError extends Error {
    constructor(message, code){
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);

        this.status_code = code;
    }
}

class AuthenticationError extends HttpError {
    constructor(message, code){
        super(message, code);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

exports.HttpError = HttpError;
exports.AuthenticationError = AuthenticationError;