// Custom Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  // Set status code to the error status or default to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  // Respond with an error message
  res.json({
    message: err.message,
  });
};