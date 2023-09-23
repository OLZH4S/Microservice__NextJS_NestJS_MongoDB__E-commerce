import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus ? exception.getStatus() : 500; 
        const message = exception || 'Internal server error';

        response.status(status).json({
            statusCode: status,
            message,
        });

    }
}