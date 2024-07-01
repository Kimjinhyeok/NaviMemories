import { Button, Container, Divider, TextField } from '@mui/material'
import { Refresh } from '@mui/icons-material';
import React from 'react'
import AutoCompleteBible from '../../../Components/autoCompleteBible';

export default function CheckChapterVerseComponent(props) {

  const {origin} = props;

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
      bible_code: value.bible_code == origin.bible_code,
      chapter: value.chapter == origin.chapter,
      f_verse: value.f_verse == origin.f_verse
    };
    if(origin.theme) {
      res.theme = value.theme === origin.theme;
    }
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
    <Container maxWidth="md" sx={{ display: 'flex', height: '100%', padding: '0 !important' }}>
    
      <form className='m-auto flex flex-col w-full space-y-2'>
        <TextField id="checking_theme" variant="outlined" 
          value={value.theme} 
          onChange={handleChangeValue('theme')} 
          required  
          autoComplete="off"
          label="주제" 
          disabled={!origin.theme}
          className={flags.theme === null ? null : (flags.theme === true ? 'bg-blue-500' : 'bg-red-500')}/>
        <AutoCompleteBible
          fullWidth={true}
          id="checking_bible"
          className={flags.bible_code === null ? null : (flags.bible_code === true? 'bg-blue-500' : 'bg-red-500')}
          onChange={handleBibleChange}
          {... (flags.result ? {defaultValue : origin.bible_code } : {defaultValue : value.bible_code})}
        />
        <div className='flex space-x-2'>
          <TextField type="number" 
            value={value.chapter} 
            variant="outlined" 
            label="장" 
            required
            onChange={handleChangeValue('chapter')} 
            className={flags.chapter === null ? null : (flags.chapter === true ? 'bg-blue-500' : 'bg-red-500')}/>
          <TextField type="number" 
            value={value.f_verse} 
            variant="outlined" 
            label="시작 구절" 
            required
            onChange={handleChangeValue('f_verse')} 
            className={flags.f_verse === null ? null : (flags.f_verse === true ? 'bg-blue-500' : 'bg-red-500')}/>
          <TextField type="number" 
            value={value.l_verse} 
            variant="outlined" 
            label="끝 구절" 
            required
            onChange={handleChangeValue('l_verse')} 
            className={flags.l_verse === null ? null : (flags.l_verse === true ? 'bg-blue-500' : 'bg-red-500')}/>
        </div>
        <TextField id="checking_content" rows="6" variant="outlined" value={origin.content}
          inputProps={{readOnly: true}}  
          multiline
          label="내용" 
          className='flex-1'/>
        <Divider />
        {
            flags.result ? 
            <Button variant="outlined" onClick={handleOnRefresh}><Refresh/>재도전</Button>
            :
            <Button variant="contained" color="primary" onClick={handleOnClick}>확인</Button>
          }
      </form>
      
    </Container>
  )
}