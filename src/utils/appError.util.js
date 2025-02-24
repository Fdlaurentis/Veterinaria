const AppError = (message, statusCode, res) => {
  return res.status(statusCode).json({
    status: "Error",
    message: message
  });
};

module.exports = { AppError };
