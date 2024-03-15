import { Button } from '@mui/material';

import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import React, {useState, useEffect} from 'react'
import ExamContentComponent from './cn';
/**
 * @typedef QuestionProps
 * @property {Array} origins 
 * @property {Boolean} themeOf242
 * @property {Function} setAddResultQuestion
 * @property {Function} setResultDeduction
 */
/**
 * 
 * @param {QuestionProps} props 
 * @returns 
 */
export default function CNQuestList(props) {
  
  const themeOf242 = props.themeOf242;
  const origins = props.origins;
  const addResult = props.setAddResultQuestion;
  const setSumDeduction = props.setResultDeduction;
  const precedence = props.precedence;
  const moveTab = props.moveTab;

  const initialValues = {theme : "", content: ""}
  const initialFlags = {
    theme : null,
    content : null,
    doTheme : true,
    hintCount : 0
  }
  
  const [StateList, setStateList] = useState([]);
  const [QuestionIndex, setQuestionIndex] = useState(0);
  useEffect(() => {
    let initStates = new Array(origins.length);
    let deductionList = new Array(origins.length);
    origins.forEach((item, idx) => {
      initStates[idx] = ({
        flags : {
          ...initialFlags, 
          doTheme : (item.series_code % 200 < 100) || ((item.series_code % 300 < 100) && themeOf242)
        },
        value : initialValues
      });
    })
    
    setStateList(initStates);
  }, []);

  const updateValue = (item) => {
    var index = QuestionIndex;
    setStateList([...StateList.slice(0, index), item, ...StateList.slice(index+1)]);
  };
  const addDeduction = function(point) {
    setSumDeduction(QuestionIndex, point);
  }
  const changeQuestionIndex = function(value) {
    let nextIndex = QuestionIndex + value;
    if(nextIndex >= 0 && (nextIndex < origins.length)) {
      setQuestionIndex(nextIndex);
    } else {
      moveTab();
    }
  }
  
  return (
    StateList.length > 0 ? 
    <div className={'flex-1 flex flex-col'}> 
      <div className={'h-full flex flex-col justify-center'}>
        <div className={'text-gray-500 text-right px-3'}>
          <span>(</span><span>{QuestionIndex+1}</span><span>/</span><span>{origins.length}</span><span>)</span>
        </div>
        <ExamContentComponent
          state={StateList[QuestionIndex]}
          confirm={()=>{}}
          setDeduction={addDeduction}
          quest={origins[QuestionIndex]}
          updateState={updateValue}
        />  
      </div>
      <div className={'mt-4 w-full flex justify-between space-x-2'}>
        <Button color="primary" fullWidth variant="outlined" disabled={QuestionIndex == 0 && precedence} onClick={() => {changeQuestionIndex(-1)}} ><ArrowLeft />이전 문제</Button>
        <Button color="primary" fullWidth variant="outlined" disabled={QuestionIndex >= origins.length-1 && !precedence } onClick={() => {changeQuestionIndex(1)}} >다음 문제 <ArrowRight/></Button>
      </div>
    </div>
    : <></>
  )
}