import Http from "../Utils/Http";

const http = Http();

const RootPath = 'auth';
const Paths = {
  signin : RootPath,
  signUp : `${RootPath}/signup`,
  signout : RootPath,
  leave : `${RootPath}/leave`,
  checkPassword : `${RootPath}/checkPwd`,
  changePassword : `${RootPath}/reset`,
  rqeEmail : `${RootPath}/sendEmail`
}
const signIn = async (params) => {
  try {
    const res = await http.post(Paths.signin, {
      data: params
    });

    const { data } = res;

    return data;
  } catch (error) {
    if(error.response) {
      if(error.response.status == 400) {
        return new Error("NET: 아이디 또는 비밀번호가 일치하지 않습니다.")
      }
    }
  }
}
const signUp = async (params) => {
  try {
    const res = await http.post(Paths.signUp, {
      data: params
    });

    const { data } = res;

    return data;
  } catch (error) {
    if(error.response) {
      if(error.response.status == 400) {
        return new Error("NET: 회원가입 도중 장애가 발생했습니다.")
      } else return error.response;
    } else {
      return error;
    }
  }
}
const signOut = async (params) => {
  try {
    const res = await http.delete(Paths.signout, {
      data: params
    });

    const { data } = res;
    return data;
  } catch (error) {
    if(error.response) {
      if(error.response.status == 400) {
        return new Error("NET: 회원탈퇴 도중 장애가 발생했습니다.")
      } else return error.response;
    } else {
      return error;
    }
  }
}
const leave = async (params) => {
  try {
    const res = await http.delete(Paths.leave, {
      data: params
    });

    const { data } = res;
    return data;
  } catch (error) {
    if(error.response) {
      if(error.response.status == 400) {
        return new Error("NET: 로그아웃 도중 장애가 발생했습니다.")
      } else return error.response;
    } else {
      return error;
    }
  }
}
const checkPassword = async (params) => {
  try {
    const res = await http.post(Paths.checkPassword, {
      data : params
    });

    const { data } = res;
    return data;
  } catch (error) {
    if(error.response) {
      if(error.response.status == 400) {
        return new Error("NET: 비밀번호가 일치하지 않습니다.")
      } else return error.response;
    } else {
      return error;
    }
  }
}
const changePassword = async (params) => {
  try {
    const res = await http.post(Paths.changePassword, {
      data : params
    });

    const { data } = res;
    return data;
  } catch (error) {
    if(error.response) {
      if(error.response.status == 400) {
        return new Error("NET: 비밀번호가 일치하지 않습니다.")
      } else return error.response;
    } else {
      return error;
    }
  }
}
const requestResetEmail = async (params) => {
  try {
    const res = await http.post(Paths.rqeEmail, {
      data : params
    });

    const { data } = res;
    return data;
  } catch (error) {
    if(error.response) {
      if(error.response.status == 400) {
        return new Error("NET: 유효한 이메일이 아닙니다.")
      } else return error.response;
    } else {
      return error;
    }
  }
}
const AuthRepository = {
  signIn,
  signUp,
  signOut,
  leave,
  checkPassword,
  changePassword,
  requestResetEmail
}

export default AuthRepository;