const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export { asyncHandler };
