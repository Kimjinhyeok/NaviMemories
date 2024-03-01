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

const AuthValidator = {
  validateSignIn
}

export default AuthValidator;