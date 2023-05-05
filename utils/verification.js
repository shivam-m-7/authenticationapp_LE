const emailVerification = (email) => {
  if (
    !/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/.test(
      email
    )
  )
    return false;
  return true;
};

const passwordVerification = (password) => {
  if (password.length > 6) return true;
  return false;
};

const phoneNumberVerification = (phoneNumber) => {
  if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phoneNumber) && phoneNumber.length === 10)
    return true;
  return false;
};

module.exports = {
  emailVerification,
  passwordVerification,
  phoneNumberVerification,
};
