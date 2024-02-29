import React, { useMemo, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { styled } from '@mui/system';
import { ArrowBackIos, ArrowForwardIos, ArrowRightAlt, Shuffle } from '@mui/icons-material'
import { red, blue, lightBlue, grey } from '@mui/material/colors'
import CheckContentComponent from './cn';
import CheckChapterVerseComponent from './cv';
import CategorySelect from '../../categorySelect';
import Http from '../../../Utils/Http';

const InitialOrigin = {
  theme: "",
  bible_code: 0,
  chapter: 0,
  f_verse: 0,
  l_verse: 0,
  content: "",
}
const OrderType = {
  stright: 'stright',
  random: 'random'
}
const BibleVersion = {
  kor: 'hrv',
  gae: 'nkrv'
}
var originalList = [];
export default function UnitPageComponent(props) {

  const http = Http();
  const useStyle = styled(theme => ({
    root_unit: {
      height: '100%',
      padding: '0',
      display: 'flex',
      flexDirection: 'row',
    },
    area_content: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      flex: 90
    },
    content_options: {
      padding: theme.spacing(1),
      marginTop: '15px',
      border: '1px solid',
      borderColor: theme.palette.action.disabled,
      borderRadius: '3px',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      // position: 'absolute',
      zIndex: 10,
      backgroundColor: grey[50],
      // left: '50%',
      // transform: 'translateX(-50%)',
      '& > .actions' : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *:not(:first-child)': {
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
        },
        '& > *': {
          width: '20em',
          maxWidth: '400px'
        },
        '& > * .MuiFormControlLabel-label': {
          display: 'flex'
        }
      }
    },
    fold: {
      overflow: 'hidden',
      height: '50px',
    },
    options_select: {
      // width: '33%'
    },
    moveButton: {
      flex: 5,
      minWidth: '0px',
      color: theme.palette.text.hint
    },
    root_checking: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%'
    },
    shortName: {
      marginRight: '10px'
    },
    row_part: {
      display: 'flex',
      flexDirection: 'row',
      '& .MuiFormControl-root': {
        flex: 20
      },
      '& .MuiFormControl-root:not(:last-child)': {
        marginRight: '10px'
      },
      '& .MuiAutocomplete-root': {
        flex: 30,
        marginRight: '10px'
      }
    },
    form_checking: {
      margin: 'auto auto',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '& > div': {
        margin: '10px 0'
      },
      '& input:read-only': {
        backgroundColor: theme.palette.action.hover
      }
    },
    content_checking: {
      flex: 1,
      backgroundColor: theme.palette.action.hover
    },
    succeed: { backgroundColor: blue[50], '& input': { color: theme.palette.info.main } },
    failed: { backgroundColor: red[50], '& input': { color: theme.palette.error.main } },
    action_button: {
      display: 'flex',
      flexDirection: 'column',
      '& button': {
        marginTop: '10px'
      }
    },
    content_result: {
      height: '12vh',
      paddingTop: '18.5px',
      paddingBottom: '18.5px',
      paddingLeft: '14px',
      paddingRight: '14px',
      border: `1px solid ${theme.palette.action.disabled}`,
      borderRadius: '4px',
      overflowY: 'auto',
      overflowWrap: 'break-word',
      '& > span' : {
        wordBreak: 'break-word',
      }
    },
    hide: {
      display: 'none'
    },
    correct: {
      backgroundColor: lightBlue[50],
    },
    omitted: {
      backgroundColor: grey[50],
      color: grey[500],
      textDecoration: 'line-through',
    },
    incorrect: {
      backgroundColor: red[50],
      color: red[500]
    },
  }));
  const classes = useStyle();

  const location = useLocation();

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
      var res = await http.get({
        query: `RC/${series_number}`
      });
      let recitationList = options.orderType === OrderType.stright ? res.data : shuffle(res.data);
      setCardList(recitationList);
      var item = recitationList[0];
      setOriginCard(item);
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

  React.useEffect(() => { loadRecitationCards(options.series) }, [])
  const [Fold, setFold] = useState(true)
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

  const handleOrderTypeChange = function (event) {
    let value = event.target.value;
    let shortedList = null;
    setoptions({ ...options, orderType: value });

    if (value === OrderType.stright) {
      shortedList = cardList.sort((a, b) => a.card_num > b.card_num ? 1 : -1);
    } else {
      shortedList = shuffle(cardList);
    }
    setCardList(shortedList);
    setOriginCard(shortedList[options.index]);
  }
  const handleVersionChange = function (event) {
    let value = event.target.value;
    setoptions({ ...options, version: value })
    setOriginCard(cardList[options.index], value);
  }
  const handleSeriesChange = async function (event) {
    let value = event.target.value;
    await loadRecitationCards(value);

    setoptions({ ...options, index: 0 })
  }
  return (
    <div className='h-full flex flex-row' >

      <Button variant='contained' sx={{ flex: 5, minWidth: 0 }}
        onClick={() => { setCardContent(options.index - 1) }} disabled={options.index == 0} title="이전 문제"><ArrowBackIos /></Button>
      <div className='flex flex-col relative flex-[90]'>
        <div className='p-2 mt-4 border rounded-[4px] flex flex-col flex-1'>
          <div className={`actions ${Fold ? 'overflow-hidden h-[50px]' : ''}`}>
            <div>
              <CategorySelect value={options.series} onChange={handleSeriesChange} />
            </div>
            <FormControl>
              <FormLabel component="legend">진행 순서</FormLabel>
              <RadioGroup row={true} value={options.orderType} onChange={handleOrderTypeChange} >
                <FormControlLabel value={OrderType.stright} control={<Radio />} label={<ArrowRightAlt />} title="시리즈 순서" />
                <FormControlLabel value={OrderType.random} control={<Radio />} label={<Shuffle />} title="무작위" />
              </RadioGroup>
            </FormControl>
            {
              options.series != 500 ?
                (
                  <FormControl >
                    <FormLabel component="legend">역본</FormLabel>
                    <RadioGroup row={true} value={options.version} onChange={handleVersionChange}>
                      <FormControlLabel value={BibleVersion.kor} control={<Radio />} label="개역한글"></FormControlLabel>
                      <FormControlLabel value={BibleVersion.gae} control={<Radio />} label="개정개역"></FormControlLabel>
                    </RadioGroup>
                  </FormControl>
                ) :
                <></>
            }
          </div>
          <Button variant="outlined" size="small" onClick={() => setFold(!Fold)}>옵션 {Fold ? '열기' : '닫기'}</Button>
        </div>
        {
          path == 'cv'
          ? <CheckChapterVerseComponent classes={classes} origin={origin} />
          : <CheckContentComponent classes={classes} origin={origin} />
        }
      </div>
      <Button variant='contained'  sx={{ flex: 5, minWidth: 0 }}
        onClick={() => { setCardContent(options.index + 1) }} disabled={options.index == cardList.length - 1} title="다음 문제"><ArrowForwardIos /></Button>
    </div>
  )
}