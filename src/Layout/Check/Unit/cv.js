import { Button, Container, makeStyles, TextField } from '@material-ui/core'
import {red, blue} from '@material-ui/core/colors'
import React from 'react'
import AutoCompleteBible from '../../autoCompleteBible';

export default function CheckChapterVerseComponent(props) {

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
    failed: { backgroundColor: red[50], '& input': {color : theme.palette.error.main}}
  }))
  const classes = useStyle();

  var [value, setValue] = React.useState({theme : "", bible_code: 0, chapter: 0, f_verse: 0, l_verse: 0});
  var [flags, setFlags] = React.useState({
    theme : null,
    bible_code: null,
    chapter: null,
    f_verse: null,
    l_verse: null
  })
  const [origin] = React.useState({
    theme : "구원의 확신",
    bible_code: 62,
    chapter: 5,
    f_verse: 11,
    l_verse: 12,
    content : "또 증거는 이것이니 하나님이 우리에게 영생을 주신 것과 이 생명이 그의 안에 있는 그것이니라 아들이 있는 자에게는 생명이 있고 하나님의 아들이 없는 자에게는 생명이 없느니라",
  });
  const handleChangeValue = (props) => (event) => {
    setValue({...value, [props] : event.target.value})
  }
  const handleBibleChange = (event, newValue) => {
    handleChangeValue('bible_code')({target: {value: newValue.bible_code}});
  }
  const handleOnClick = function () {
    var res = {
      theme : value.theme === origin.theme,
      bible_code: value.bible_code == origin.bible_code,
      chapter: value.chapter == origin.chapter,
      f_verse: value.f_verse == origin.f_verse
    };
    if(origin.l_verse || value.l_verse) {
      res.l_verse = value.l_verse == origin.l_verse;
    }
    setFlags({
      ...flags,
      ...res
    })
  }
  return (
    <Container maxWidth="md" className={classes.root_checking}>
    
      <form className={classes.form_checking}>
        <TextField id="checking_theme" variant="outlined" 
          value={value.theme} 
          onChange={handleChangeValue('theme')} 
          required  
          autoComplete="off"
          label="주제" 
          className={flags.theme === null ? null : (flags.theme === true ? classes.succeed : classes.failed)}/>
        <div className={classes.row_part}>
          <AutoCompleteBible
            classes={classes}
            fullWidth={true}
            id="checking_bible"
            className={flags.bible_code === null ? null : (flags.bible_code === true? classes.succeed : classes.failed)}
            onChange={handleBibleChange}
          />
          <TextField type="number" 
            value={value.chapter} 
            variant="outlined" 
            label="장" 
            required
            onChange={handleChangeValue('chapter')} 
            className={flags.chapter === null ? null : (flags.chapter === true ? classes.succeed : classes.failed)}/>
          <TextField type="number" 
            value={value.f_verse} 
            variant="outlined" 
            label="시작 구절" 
            required
            onChange={handleChangeValue('f_verse')} 
            className={flags.f_verse === null ? null : (flags.f_verse === true ? classes.succeed : classes.failed)}/>
          <TextField type="number" 
            value={value.l_verse} 
            variant="outlined" 
            label="끝 구절" 
            required
            onChange={handleChangeValue('l_verse')} 
            className={flags.l_verse === null ? null : (flags.l_verse === true ? classes.succeed : classes.failed)}/>
        </div>
        <TextField id="checking_content" rows="6" variant="outlined" value={origin.content}
          inputProps={{readOnly: true}}  
          multiline
          label="내용" 
          className={classes.content_checking}/>
        <Button type="button" variant="contained" color="primary" onClick={() => {handleOnClick()}}>확인</Button>
      </form>
      
    </Container>
  )
}