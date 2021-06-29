import { Button, Container, makeStyles } from '@material-ui/core';
import { blue, grey, lightBlue, red } from '@material-ui/core/colors';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import React, {useState, useEffect} from 'react'
import ExamContentComponent from './cn';
/**
 * @typedef QuestionProps
 * @property {Array} origins 
 * @property {Function} setAddResultQuestion
 * @property {Function} setResultDeduction
 */
/**
 * 
 * @param {QuestionProps} props 
 * @returns 
 */
export default function CNQuestList(props) {
  const classes = makeStyles((theme) => ({
    root : {
      height: '70%',
      display: 'flex',
      flexDirection: 'column'
    },

    actions: {
      display: 'flex',
      flexDirection: 'row',
      '& > button' : {
        flex: 1,
        display: 'flex',
        fontSize: '1.2em'
      }
    },
    root_checking : {
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
      '& input:read-only' : {
        backgroundColor: theme.palette.action.hover
      }
    },
    content_checking: {
      flex: 1,
      backgroundColor: theme.palette.action.hover
    },
    succeed: { backgroundColor: blue[50], '& input': {color : theme.palette.info.main}},
    failed: { backgroundColor: red[50], '& input': {color : theme.palette.error.main}},
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
      borderType: '1px solid',
      borderTypeRadius: '4px',
      borderTypeColor: theme.palette.action.disabled,
      overflowY: 'auto'
    },
    hide : {
      display : 'none'
    },
    correct : {
      backgroundColor: lightBlue[50],
    },
    omitted : {
      backgroundColor: grey[50],
      color: grey[500],
      textDecoration: 'line-through',
    },
    incorrect : {
      backgroundColor: red[50],
      color: red[500]
    },
  }))();
  const origins = props.origins;
  const addResult = props.setAddResultQuestion;

  const initialValues = {theme : "", content: ""}
  const initialFlags = {
    theme : null,
    content : null,
    hint : false,
    result : false
  }
  const [Deduction, setDeduction] = useState(0);
  const [StateList, setStateList] = useState([]);
  const [QuestionIndex, setQuestionIndex] = useState(0)
  useEffect(() => {
    let initStates = new Array(origins.length);
    initStates.fill({
      flags : initialFlags,
      value : initialValues
    });
    setStateList(initStates);
  }, []);

  const updateState = (props, value) => {
    var index = QuestionIndex;
    var originState = StateList[index];
    var stateItem = {...originState, value : {...originState.value, [props] : value}};
    setStateList([...StateList.slice(0, index), stateItem, ...StateList.slice(index+1)]);
  }
  const addDeduction = function(point) {
    setDeduction(Deduction+point);
  }
  const changeQuestionIndex = function(value) {
    if(QuestionIndex >= 0 || QuestionIndex < origins.length) {
      setQuestionIndex(QuestionIndex + value);
    }
  }
  const setConfirmQuestion = function() {
    
  }
  return (
    StateList.length > 0 ? 
    <Container maxWidth="md" className={classes.root}> 
      <ExamContentComponent
        state={StateList[QuestionIndex]}
        confirm={()=>{}}
        setDeduction={addDeduction}
        quest={origins[QuestionIndex]}
        updateState={updateState}
        classes={classes}
      />  
      <div className={classes.actions}>
        <Button type="button" color="primary" variant="outlined" disabled={QuestionIndex == 0} onClick={() => {changeQuestionIndex(-1)}} ><ArrowLeft />이전 문제</Button>
        <Button type="button" color="primary" variant="outlined" disabled={QuestionIndex >= origins.length-1} onClick={() => {changeQuestionIndex(1)}} >다음 문제 <ArrowRight/></Button>
      </div>
    </Container>
    : <></>
  )
}