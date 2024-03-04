import Http from "../Utils/Http";

const http = Http();

const RootPath = '/RC';

const Paths = {
  gets : `${RootPath}`,
  create : `${RootPath}/oyo`,
  update: `${RootPath}/oyo`,
  delete: `${RootPath}/oyo`,
}

const gets = async (params) => {
  try {
    const {category = 0} = params
    const res = await http.get(`${Paths.gets}/${category}`)

    const { data } = res;

    return data;
  } catch (error) {
    
  }
}
const create = async (params) => {
  try {

    const res = await http.post(Paths.create, params);

    const { data } = res;

    return data;
  } catch (error) {
    
  }
}
const update = async (params) => {
  try {
    
    const { id } = params;
    const res = await http.put(`${Paths.update}/${id}`, params);

    const { data } = res;

    return data;
  } catch (error) {
    
  }
}

const remove = async (params) => {
  try {
    
    const { id } = params;
    const res = await http.delete(`${Paths.delete}/${id}`, params);

    const { data } = res;
    return data;
  } catch (error) {
    
  }
}
const OyoRepository = {
  gets,
  create,
  update,
  delete : remove
}

export default OyoRepository;