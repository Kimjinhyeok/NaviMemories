import OyoRepository from "../../Repositories/oyo"
import OYO_validator from "./validator";

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
const getBibleContent = async (params) => {
  const validated = OYO_validator.validateContent(params);
  if(validated) return validated;
  
  const { bible_code, chapter, f_verse, l_verse } = params;
  const queryParam = {
    bible_code,
    chapter : Number(chapter),
    f_verse : Number(f_verse),
  };
  if(l_verse > 0) {
    queryParam.l_verse = Number(l_verse);
  }

  const res = await OyoRepository.getContent(queryParam);

  return res;
}
const createOyo = async (params) => {
  
  const validated = OYO_validator.validateCreate(params);
  if(validated) return validated;

  const { bible_code, chapter, f_verse, l_verse = 0, content, theme = "" } = params;
  const queryParam = {
    bible_code,
    chapter : Number(chapter),
    f_verse : Number(f_verse),
    content,
  };
  if(l_verse > 0) {
    queryParam.l_verse = Number(l_verse);
  } if(theme && theme.trim().length > 0) {
    queryParam.theme = theme;
  }

  const res = await OyoRepository.create(queryParam);

  return res;
}
const updateOyo = async (params) => {
  const validated = OYO_validator.validateUpdate(params);
  if(validated) return validated;

  const { card_num, bible_code, chapter, f_verse, l_verse = 0, content, theme = "" } = params;
  const bodyData = {
    id : card_num,
    bible_code,
    chapter : Number(chapter),
    f_verse : Number(f_verse),
    content,
  };
  if(l_verse > 0) {
    bodyData.l_verse = Number(l_verse);
  } if(theme && theme.trim().length > 0) {
    bodyData.theme = theme;
  }

  const res = await OyoRepository.update(bodyData);
  const { data } = res;

  return data;
}
const removeOyo = async (params) => {

  const validated = OYO_validator.validateRemove(params);
  if(validated) return validated;

  const res = await OyoRepository.delete(params);

  return res;
}
const OyoUsecase = {
  getOyoCardList,
  getBibleContent,
  getOyoCardListForManage,
  createOyo,
  updateOyo,
  removeOyo,
}

export default OyoUsecase;