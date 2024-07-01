import Http from "../Utils/Http";

const http = Http();

const RootPath = 'RC';

const Paths = {
  gets : `${RootPath}/500`,
  getContent : `${RootPath}/oyo/content`,
  create : `${RootPath}/oyo`,
  update: `${RootPath}/oyo`,
  delete: `${RootPath}/oyo`,
}

const gets = async (params) => {
  try {
    const res = await http.get(Paths.gets);

    const { data } = res;

    return data;
  } catch (error) {
    
  }
}
const getContent = async (params) => {
  try {
    
    const res = await http.get(Paths.getContent, {data : params});

    const { data } = res;

    return data;
  } catch (error) {
    
  }
}
const create = async (params) => {
  try {

    const res = await http.post(Paths.create, {data : params});

    const { data } = res;

    return data;
  } catch (error) {
    
  }
}
const update = async (params) => {
  try {
    const { id } = params;
    const res = await http.put(`${Paths.update}/${id}`, {data : params});

    const { data } = res;

    return data;
  } catch (error) {
    
  }
}

const remove = async (params) => {
  try {
    
    const { card_num } = params;
    const res = await http.delete(`${Paths.delete}/${card_num}`, params);

    const { data } = res;
    return data;
  } catch (error) {
    
  }
}
const OyoRepository = {
  gets,
  getContent,
  create,
  update,
  delete : remove
}

export default OyoRepository;