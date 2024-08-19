export default function FisherYatesShuffle(array=[]) {

  for (let i = array.length - 1; i > 0; i--) {
    // 0부터 i까지의 랜덤 인덱스를 선택
    const j = Math.floor(Math.random() * (i + 1));
    
    // 현재 요소와 랜덤으로 선택된 요소를 교환
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}