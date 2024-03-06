import { Box, Button, Container, Divider, Paper, TextField } from '@mui/material'
import { useSnackbar } from 'notistack';
import React from 'react'
import Http from '../../Utils/Http';
import AutoCompleteBible from '../../Components/autoCompleteBible';
import { useNavigate } from 'react-router';
import OyoUsecase from '../../Usecase/oyo/oyo';

export default function CardTemplateComponent(props) {

  const http = Http();
  const {enqueueSnackbar} = useSnackbar();
  const navigator = useNavigate();


  const [value, setValue] = React.useState({
    theme: '',
    bible_code: '',
    chapter: 0,
    f_verse: 0,
    l_verse: 0,
    content: ''
  });
  React.useEffect(() => {
    checkValidate();
  }, [value])
  React.useEffect(() => {
    if (value.bible_code && value.chapter && value.f_verse) {
      loadContent()
    }
  }, [value.bible_code, value.chapter, value.f_verse, value.l_verse])

  const [validators, setValidators] = React.useState({
    theme: false,
    bible_code: false,
    chapter: false,
    f_verse: false,
    l_verse: false,
    content: false,
  })
  const [option, setOption] = React.useState({
    maxChapter: 999,
    edited: false
  })
  const resetState = () => {
    setValue({
      theme: '',
      bible_code: '',
      chapter: 0,
      f_verse: 0,
      l_verse: 0,
      content: ''
    });
    setValidators({
      theme: false,
      bible_code: false,
      chapter: false,
      f_verse: false,
      l_verse: false,
      content: false,
    });
  }
  const goBack = () => {
    navigator(-1);
  }
  const onChangeHandling = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  }
  const onChangeAutocomplete = function (event, newValue) {
    setValue({ ...value, bible_code: newValue.bible_code })
    setOption({ ...option, maxChapter: newValue.chapter });
  }
  async function loadContent() {
    try {
      const { bible_code, chapter, f_verse, l_verse } = value;

      const res = await OyoUsecase.getBibleContent({ bible_code, chapter, f_verse, l_verse }); 
      
      if(res instanceof Error) {
        enqueueSnackbar(res.message);
      } else {
        const content = res;
        setValue({ ...value, content: content });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function onSaveHandling() {
    try {
      const res = await OyoUsecase.createOyo(value);

      if(res instanceof Error) {

      } else {
        enqueueSnackbar("새 OYO 카드가 저장되었습니다.", {variant : 'success'});
        // if(history.location.state && history.location.state.go) {
        //   history.push({pathname : history.location.state.go, state : null});
        // }
        /********** Notice Saved OYO Card **********/
        resetState();
      }

    } catch (error) {
      if(error.response.status) {
        enqueueSnackbar(error.response.data, {variant : 'warning'});
      }
      console.error(error);
    }
  }
  const checkValidate = () => {
    var validated = {}
    for (var itr in value) {
      switch (itr) {
        case 'f_verse':
        case 'chapter':
        case 'bible_code':
        case 'content':
          if (!value[itr]) {
            validated[itr] = true;
          } else if (validators[itr]) {
            validated[itr] = false;
          }
          break;
      }
    }
    setValidators({ ...validators, ...validated })
  }

  return (
    <Container maxWidth="sm" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className={'flex flex-col m-auto space-y-2 border border-gray-200 rounded-md p-4'}>
        <Box component="h3" sx={{ width: '100%', textAlign: 'center' }}>사용자 구절(OYO) 추가</Box>
        <div className='mt-2'></div>
        <TextField
          id="teamplte_theme"
          type="text"
          label="암송 주제"
          value={value.theme}
          variant="outlined"
          onChange={onChangeHandling('theme')}
        />
        <div className={'flex flex-wrap flex-row space-x-2 mt-2'}>
          <AutoCompleteBible
            id="template_bible"
            fullWidth={true}
            onChange={onChangeAutocomplete}
            defaultValue={value.bible_code}
            renderOption={(params) => (<><span className={'mr-3'}>{params.short_name}</span>{params.bible_name}</>)}
          />
          <Box component="h4" sx={{ flex: '0.1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        </div>
        <div className={'flex flex-row space-x-2 mt-2'}>
          <TextField
            id="template_chapter"
            label="장"
            type="number"
            value={value.chapter}
            variant="outlined"
            required
            onChange={onChangeHandling('chapter')}
            InputProps={{ inputProps: { min: 0, max: option.maxChapter } }}
            error={validators.chapter}
            sx={{ flex: 1 }}
          />
          <TextField
            id="template_fverse"
            type="number"
            label="시작 절"
            value={value.f_verse}
            variant="outlined"
            required
            onChange={onChangeHandling('f_verse')}
            error={validators.f_verse}
            sx={{ flex: 1 }}
          />
          {/* <Box component="h4" sx={{ flex: '0.1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>~</Box> */}
          <TextField
            id="template_lverse"
            type="number"
            label="끝 절"
            value={value.l_verse}
            variant="outlined"
            onChange={onChangeHandling('l_verse')}
            sx={{ flex: 1 }}
          />
        </div>
        <TextField
          id="teamplte_content"
          type="text"
          label="내용을 입력해주세요."
          value={value.content}
          variant="outlined"
          multiline
          rows="5"
          required
          onChange={onChangeHandling('content')}
          error={validators.content}
          helperText={validators.content ? '내용을 입력하거나 확인해주세요' : ''}
        />
        <Divider />
        <div className={'flex flex-row m-3 justify-between space-x-2'}>
          <Button fullWidth color="secondary" aria-label="oyo-cancel" variant="outlined" onClick={goBack}>취소</Button>
          <Button fullWidth color="primary" aria-label="oyo-write" variant="contained" onClick={onSaveHandling}>저장</Button>
        </div>
      </div>
    </Container>

  )
}