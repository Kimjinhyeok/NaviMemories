import Http from "../Utils/Http";

const http = Http();

const RootPath = '/oyo'
const Paths = {
  gets: RootPath,
  create : RootPath,
  update : RootPath,
  delete : RootPath,
}

const gets = async (params) => {
  try {
    const res = await http.get(`${Paths.gets}`);

    const { data } = res;
    return data;
  } catch (error) {
    
  }
}
const create = async (params) => {
  try {
    const res = await http.post(`${Paths.create}`, params);

    const { data } = res;
    return data;
  } catch (error) {
    
  }
}
const update = async (params) => {
  try {
    const {id} = params;
    const res = await http.put(`${Paths.gets}/${id}`, params);

    const { data } = res;
    return data;
  } catch (error) {
    
  }
}
const remove = async (params) => {
  try {
    const {id} = params;
    const res = await http.delete(`${Paths.delete}/${id}`);

    const { data } = res;
    return data;
  } catch (error) {
    
  }
}

const OyoRepository = {
  gets,
  create,
  update,
  delete : remove,
}

export default OyoRepository;