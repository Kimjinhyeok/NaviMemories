import { Box, Button, Container, Divider, makeStyles, Paper, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react'
import Http from '../Utils/Http';

export default function CardTemplateComponent(props) {

  const http = Http();
  const useStyle = makeStyles(theme => ({
    root_template: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& .MuiFormHelperText-root': {
        marginLeft: '0px'
      }
    },
    content_wrap: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto'
    },
    content_teamplte: {
      display: 'flex',
      flexWrap : 'wrap',
      flexDirection: 'column',
      padding: '10px',
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      }
    },
    head_title: {
      width: '100%',
      textAlign: 'center'
    },
    shortName: {
      marginRight: '10px'
    },
    autocomplete_textfield: {
      width: 'calc(100% - 15px)'
    },
    row_field: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      '& >*': {
        flex: 1
      }
    },
    tilde: {
      flex: '0.1',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    action_buttons: {
      display: 'flex',
      flexDirection: 'row',
      margin: '10px',
      justifyContent: 'space-between',
      '& > button': {
        width: '47%'
      }
    }
  }));
  const classes = useStyle();
  const { history } = props;
  const [bibleCodes, setBibleCodes] = React.useState([]);
  
  React.useEffect(async () => {

    var response = await fetch(`/mock_bible_code.json`);
    var bibleCodes = await response.json();
    setBibleCodes(bibleCodes)
  }, [])


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
    if(value.bible_code && value.chapter && value.f_verse) {
      loadContent()
      // console.log('ran...')
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
    edited : false
  })

  const goBack = () => {
    history.goBack();
  }
  const onChangeHandling = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  }
  const onChangeAutocomplete = function (event, newValue) {
    setValue({...value, bible_code : newValue.bible_code})
  }
  function autocompleteTextfieldRender(params) {
    return (
      <TextField 
        key={params.bible_code} 
        label="성경" {...params} 
        fullWidth={false} 
        className={classes.autocomplete_textfield} 
        variant="outlined" 
        required
        error={validators.bible_code}
        helperText={validators.bible_code ? '성경을 선택해주세요' : ''}/>
    )
  }
  async function loadContent() {
    try {
      var { bible_code, chapter, f_verse, l_verse } = value;

      var queryData = { bible_code, chapter, f_verse };
      if(l_verse) {
        queryData.l_verse = l_verse;
      }
      var res = await http.get({ query : 'RC/oyo/content', data : queryData})
      var content = res.data;
      setValue({...value, content : content});
    } catch (error) {
      console.error(error);
    }
  }
  function onSaveHandling() {
    try {
      var result = http.post({query: "RC", data: value})

      /********** Notice Saved OYO Card **********/

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
      })

    } catch (error) {
      console.error(error);
    }
  }
  const checkValidate = () => {
    var validated = {}
    for(var itr in value) {
      switch(itr) {
        case 'f_verse':
        case 'chapter':
        case 'bible_code':
        case 'content':
          if(!value[itr]) {
            validated[itr] = true;
          } else if(validators[itr]){
            validated[itr] = false;
          }
          break;
      }
    }
    setValidators({...validators, ...validated})
  }
  
  return (
    <>
      { bibleCodes.length > 0 ?
        <Container maxWidth="sm" className={classes.root_template}>
          <div className={classes.content_wrap}>
            <Paper elevation={2} variant="outlined" className={classes.content_teamplte}>
              <Box component="h3" className={classes.head_title}>사용자 구절(OYO) 추가</Box>
              <TextField
                id="teamplte_theme"
                type="text"
                label="암송 주제"
                value={value.theme}
                variant="outlined"
                onChange={onChangeHandling('theme')}
              />
              <div className={classes.row_field}>
                <Autocomplete
                  id="teamplte_bible"
                  options={bibleCodes}
                  getOptionLabel={(props) => props.bible_name}
                  onChange={onChangeAutocomplete}
                  fullWidth={false}
                  renderOption={(params) => (<><span className={classes.shortName}>{params.short_name}</span>{params.bible_name}</>)}
                  renderInput={autocompleteTextfieldRender}
                ></Autocomplete>
                <TextField
                  id="template_chapter"
                  label="장"
                  type="number"
                  value={value.chapter}
                  variant="outlined"
                  required
                  onChange={onChangeHandling('chapter')}
                  InputProps={{ inputProps: { min : 0, max : option.maxChapter}}}
                  error={validators.chapter}
                />
              </div>
              <div className={classes.row_field}>
                <TextField
                  id="template_fverse"
                  type="number"
                  label="시작 절"
                  value={value.f_verse}
                  variant="outlined"
                  required
                  onChange={onChangeHandling('f_verse')}
                  error={validators.f_verse}
                />
                <Box component="h4" className={classes.tilde}>~</Box>
                <TextField
                  id="template_lverse"
                  type="number"
                  label="끝 절"
                  value={value.l_verse}
                  variant="outlined"
                  onChange={onChangeHandling('l_verse')}
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
              <div className={classes.action_buttons}>
                <Button type="button" color="secondary" aria-label="oyo-cancel" variant="outlined" onClick={goBack}>취소</Button>
                <Button type="button" color="primary" aria-label="oyo-write" variant="contained" onClick={onSaveHandling}>저장</Button>
              </div>
            </Paper>
          </div>
        </Container>

        : <></>}
    </>
  )
}