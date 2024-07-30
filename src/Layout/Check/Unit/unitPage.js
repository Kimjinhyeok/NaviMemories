import React, { useMemo } from 'react'
import { useLocation } from 'react-router';
import { Button } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import CheckContentComponent from './cn';
import CheckChapterVerseComponent from './cv';
import CheckOptions from './options';
import { BibleVersion, TestOrderType } from '../../../Data/common';
import CardUsecase from '../../../Usecase/card/card';
import { useSnackbar } from 'notistack';

const InitialOrigin = {
  theme: "",
  bible_code: 0,
  chapter: 0,
  f_verse: 0,
  l_verse: 0,
  content: "",
}
export default function UnitPageComponent(props) {

  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  function setOriginCard(item, version) {
    setOrigin({
      theme: item.theme,
      bible_code: item.bible_code,
      chapter: item.chapter,
      f_verse: item.f_verse,
      l_verse: item.l_verse,
      content: (version || options.version) == BibleVersion.kor ? item.verse_kor : item.verse_gae,
    })
  }
  async function loadRecitationCards(series_number) {
    try {
      const res = await CardUsecase.getCardList(series_number);
      if(res instanceof Error) {
        enqueueSnackbar(res.message, { variant: 'warning' });
      } else {
        const recitationList = options.orderType === TestOrderType.STRIGHT ? res : shuffle(res);
        setCardList(recitationList);
        const item = recitationList[0];
        setOriginCard(item);
      }
    } catch (error) {
      throw error;
    }
  }
  const [options, setoptions] = React.useState({
    series: '201',
    orderType: 'stright',
    version: 'nkrv',
    index: 0,
  })

  const [origin, setOrigin] = React.useState(InitialOrigin);
  const [cardList, setCardList] = React.useState([]);

  const path = useMemo(() => {
    const pathname = location.pathname;
    const splited = pathname.split('/');
    return splited[splited.length-1];
  }, location);

  React.useEffect(() => { loadRecitationCards(options.series) }, []);

  const handleChangeOptions = (property="", newOptions={}) => {
    if(property == "order") {
      let shortedList = null;
      const {orderType} = newOptions;
      if (orderType === TestOrderType.STRIGHT) {
        shortedList = cardList.sort((a, b) => a.card_num > b.card_num ? 1 : -1);
      } else {
        shortedList = shuffle(cardList);
      }
      setCardList(shortedList);
      newOptions.index = 0; // Reset Index
      setOriginCard(shortedList[0]);

    } else if(property == "version") {
      const {version} = newOptions
      setOriginCard(cardList[options.index], version);
      
    } else if(property == "series") {
      const {series} = newOptions;
      newOptions.index = 0; // Reset Index
      loadRecitationCards(series).finally(()=>{});

    }
    setoptions(newOptions);
  }
  const setCardContent = function (index) {
    if (index > -1 && index < cardList.length) {
      setoptions({ ...options, index: index });
      var item = cardList[index];
      setOriginCard(item);
    }
  }
  function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return (
    <div className='h-full flex flex-row' >

      <Button variant='contained' sx={{ flex: 3, minWidth: 0 }} color='info'
        onClick={() => { setCardContent(options.index - 1) }} disabled={options.index == 0} title="이전 문제"><ArrowBackIos />
      </Button>
      <div className='flex flex-col relative flex-[90]'>
        <CheckOptions options={options} changeOptions={handleChangeOptions} />
        {
          path == 'cv'
          ? <CheckChapterVerseComponent origin={origin} />
          : <CheckContentComponent origin={origin} />
        }
      </div>
      <Button variant='contained'  sx={{ flex: 3, minWidth: 0 }} color='info'
        onClick={() => { setCardContent(options.index + 1) }} disabled={options.index == cardList.length - 1} title="다음 문제"><ArrowForwardIos />
      </Button>
    </div>
  )
}