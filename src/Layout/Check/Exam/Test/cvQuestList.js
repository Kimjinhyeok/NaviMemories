import { Button, Container, makeStyles } from '@material-ui/core';
import { blue, grey, lightBlue, red } from '@material-ui/core/colors';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import React, {useState, useEffect} from 'react'
import ExamChapterVerseComponent from './cv';
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
export default function CVQuestList(props) {

  const classes = makeStyles((theme) => ({
    root : {
      height: '75vh',
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
      flexDirection: 'column',
      justifyContent: 'center',
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
    questionIndex: {
      color: theme.palette.grey[500],
      textAlign: 'right',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
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
    succeed: { backgroundColor: blue[50], '& input, & textarea': {color : theme.palette.info.main}},
    failed: { backgroundColor: red[50], '& input, & textarea': {color : theme.palette.error.main}},
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
  const themeOf242 = props.themeOf242;
  const origins = props.origins;
  const addResult = props.setAddResultQuestion;
  const setSumDeduction = props.setResultDeduction;

  const initialValues = {theme : "", bible_code: 0, chapter: 0, f_verse: 0, l_verse: 0};
  const initialFlags = {
    theme : null,
    bible_code: null,
    chapter: null,
    f_verse: null,
    l_verse: null,
    doTheme : true,
    hintCount : 0
  };
  
  const [StateList, setStateList] = useState([]);
  const [QuestionIndex, setQuestionIndex] = useState(0);
  useEffect(() => {
    let initStates = new Array(origins.length);
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
    if(QuestionIndex >= 0 || QuestionIndex < origins.length) {
      setQuestionIndex(QuestionIndex + value);
    }
  }

  return (
    StateList.length > 0 ? 
    <div className={classes.root}> 
      <div className={classes.root_checking}>
        <div className={classes.questionIndex}>
          <span>(</span><span>{QuestionIndex+1}</span><span>/</span><span>{origins.length}</span><span>)</span>
        </div>
        <ExamChapterVerseComponent
          state={StateList[QuestionIndex]}
          confirm={()=>{}}
          setDeduction={addDeduction}
          quest={origins[QuestionIndex]}
          updateState={updateValue}
          classes={classes}
        />  
      </div>
      <div className={classes.actions}>
        <Button type="button" color="primary" variant="outlined" disabled={QuestionIndex == 0} onClick={() => {changeQuestionIndex(-1)}} ><ArrowLeft />이전 문제</Button>
        <Button type="button" color="primary" variant="outlined" disabled={QuestionIndex >= origins.length-1} onClick={() => {changeQuestionIndex(1)}} >다음 문제 <ArrowRight/></Button>
      </div>
    </div>
    : <></>
  )
}