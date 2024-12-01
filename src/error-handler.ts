import {
    Injectable,
    BadRequestException,
    ValidationPipe,
    ValidationError,
    Catch,
    UnauthorizedException,
    ExceptionFilter,
    ArgumentsHost,
    ForbiddenException,
    HttpException,
    NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ValidationHandler extends ValidationPipe {
    constructor() {
        super({
            exceptionFactory: (errors: ValidationError[]) => {
                const message = errors.map(error => {
                    return {
                        property: error.property,
                        message: Object.values(error.constraints).join(', '),
                    };
                });

                return new BadRequestException({
                    success: false,
                    error: message,
                });
            },
            stopAtFirstError: false,
        });
    }
}

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>(); const status = exception.getStatus();

        response.status(status).json({
            success: false,
            error: exception.message,
        });
    }
}

@Catch(ForbiddenException)
export class ForbiddenFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>(); const status = exception.getStatus();

        response.status(status).json({
            success: false,
            error: exception.message,
        });
    }
}

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>(); const status = exception.getStatus();

        response.status(status).json({
            success: false,
            error: exception.message,
        });
    }
}