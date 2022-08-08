const errorHandler = (error, request, response, next) => {
  if (error.status === 401 && error.message === "Unauthorized") {
    // defining the HTTP status code
    const status = 401;
    // standard HTTP 401 error message
    const message = "Unauthorized";
    // the link to the hosted version of the "how-to-handle-authentication" HTML page
    // you can find in the /docs folder
    const authority = `${request.protocol}://${request.hostname}:${process.env.PORT}`;
    const documentationLink = `${authority}/docs/how-to-handle-authentication.html`;

    // implementing a custom error response on 401 errors
    // matching the GitHub error response format
    response.status(status).json({
      message: message,
      documentationLink: documentationLink
    });

    return;
  }

  if (
      error.status === 401 &&
      error.code === "invalid_token" &&
      error.message === "Permission denied"
  ) {
    // defining the HTTP status code
    const status = 403;
    // standard HTTP 403 error message
    const message = "Forbidden";
    // the link to the hosted version of the "how-to-handle-authorization" HTML page
    // you can find in the /docs folder
    const authority = `${request.protocol}://${request.hostname}:${process.env.PORT}`;
    const documentationLink = `${authority}/docs/how-to-handle-authorization.html`;

    // implementing a custom error response on 403 errors
    // matching the GitHub error response format
    response.status(status).json({
      message: message,
      documentationLink: documentationLink
    });

    return;
  }

  const status = error.statusCode || error.code || 500;
  const message = error.message || "internal error";

  response.status(status).json({ message });
};

module.exports = {
  errorHandler,
};