import OyoRepository from "../../Repositories/oyo"

const getOyoCardList = async () => {
  const res = await OyoRepository.gets();

  return res;
}

const getOyoCardListForManage = async () => {
  const cardList = await getOyoCardList();

  const editableCardList = cardList.map(item => {
    item.edited = false;
    return item;
  });

  return editableCardList;
}
const OyoUsecase = {
  getOyoCardList,
  getOyoCardListForManage
}

export default OyoUsecase;