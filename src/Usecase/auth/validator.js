const checkTrim = (value = "") => {
  return value 
         && value.trim().length > 0
}
const checkAlphabet = (value = "") => {
  return /^([a-zA-Z0-9]{4,16})$/i.test(value);
}
const checkPassword = (password = "") => {
  return checkTrim(password);
}
const comparePassword = (pwd1 = "", pwd2 = "") => {
  return checkPassword(pwd1)
          && checkPassword(pwd2)
          && pwd1 === pwd2
}
const checkEmail = (email = "") => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
const checkPhoneNumber = (phone = "") => {
  return /^\d{3}-\d{4}-\d{4}$/.test(phone);
}

const validatedName = (name="") => {
  return checkTrim(name)
          && name.length >= 2;
}
const validatedEmail = (email = "") => {
  return checkTrim(email) 
          && checkEmail(email);
}
const validatedID = (id = "") => {
  return checkTrim(id) && checkAlphabet(id);
}
const validateSignIn = (id = "", password = "") => {
  return checkTrim(id) && checkPassword(password)
};
const AuthValidator = {
  checkPassword,
  checkPhoneNumber,
  comparePassword,
  validatedID,
  validatedName,
  validatedEmail,
  validateSignIn,
}

export default AuthValidator;