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
const getBibleContent = async (params) => {
  const { bible_code, chapter, f_verse, l_verse } = params;
  const validated = true;
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
  const { bible_code, chapter, f_verse, l_verse = 0, content, theme = "" } = params;

  const validated = true;
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
const OyoUsecase = {
  getOyoCardList,
  getBibleContent,
  getOyoCardListForManage,
  createOyo
}

export default OyoUsecase;