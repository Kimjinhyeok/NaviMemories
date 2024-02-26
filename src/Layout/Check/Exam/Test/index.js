import { Button, Container, makeStyles} from '@mui/material'
import React from 'react'
import TimeProgress from '../timeProgress';
import TimeoutDialog from '../../../Dialog/timeoutDialog';
import TestQuestPanel from './questPanel';

const DEF_Deduction = 6;
const DEF_Point = 100;
var deductions = {
  cv : new Array(5).fill(DEF_Deduction),
  cn : new Array(5).fill(DEF_Deduction)
}
export default function RecitationExam(props) {

  const history = props.history;
  const LimitTime = 60*10;
  const propsState = props.location.state;
  const classes = makeStyles(theme => ({
    root_exam: {
      height: '100%'
    },
    container_exam: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    tabcontent: {
      height: '100%',
    },
    flowPanel: {
      maxHeight: 'calc(100% - 48px)',
      height: 'calc(100% - 48px)',
      overflowY: 'auto'
    },
    tabPanels: {
      height: '100%',
    },
    tabPanel: {
      height: '100%'
    },
    timeline : {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    closing: {
      marginBottom: theme.spacing(2),
      fontSize: '1.2em'
    }
  }))();

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
    history.push({
      pathname: "/test/result",
      state: {
        point : Point - deduction,
        quest : Source,
        deductions : deductions
      }
    })
  }
  
  
  return (
    <div className={classes.root_exam}>
      <div className={classes.container_exam}>
        <div className={classes.timeline}>
          <TimeProgress LimitTime={LimitTime} timeOutFunc={closing}/>
        </div>
        <TestQuestPanel Source={Source} classes={classes} addResultQuestion={addResultQuestion} setDeduction={setDeduction} precedence={propsState.precedence}/>
        <Button className={classes.closing} type="button" variant="contained" color="secondary" onClick={closing}>종료</Button>
      </div>
      <TimeoutDialog open={DialogOpen} title="암송 테스트 종료" action={resultAction} message="암송 테스트가 종료되었습니다. 결과창으로 이동합니다." timerTime={5}/>
    </div>
  )
} 