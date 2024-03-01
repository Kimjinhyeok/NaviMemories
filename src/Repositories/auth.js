import Http from "../Utils/Http";

const http = Http();

const RootPath = '/auth';
const Paths = {
  signin : RootPath,
  signout : RootPath,
  leave : `${RootPath}/leave`,
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

const signOut = async (params) => {
  try {
    const res = await http.delete(Paths.signout, {
      data: params
    });

    const { data } = res;
    return data;
  } catch (error) {
    
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
    
  }
}

const AuthRepository = {
  signIn,
  signOut,
  leave,
}

export default AuthRepository;