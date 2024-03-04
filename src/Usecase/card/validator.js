const checkCategory = (category = "") => {

  if(!category || category > 500) return false;

  return true;
}

const CardValidator = {
  checkCategory
}

export default CardValidator;