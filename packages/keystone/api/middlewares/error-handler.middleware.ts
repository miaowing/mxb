import { HttpStatus } from "../../constants/http-status.enum";
import { logger } from "../../logger";

export function errorHandler() {
    return (err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }
        if (!err) {
            return next();
        }

        logger.error(err.message, err);
        res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
        res.json(err.response || { message: err.message, statusCode: HttpStatus.INTERNAL_SERVER_ERROR });
    }
}
