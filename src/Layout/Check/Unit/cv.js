import { Button, Container, Divider, TextField } from '@material-ui/core'
import { Refresh } from '@material-ui/icons';
import React from 'react'
import AutoCompleteBible from '../../autoCompleteBible';

export default function CheckChapterVerseComponent(props) {

  const {classes, origin} = props;

  const InitialValues = {theme : "", bible_code: 0, chapter: 0, f_verse: 0, l_verse: 0};
  const InitialFlags = {
    theme : null,
    bible_code: null,
    chapter: null,
    f_verse: null,
    l_verse: null,
    result : false,
  };
  var [value, setValue] = React.useState(InitialValues);
  var [flags, setFlags] = React.useState(InitialFlags)
  
  React.useEffect(() => {
    handleOnRefresh();
  }, [origin])
  
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
    res.result = true;
    setFlags({
      ...flags,
      ...res
    })
    setValue({
      theme : origin.theme,
      bible_code : origin.bible_code,
      chapter : origin.chapter,
      f_verse : origin.f_verse,
      l_verse : origin.l_verse
    })
  }
  
  const handleOnRefresh = function () {
    setValue(InitialValues);
    setFlags(InitialFlags);
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
            {... (flags.result ? {defaultValue : origin.bible_code } : {})}
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
        <Divider />
        {
            flags.result ? 
            <Button type="button" variant="contained" color="primary" onClick={() => {handleOnRefresh()}}><Refresh/>재도전</Button>
            :
            <Button type="button" variant="contained" color="primary" onClick={() => {handleOnClick()}}>확인</Button>
          }
      </form>
      
    </Container>
  )
}