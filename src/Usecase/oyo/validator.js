const NumberIsRequired = (value) => {
  return value != undefined && Number(value) > 0;
}
const StringIsRequired = (value = "") => {
  return value && value.trim().length > 0;
}
const checkCardNum = (card_num) => StringIsRequired(card_num);
const checkBibleCode = (bible_code) => NumberIsRequired(bible_code);
const checkChapter = (chapter) => NumberIsRequired(chapter);
const checkFirstVerse = (f_verse) => NumberIsRequired(f_verse);
const checkLastVerse = (l_verse) => NumberIsRequired(l_verse);

const checkContent = (content) => {
  return content && content.trim().length > 0
}

const checkTheme = (theme) => {
  return theme && theme.trim().length > 0
}

const validateContent = (params) => {
  const {
    bible_code, chapter, f_verse, l_verse
  } = params;
  if(!checkBibleCode(bible_code)) {
    return new Error("성경을 올바르게 설정해주세요.")
  } if(!checkChapter(chapter)) {
    return new Error("장 번호를 올바르게 설정해주세요.")
  } if(!checkFirstVerse(f_verse)) {
    return new Error("구절을 올바르게 설정해주세요.")
  } if(l_verse && !checkLastVerse(l_verse)) {
    return new Error("구절 끝절을 올바르게 설정해주세요.")
  }
}
const validateCreate = (params) => {
  const {
    bible_code, chapter, f_verse, l_verse, content, theme
  } = params;

  if(!checkBibleCode(bible_code)) {
    return new Error("성경을 올바르게 설정해주세요.")
  } if(!checkChapter(chapter)) {
    return new Error("장 번호를 올바르게 설정해주세요.")
  } if(!checkFirstVerse(f_verse)) {
    return new Error("구절을 올바르게 설정해주세요.")
  } if(!checkContent(content)) {
    return new Error("구절 내용을 올바르게 설정해주세요.")
  } if(l_verse && !checkLastVerse(l_verse)) {
    return new Error("구절 끝절을 올바르게 설정해주세요.")
  } if(theme && !checkTheme(theme)) {
    return new Error("주제를 올바르게 설정해주세요.")
  }
}
const validateUpdate = (params) => {
  const {
    card_num, bible_code, chapter, f_verse, l_verse, content, theme
  } = params;

  if(!checkCardNum(card_num)) {
    return new Error("올바른 암송 카드를 선택해주세요.")
  } if(!checkBibleCode(bible_code)) {
    return new Error("성경을 올바르게 설정해주세요.")
  } if(!checkChapter(chapter)) {
    return new Error("장 번호를 올바르게 설정해주세요.")
  } if(!checkFirstVerse(f_verse)) {
    return new Error("구절을 올바르게 설정해주세요.")
  } if(!checkContent(content)) {
    return new Error("구절 내용을 올바르게 설정해주세요.")
  } if(l_verse && !checkLastVerse(l_verse)) {
    return new Error("구절 끝절을 올바르게 설정해주세요.")
  } if(theme && !checkTheme(theme)) {
    return new Error("주제를 올바르게 설정해주세요.")
  }
}
const validateRemove = (params) => {
  const { card_num } = params;
  if(!card_num || card_num.trim().length <= 0) {
    return new Error("올바른 OYO 카드가 아닙니다.");
  }
}
const OYO_validator = {
  validateCreate,
  validateUpdate,
  validateContent,
  validateRemove,
}

export default OYO_validator;