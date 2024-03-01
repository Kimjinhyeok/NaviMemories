import Http from "../Utils/Http";

const http = Http();

const Paths = {
  gets : '/RC',
}
const gets = async (category="") => {
  try {
    const res = await http.get(`${Paths.gets}/${category}`);
    const { data } = res;
    return data ?? [];
  } catch (error) {
    console.error(error);
    return []
  }
}

const CardRepository = {
  gets,
}

export default CardRepository;