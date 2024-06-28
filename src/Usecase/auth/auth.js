import AuthRepository from "../../Repositories/auth";
import AuthValidator from "./validator";

const signIn = async (params) => {
  const { id = "", pwd : password = "" } = params;

  const validated = AuthValidator.validateSignIn(id, password);

  if(!validated) {
    return new Error("아이디 또는 비밀번호를 정확히 입력해주세요.");
  }

  const res = await AuthRepository.signIn(params);

  return res;
} 
const signUp = async (params, validated) => {

  const validatedResult = Object.keys(validated).every(key => validated[key] === false);

  if(!validatedResult) return new Error("회원가입 규칙을 다시 확인해주세요.");

  const res = await AuthRepository.signUp(params);

  return res;
}
const checkPassword = async (param) => {
  const { password = "" } = param;

  const validated = AuthValidator.checkPassword(password);
  if(!validated) {
    return new Error("비밀번호를 정확히 입력해주세요.")
  }

  const res = await AuthRepository.checkPassword(param);

  return res;
}
const changePassword = async (param) => {
  const { password, passwordRepeat } = param;

  const validated = AuthValidator.comparePassword(password, passwordRepeat);
  if(!validated) {
    return new Error("비밀번호가 일치하지 않습니다.");
  }

  const res = await AuthRepository.changePassword(param);

  return res;
}
const reqResetEmail = async (param) => {
  const { email } = param;

  const validated = AuthValidator.validatedEmail(email);

  if(!validated) {
    return new Error("이메일 양식이 정확하지 않습니다.");
  }

  const res = await AuthRepository.requestResetEmail(param);

  return res;
}

const checkValidatedUserForm = (params) => {
  const {
    password = "",
    passwordRepeat = "",
    id = "",
    name = "",
    email = "",
    mobile = "",
  } = params;

  let validated = {
    password : false,
    passwordRepeat : false,
    id : false,
    name : false,
    email : false,
    mobile : false,
  };

  if(!AuthValidator.checkPassword(password)) validated.password = true;
  if(!AuthValidator.checkPassword(passwordRepeat)) validated.passwordRepeat = true; 
  if(!AuthValidator.validatedID(id)) validated.id = true; 
  if(!AuthValidator.validatedName(name)) validated.name = true; 
  if(!AuthValidator.validatedEmail(email)) validated.email = true; 
  // 핸드폰번호는 required가 아님
  if(mobile && !AuthValidator.checkPhoneNumber(mobile)) validated.mobile = true; 

  return validated;
}
const AuthUsecase = {
  signIn,
  signUp,
  checkPassword,
  changePassword,
  reqResetEmail,
  checkValidatedUserForm
};

export default AuthUsecase;