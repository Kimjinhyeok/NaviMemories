import { Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { lightBlue, lime, teal } from '@mui/material/colors';
import React from 'react'
import BibleData from '../../../Data/bible';

export default function RecitationResult(props) {

  const {point, deductions, quest} = props.location.state;
  const [QuestList, setQuestList] = React.useState([]);
  const returnClass = function() {
    if(point >= 98) {
      return 'bg-sky-500';
    } else if(point >= 92) {
      return 'bg-teal-500';
    } else {
      return 'bg-lime-500';
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
      <Paper elevation={1} key={index} className="quest_item">
        <div className="theme">{item.theme}</div>
        <div className="cvn">
          <div className="cv">
            <span>{getBibleName(item)}</span>&nbsp;
            <span>{item.chapter}</span>&nbsp;<span>:</span>&nbsp;<span>{item.f_verse}</span><span>{item.l_verse ? ` ~ ${item.l_verse}` : ""}</span>
          </div>
          <div>
            {item.content}
          </div>
        </div>
      </Paper>
    )
  }
  return (
    <Container className={`flex flex-col ${returnClass()}`} maxWidth="sm">
      <div className={'my-5vh mx-auto text-center'}>
        <Typography variant="h4" className="title">테스트 결과</Typography>
        <div className={'border-[1em] rounded-[50%] w-[10em] h-[10em] text-center flex justify-center items-center' + ' circle'}>
          <Typography variant="h2" component="h2">{printResult()}</Typography>
        </div>
      </div>
      <div className={'border-[3px] p-2 rounded-[16px]' + " quest_list"}>
        <div className={'absolute top-[-1em] left-0 right-0'}>
          <Typography variant="h5" component="div" className="quest_list_title">출제 구절 목록</Typography>
        </div>
        {QuestList.map((item, index) => pirntQuestAndResult(item, index))}
      </div>
    </Container>
  )
}