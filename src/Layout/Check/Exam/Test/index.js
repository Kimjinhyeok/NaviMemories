import { Button } from '@mui/material'
import React from 'react'
import TimeProgress from '../timeProgress';
import TimeoutDialog from '../../../Dialog/timeoutDialog';
import TestQuestPanel from './questPanel';
import { useLocation, useNavigate } from 'react-router';

const DEF_Deduction = 6;
const DEF_Point = 100;
var deductions = {
  cv : new Array(5).fill(DEF_Deduction),
  cn : new Array(5).fill(DEF_Deduction)
}
export default function RecitationExam(props) {

  const { state : propsState } = useLocation();
  const navigator = useNavigate();
  const LimitTime = 60*10;

  const [Result, setResult] = React.useState([]);
  const [Point, setPoint] = React.useState(100);
  const [Source, setSource] = React.useState({
    cv : propsState.cardList.cv,
    cn : propsState.cardList.cn,
    themeOf242 : propsState.themeOf242,
  });
  const [DialogOpen, setDialogOpen] = React.useState(false)

  React.useEffect(() => {
    
    setPoint(DEF_Point + (Source.themeOf242 ? 2 : 0));
    
  }, []);
  const addResultQuestion = function(question) {
    var resolvedList = Result;
    resolvedList.push(question);
    setResult(resolvedList);
  }
  const setDeduction = (props) => (index, value) => {
    deductions = {...deductions, [props] : [...deductions[props].slice(0, index), (value > DEF_Deduction ? DEF_Deduction : value), ...deductions[props].slice(index+1)]};
  }
  const setConfirm = function(deduction) {
    var resultPoint = Point - deduction;
    setPoint(resultPoint);
  }
  const closing = function() {
    setDialogOpen(true);
  }
  const resultAction = function() {
    let deduction = 0;
    deductions.cn.forEach(point => deduction+=point);
    deductions.cv.forEach(point => deduction+=point);
    navigator("/test/result", {
      state: {
        point : Point - deduction,
        quest : Source,
        deductions : deductions
      }
    })
  }
  
  
  return (
    <div className={'h-full'}>
      <div className={'flex flex-col h-full'}>
        <div className={'my-1'}>
          <TimeProgress LimitTime={LimitTime} timeOutFunc={closing}/>
        </div>
        <TestQuestPanel Source={Source} addResultQuestion={addResultQuestion} setDeduction={setDeduction} precedence={propsState.precedence}/>
        <Button sx={{ marginTop: '4px' }} variant="contained" color='error' onClick={closing}>종료</Button>
      </div>
      <TimeoutDialog open={DialogOpen} title="암송 테스트 종료" action={resultAction} message="암송 테스트가 종료되었습니다. 결과창으로 이동합니다." timerTime={5}/>
    </div>
  )
} 