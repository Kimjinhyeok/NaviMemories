import CardRepository from "../../Repositories/card"
import OyoRepository from "../../Repositories/oyo"
import CardValidator from "./validator";

const getCardList = async (category) => {

  if(!CardValidator.checkCategory(category)) {
    return new Error("");
  }
  const repository = category == 500 ? OyoRepository : CardRepository;
  const res = await repository.gets({category});
  
  return res;
}


const CardUsecase = {
  getCardList
}

export default CardUsecase;