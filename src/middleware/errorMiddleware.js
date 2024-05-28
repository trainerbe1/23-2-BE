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
      status: err.status,
      statusCode: 500,
      message: err.message
    }).end();
  }
}

export {
  errorMiddleware
}