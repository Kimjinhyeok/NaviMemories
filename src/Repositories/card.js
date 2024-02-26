import Http from "../Utils/Http";

const http = Http();

export const getCardByCategory = async (category="") => {
  try {
    var response = await http.get({query : `RC/${category}`});
    const data = response.data;
    return data ?? [];
  } catch (error) {
    console.error(error);
    return []
  }
}