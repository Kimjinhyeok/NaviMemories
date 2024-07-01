import DiffMatchPatch from 'diff-match-patch';

const diffMatchPatch = new DiffMatchPatch.diff_match_patch();
/**
 * 
 * @param {String} target 
 * @param {String} origin 
 */
function compareText(target, origin) {
  try {
    if(!origin) {
      throw new Error("정답 문장이 없습니다.");
    }

    let result = diffMatchPatch.diff_main(origin, target);

    // 공백 및 특수문자인 부분은 정답처리하기
    for(var i in result) {
      let numIndex = Number(i);
      if(result[numIndex] !== undefined && result[numIndex][0] != 0 && /^[\s\?\.\!\,\;]+$/.test(result[numIndex][1])) {
        if(result[numIndex][0] == -1) {
          for(var secondIndex = numIndex - 1; secondIndex >= 0; secondIndex--) {
            if(result[secondIndex][0] == 0) {
              result[secondIndex][1] += result[numIndex][1];
              break;
            }
          }
        }
        result = [...result.slice(0, numIndex), ...result.slice(numIndex+1)];
      }
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export default compareText;