import { Button, Container, makeStyles, TextField } from '@material-ui/core'
import {red, blue, lightBlue} from '@material-ui/core/colors'
import React from 'react'
import DiffMatchPatch from 'diff-match-patch';
import AutoCompleteBible from '../../autoCompleteBible';

export default function CheckContentComponent(props) {

  const useStyle = makeStyles((theme) => ({
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
      justifyContent: 'space-around',
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
      height: '15vh',
      paddingTop: '18.5px',
      paddingBottom: '18.5px',
      paddingLeft: '14px',
      paddingRight: '14px',
      border: '1px solid',
      borderRadius: '4px',
      borderColor: theme.palette.action.disabled,
    },
    correct : {
      backgroundColor: lightBlue[50],
    },
    incorrect : {
      backgroundColor: red[50],
      textDecoration: 'line-through'
    },
  }))
  const classes = useStyle();

  var [value, setValue] = React.useState({theme : "", content: ""});
  var [flags, setFlags] = React.useState({
    theme : null,
    content : null
  })
  const [origin] = React.useState({
    theme : "구원의 확신",
    bible_code: 62,
    chapter: 5,
    f_verse: 11,
    l_verse: 12,
    content : "또 증거는 이것이니 하나님이 우리에게 영생을 주신 것과 이 생명이 그의 안에 있는 그것이니라 아들이 있는 자에게는 생명이 있고 하나님의 아들이 없는 자에게는 생명이 없느니라",
  });
  const [matchResult, setMatchResult] = React.useState([]);

  const handleChangeValue = (props) => (event) => {
    setValue({...value, [props] : event.target.value})
  }
  
  const handleOnClick = function () {
    var res = {
      theme : value.theme === origin.theme,
      content : value.content == origin.content
    };
    setFlags({
      ...flags,
      ...res
    });
    compareContent()
  }
  const handleHint = function () {

  }
  const compareContent = function () {
    var diffMatchPatch = new DiffMatchPatch.diff_match_patch();
    var result = diffMatchPatch.diff_main(origin.content, value.content);

    var spanList =  result.map(node => {
      return {
        type : node[0],
        text : node[1]
      }
    });
    setMatchResult(spanList);

  }
  return (
    <Container maxWidth="md" className={classes.root_checking}>
    
      <form className={classes.form_checking}>
        <TextField id="checking_theme" variant="outlined" 
          value={value.theme} 
          onChange={handleChangeValue('theme')} 
          autoComplete="off"
          required
          label="주제" 
          className={flags.theme === null ? null : (flags.theme === true ? classes.succeed : classes.failed)}/>
        <div className={classes.row_part}>
          <AutoCompleteBible
            classes={classes}
            fullWidth={true}
            defaultValue={origin.bible_code}
            disabled={true}
            id="checking_bible"
          />
          <TextField type="number" 
            value={value.chapter} 
            variant="outlined" 
            label="장" 
            defaultValue={origin.chapter}
            inputProps={{readOnly: true}}
          />
          <TextField type="number" 
            value={value.f_verse} 
            variant="outlined" 
            label="시작 구절" 
            defaultValue={origin.f_verse}
            inputProps={{readOnly: true}}
          />
          <TextField type="number" 
            value={value.l_verse} 
            variant="outlined" 
            label="끝 구절" 
            defaultValue={origin.l_verse}
            inputProps={{readOnly: true}}  
          />
        </div>
        <TextField id="checking_content" rows="6" variant="outlined" value={value.content}
          multiline
          required
          autoComplete="off"
          label="내용" 
          className={flags.content === null ? '' : (flags.content === true? classes.succeed : classes.failed)}
          onChange={handleChangeValue('content')} 
        />
        <div className={classes.content_result}>
          {
            matchResult.length > 0 ? (matchResult.map(item => (<span className={item.type ? classes.incorrect : classes.correct}>{item.text}</span>))) : <></>
          }
        </div>
        <div className={classes.action_button}>
          <Button type="button" variant="outlined" color="default" onClick={() => {handleHint()}}>힌트</Button>
          <Button type="button" variant="contained" color="primary" onClick={() => {handleOnClick()}}>확인</Button>
        </div>
      </form>
      
    </Container>
  )
}