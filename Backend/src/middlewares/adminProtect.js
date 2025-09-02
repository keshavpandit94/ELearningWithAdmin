export const adminProtect = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (token && token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Invalid admin token." });
  }
};
