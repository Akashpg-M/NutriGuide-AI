const validateQuery = (requiredParams) => (req, res, next) => {
  for (const param of requiredParams) {
    if (!req.query[param]) {
      return res.status(400).json({ error: `Missing query parameter: ${param}` });
    }
  }
  next();
};

const validateBody = (requiredFields) => (req, res, next) => {
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `Missing body field: ${field}` });
    }
  }
  next();
};

export { validateQuery, validateBody };
