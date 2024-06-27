const checkID = (id = "") => {
  return id 
         && id.trim().length > 0
}

const checkPassword = (password = "") => {
  return password
         && password.trim().length > 0
}

const validateSignIn = (id, password) => {
  return checkID(id) && checkPassword(password)
};

const comparePassword = (pwd1, pwd2) => {
  return checkPassword(pwd1)
          && checkPassword(pwd2)
          && pwd1 === pwd2
}
const checkEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
const validatedEmail = (email) => {
  return checkID(email) 
          && checkEmail(email);
}
const AuthValidator = {
  validateSignIn,
  checkPassword,
  comparePassword,
  validatedEmail,
}

export default AuthValidator;