/**
 * Defines the base Nest HTTP exception, which is handled by the default
 * Exceptions Handler.
 *
 * @see [Base Exceptions](https://docs.nestjs.com/exception-filters#base-exceptions)
 *
 * @publicApi
 */
export class HttpException extends Error {
    constructor(
        private readonly response: string | Record<string, any>,
        private readonly status: number,
    ) {
        super();
        this.initMessage();
    }

    public initMessage() {
        if (typeof this.response === 'string') {
            this.message = this.response;
        } else if (
            typeof this.response === 'object' &&
            typeof (this.response as Record<string, any>).message === 'string'
        ) {
            this.message = (this.response as Record<string, any>).message;
        } else if (this.constructor) {
            this.message = this.constructor.name
                .match(/[A-Z][a-z]+|[0-9]+/g)
                .join(' ');
        }
    }

    public getResponse(): string | object {
        return this.response;
    }

    public getStatus(): number {
        return this.status;
    }

    public static createBody(
        objectOrError: object | string,
        message?: string,
        statusCode?: number,
    ) {
        if (!objectOrError) {
            return { statusCode, message };
        }
        return typeof objectOrError === 'object' && !Array.isArray(objectOrError)
            ? objectOrError
            : { statusCode, message: objectOrError, error: message };
    }
}
