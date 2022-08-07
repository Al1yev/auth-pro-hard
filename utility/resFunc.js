const response = (res, statusCode, status, data, token) => {
  return res.status(statusCode).json({
    status: status,
    data: data,
    token: token,
  });
};

module.exports = response;
