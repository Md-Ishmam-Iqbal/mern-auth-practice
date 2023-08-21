const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

export default sendErrorResponse;
