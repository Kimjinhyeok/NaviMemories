import Http from "../Utils/Http";

const http = Http();

const RootPath = '/RC';

const Paths = {
  gets : `${RootPath}`
}

const gets = async (params) => {
  try {
    const {category = 0} = params
    const res = await http.get(`${Paths.gets}/${category}`)

    const { data } = res;

    return data;
  } catch (error) {
    return new Error("NET: ");
  }
}

const CardRepository = {
  gets
}

export default CardRepository;