function arrayCategories (categories) {
  var array = [];
  var headItem = null;
  categories.forEach(type => {
    if(type.series_code % 100 === 0) {
      if( headItem ) {
        array.push(headItem);
      }
      headItem = type;
      headItem.children = [];
    } else {
      headItem.children.push(type);
    }
  });
  array.push(headItem);
  return array;
}
function CategoryManager() {
  this.categories = [];
}
CategoryManager.prototype.init = async function() {
  try {
    var result = await fetch("/mock_series.json");
    this.categories = await result.json();
    return this.categories;
  } catch (error) {
    console.error(error);
  } 
}
CategoryManager.prototype.getCategories = function() {
  return new Promise(async (resolve, reject) => {
    try {
      if(this.categories.length > 0) resolve(this.categories);
      else {
        var reloadCategories = await this.init();
        resolve(reloadCategories);
      }
    } catch (error) {
      reject(this.categories);
    }
  });
}

const Categories = new CategoryManager();
export {Categories, arrayCategories}