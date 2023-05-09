class ErrorApi extends Error{
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new Error(404, message)
    }

    static internal(message) {
        return new Error(500, message)
    }

    static forbidden(message) {
        return new Error(403, message)
    }
}

module.exports = ErrorApi
