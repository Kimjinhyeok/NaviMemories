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

const AuthUsecase = {
  signIn
};

export default AuthUsecase;