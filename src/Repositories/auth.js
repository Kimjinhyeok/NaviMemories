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
  create,
  leave,
}

export default AuthRepository;