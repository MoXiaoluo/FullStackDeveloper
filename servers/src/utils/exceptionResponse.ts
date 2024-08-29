import { HttpException, HttpStatus } from '@nestjs/common';

export function customExceptionFactory(errors) {
  const errorResponse = {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Failed',
    errors: {},
  };

  errors.forEach((error) => {
    const property = error.property;
    const messages = Object.values(error.constraints);

    if (messages.length > 0) {
      errorResponse.errors[property] = messages.join('. ');
    }
  });

  return new HttpException(errorResponse, errorResponse.statusCode);
}
