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

  const validated = AuthValidator.comparePassword(param);
  if(!validated) {
    return new Error("비밀번호가 일치하지 않습니다.");
  }

  const res = await AuthRepository.changePassword(param);

  return res;
}
const AuthUsecase = {
  signIn,
  checkPassword,
  changePassword
};

export default AuthUsecase;