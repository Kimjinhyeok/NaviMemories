import Http from "../Utils/Http"

const http = Http();

const RootPath = 'exam';
const Paths = {
  getsMember : `${RootPath}/mem`, 
  getsGuest : `${RootPath}/guest`, 
}
const getCardListForMember = async (params) => {
  try {
    const res = await http.get(Paths.getsMember, { data : params});
    const { data } = res;
    return data;
  } catch (error) {
    return new Error(error.msg);
  }
}
const getCardListForGuest = async (params) => {
  try {
    const res = await http.get(Paths.getsGuest, { data : params});
    const { data } = res;
    return data;
  } catch (error) {
    return new Error(error.msg);
  }
}

const ExamRepository = {
  getCardListForGuest,
  getCardListForMember
}

export default ExamRepository;