import Sequelize from 'sequelize';

class Response {
  static success = (data = null, message = null) => {
    const response = {
      status: 'success',
      code: 200,
    };

    if (data !== null) {
      response.data = data;
    }

    if (message !== null) {
      response.message = message;
    }

    return response;
  }

  static errors = (err) => {
    let errorMessage = {};

    if ((err.code && err.message) || Array.isArray(err)) {
      errorMessage = {
        code: 400,
        message: Array.isArray(err) ? err[0].message : err.message,
      };
    } else if (err.stack) {
      errorMessage = {
        code: 500,
        message: err instanceof Sequelize.ValidationError ? err.errors[0].message : err.message,
      };
    } else {
      errorMessage = {
        code: 400,
        message: err.message !== undefined ? err.message : err,
      };
    }

    const response = {
      status: 'error',
      code: errorMessage.code,
      message: errorMessage.message,
    };
    return response;
  }
}

export default Response;
