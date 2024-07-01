import ExamRepository from "../../Repositories/exam";

const getTestCardListForMem = async (params) => {
  const res = await ExamRepository.getCardListForMember(params);

  return res;
};

const getTestCardListforGuest = async (params) => {
  const res = await ExamRepository.getCardListForGuest(params);  

  return res;
}

const getCardList = async (params) => {
  const { mode } = params;

  const repository = mode == 'v' ? getTestCardListforGuest : getTestCardListForMem;
  const res = await repository(params);
  
  if(!res || res.length <= 0) {
    return new Error("암송 카드 목록 조회에 실패했습니다. 다시 시도해주세요.");
  }
  const dividedCardList = devideCardList(res);
  return dividedCardList;
}


function devideCardList(cardlist) { 
  return {
    cn : cardlist.filter((v, i) => (((i+1)%2) == 0)),
    cv : cardlist.filter((v, i) => (((i+1)%2) != 0))
  }
}
const ExamUsecase = {
  getTestCardListForMem,
  getTestCardListforGuest,
  getCardList,
}

export default ExamUsecase;