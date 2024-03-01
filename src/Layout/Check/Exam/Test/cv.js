import { Button, Container, Divider, TextField } from '@mui/material';
import React from 'react'
import AutoCompleteBible from '../../../autoCompleteBible';

/**
 * @typedef CNQuestion
 * @property {Number} bible_code
 * @property {Number} chapter
 * @property {Number} f_verse
 * @property {Number} l_verse
 * @property {String} theme
 */
/**
 * @typedef QuestionState
 * @property {Object} flags
 * @property {Object} value
 */
/**
 * @typedef QuestUnitProps
 * @property {CNQuestion} quest
 * @property {QuestionState} state
 * @property {Function} updateState
 * @property {addDeduction} setDeduction
 * @property {Function} confirm
 * 
 */
/**
 * 
 * @param {QuestUnitProps} props 
 * @returns 
 */
export default function ExamChapterVerseComponent(props) {

  const { quest, state, updateState, setDeduction, confirm } = props;

  const handleChangeValue = (props) => (event) => {
    var updateItem = { ...state, value: { ...state.value, [props]: event.target.value } }
    updateState(updateItem);
  }

  const handleBibleChange = (event, newValue) => {
    handleChangeValue('bible_code')({target: {value: newValue.bible_code}});
  }

  const handleOnClick = function () {
    var res = state.flags;
    var point = 0;

    res.theme = state.value.theme === quest.theme;
    if(!res.theme) {
      point += 2;
    }
    res.bible_code = state.value.bible_code == quest.bible_code;
    if(!res.bible_code) {
      point += 2;
    }
    res.chapter = state.value.chapter == quest.chapter;
    if(!res.chapter) {
      point += 2;
    }
    res.f_verse = state.value.f_verse == quest.f_verse;
    res.l_verse = state.value.l_verse == quest.l_verse;
    if(!res.f_verse || !res.l_verse) {
      point+=2;
    }
    
    var updateItem = { ...state, flags: res };
    updateState(updateItem);

    setDeduction(point);
  }

  const handleFocus = (props) => (event) => {
    if (state.flags[props] == false) {
      var updateItem = { ...state, flags: { ...state.flags, [props]: null } }
      updateState(updateItem);
    }
    event.stopPropagation();
  }
  return (
    <Container sx={{padding: '0 !important'}}>

      <form className={'w-full m-auto flex flex-col space-y-2'}>
        {
          state.flags.doTheme ?
            (
              <TextField id="checking_theme" variant="outlined"
                value={state.value.theme}
                onFocus={handleFocus('theme')}
                onChange={handleChangeValue('theme')}
                autoComplete="off"
                required
                label="주제"
                className={state.flags.theme === null ? null : (state.flags.theme === true ? 'bg-blue-500' : 'bg-red-500')} />
            ) : <></>
        }
        <AutoCompleteBible
          fullWidth={true}
          id="checking_bible"
          className={state.flags.bible_code === null ? null : (state.flags.bible_code === true ? 'bg-blue-500' : 'bg-red-500')}
          onChange={handleBibleChange}
          onFocus={handleFocus('bible_code')}
          {... (state.flags.result ? { defaultValue: quest.bible_code } : {defaultValue : state.value.bible_code})}
        />
        <div className={'flex space-x-2'}>
          <TextField type="number"
            value={state.value.chapter}
            variant="outlined"
            label="장"
            required
            onChange={handleChangeValue('chapter')}
            onFocus={handleFocus('chapter')}
            className={state.flags.chapter === null ? null : (state.flags.chapter === true ? 'bg-blue-500' : 'bg-red-500')} />
          <TextField type="number"
            value={state.value.f_verse}
            variant="outlined"
            label="시작 구절"
            required
            onChange={handleChangeValue('f_verse')}
            onFocus={handleFocus('f_verse')}
            className={state.flags.f_verse === null ? null : (state.flags.f_verse === true ? 'bg-blue-500' : 'bg-red-500')} />
          <TextField type="number"
            value={state.value.l_verse}
            variant="outlined"
            label="끝 구절"
            required
            onChange={handleChangeValue('l_verse')}
            onFocus={handleFocus('l_verse')}
            className={state.flags.l_verse === null ? null : (state.flags.l_verse === true ? 'bg-blue-500' : 'bg-red-500')} />
        </div>
        <TextField id="checking_content" rows="6" variant="outlined" value={quest.content}
          inputProps={{ readOnly: true }}
          multiline
          label="내용"
          className={'flex-1'} />
        <Divider />
        <Button  variant="contained" color="primary" onClick={handleOnClick}>확인</Button>
      </form>

    </Container>
  )
}