import { ClientError } from "../exceptions/ClientError.js";

const errorMiddleware = async (err, req, res, next) => {
  if(!err) {
    next();
    return;
  }

  if (response instanceof Error) {
    if (response instanceof ClientError) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      }).end();
    }

    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: err.message
    }).end();

    const newResponse = h.response({
      status: 'error',
      message: 'terjadi kegagalan pada server kami',
    });
    newResponse.code(500);
    return newResponse;
  }
}

export {
  errorMiddleware
}