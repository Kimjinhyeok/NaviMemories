import { Container, Paper, Typography } from '@mui/material';

import { lightBlue, lime, teal } from '@mui/material/colors';
import React from 'react'
import BibleData from '../../../Data/bible';
import { useLocation } from 'react-router';

export default function RecitationResult(props) {

  const {state} = useLocation();
  const {point, deductions, quest} = state;
  const [QuestList, setQuestList] = React.useState([]);
  const getColor = function() {
    if(point >= 98) {
      return 'border-sky-500';
    } else if(point >= 92) {
      return 'border-teal-500';
    } else {
      return 'border-lime-500';
    }
  }
  const printResult = function() {
    if(point >= 98) {
      return "탁월";
    } else if(point >= 92) {
      return "우수";
    } else {
      return "보통";
    }
  }
  const getQuests = function(property) {
    let list = [];
    for(var i in quest[property]) {
      list.push({q : quest[property][i], v : deductions[property][i]});
    }
    return list;
  }

  React.useEffect(() => {
    let cv = getQuests('cv');
    let cn = getQuests('cn');
  
    setQuestList(cn.concat(cv));
  }, [])

  const getBibleName = function(bibleInfo) {
    let bible = BibleData.find(item => item.bible_code == bibleInfo.bible_code);
    return bible.bible_name;
  }
  const pirntQuestAndResult = function(source, index) {

    let item = source.q;
    let v = source.v
    return (
      <Paper elevation={1} key={index} className="quest_item p-2">
        <div className="theme text-lg">{item.theme}</div>
        <div className="cvn mt-2">
          <div className="cv flex space-x-1">
            <span>{getBibleName(item)}</span>
            <span>{item.chapter}</span><span>:</span><span>{item.f_verse}</span><span>{item.l_verse ? ` ~ ${item.l_verse}` : ""}</span>
          </div>
          <div className='mt-1 leading-5'>
            {item.content}
          </div>
        </div>
      </Paper>
    )
  }
  return (
    <Container className={`py-2`} maxWidth="sm">
      <div className={`flex flex-col border-2 rounded-md ${getColor()} w-full h-full p-4`}>
        <div className={'my-5vh mx-auto text-center flex flex-col items-center'}>
          <Typography variant="h3" component='div' className="title" sx={{ fontWeight: 400 }}>테스트 결과</Typography>
          <div className={`my-4 border-8 ${getColor()} rounded-full w-36 h-36 text-center flex justify-center items-center circle`}>
            <Typography variant="h4" component="div">{printResult()}</Typography>
          </div>
        </div>
        <div className={'mt-8 p-2 rounded-md'}>
          <div className='flex flex-col items-center'>
            <div className='mb-4'>
              <Typography variant="h5" component="div" className="quest_list_title">출제 구절 목록</Typography>
            </div>
            <div className='flex flex-col space-y-2'>
              {QuestList.map((item, index) => pirntQuestAndResult(item, index))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}