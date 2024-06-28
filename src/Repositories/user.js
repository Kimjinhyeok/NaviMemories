import Http from "../Utils/Http";

const http = Http();

const RootPath = '/user';

const Paths = {
  signup : `${RootPath}/signup`
}

const signUp = async (params) => {
  try {
    const res = await http.post(Paths.signup, {
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

const UserRepository = {
  signUp
}

export default UserRepository;