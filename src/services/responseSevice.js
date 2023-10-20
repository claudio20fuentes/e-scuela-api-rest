export const successResponse = (statusCode = 200, res) => {
    return {
      statusCode: statusCode,
      success: true,
      body: res,
    };
  }
  
export const  failedResponse = (error_code = '') => {
    let statusCode;
    let body;
  
    switch (error_code) {
      case 'INVALID_CREDENTIALS':
        statusCode = 400;
        body = {
          error_code: 'INVALID_CREDENTIALS',
          error_message: 'The provided credentials are invalid, please try again',
        };
        break;
      case 'UNAUTHORIZED':
        statusCode = 401;
        body = {
          error_code: 'UNAUTHORIZED',
          error_message: 'You are unauthenticated, please log in again',
        };
        break;
      case 'FORBIDDEN':
        statusCode = 403;
        body = {
          error_code: 'FORBIDDEN',
          error_message: 'You are not allowed to access this content',
        };
        break;
      case "NOT_FOUND":
        statusCode = 404;
        body = {
          error_code: "NOT_FOUND",
          error_message: "Couldn't find what you were looking for",
        };
        break;
      default:
        statusCode = 500;
        body = {
          error_code: 'SERVICE_UNAVAILABLE',
          error_message:
            "There's been an error processing your request, please try again in a few minutes",
        };
    }
  
    return {
      statusCode,
      success: false,
      body,
    };
  }