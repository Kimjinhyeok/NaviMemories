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
    
  }
}

const UserRepository = {
  signUp
}

export default UserRepository;