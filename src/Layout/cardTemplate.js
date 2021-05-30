import { Box, Button, Container, Divider, makeStyles, Paper, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react'

export default function CardTemplateComponent(props) {

  const useStyle = makeStyles(theme => ({
    root_template: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
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
  const [value, setValue] = React.useState({
    theme: '',
    bible_code: '',
    chapter: 0,
    f_verse: 0,
    l_verse: 0,
    content: ''
  });
  const [option, setOption] = React.useState({
    maxChapter: 999,
    edited : false
  })

  React.useEffect(async () => {

    var response = await fetch(`/mock_bible_code.json`);
    var bibleCodes = await response.json();
    setBibleCodes(bibleCodes)
  }, [])

  const goBack = () => {
    history.goBack();
  }
  const onChangeHandling = (props) => (event) => {
    setValue({ ...value, [props]: event.target.value });
  }
  const onChangeAutocomplete = function (event, newValue) {
    setValue({...value, bible_code : newValue.bible_code})
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
                label="주제를 입력해주세요."
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
                  renderInput={(params) => <TextField key={params.bible_code} label="성경" {...params} fullWidth={false} className={classes.autocomplete_textfield} variant="outlined" required/>}
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
                />
                <Box component="h4" className={classes.tilde}>~</Box>
                <TextField
                  id="template_fverse"
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
                onChange={onChangeHandling('content')} />
                <Divider />
                <div className={classes.action_buttons}>
                  <Button type="button" color="secondary" aria-label="oyo-cancel" variant="outlined" onClick={goBack}>취소</Button>
                  <Button type="button" color="primary" aria-label="oyo-write" variant="contained">저장</Button>
                </div>
            </Paper>
          </div>
        </Container>

        : <></>}
    </>
  )
}