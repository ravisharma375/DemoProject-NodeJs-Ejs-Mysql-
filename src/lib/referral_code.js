function generateCode(length = 6) {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = length; i > 0; i -= 1) result += chars[Math.floor(Math.random() * chars.length)];

  return result;
}

module.exports = { generateCode };
