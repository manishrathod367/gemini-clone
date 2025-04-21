
const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequests = 5;

const requestCounts = new Map();

export const rateLimiter = (req, res, next) => {
  const userId = req.user?.email || req.ip;

  const currentTime = Date.now();
  const userData = requestCounts.get(userId) || {
    count: 0,
    firstRequestTimestamp: currentTime,
  };

  if (currentTime - userData.firstRequestTimestamp < rateLimitWindowMs) {
    if (userData.count >= maxRequests) {
      return res.status(429).json({ message: 'Rate limit exceeded' });
    }

    userData.count++;
  } else {
    userData.count = 1;
    userData.firstRequestTimestamp = currentTime;
  }

  requestCounts.set(userId, userData);
  next();
};
