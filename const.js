const JWT_SECRET = process.env.JWT_SECRET || 'super jwt secret'
const JWT_EXPIRY = process.env.NODE_ENV === 'development' ? "1d" : "5h"

module.exports = { JWT_SECRET, JWT_EXPIRY };