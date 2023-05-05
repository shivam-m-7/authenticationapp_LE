const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const algorithm = process.env.ENCRYPTION_ALGORITHM;
const encryptionKey = process.env.ENCRYPTION_KEY;

const encrypt = (text) => {
  var cipher = crypto.createCipher(algorithm, encryptionKey);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

const decrypt = (text) => {
  try {
    var decipher = crypto.createDecipher(algorithm, key);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  } catch (error) {
    return null;
  }
};

module.exports = { encrypt, decrypt };
