import { Button, Container, Divider, TextField } from '@material-ui/core';
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
 * @property {ClassNameMap} classes
 * 
 */
/**
 * 
 * @param {QuestUnitProps} props 
 * @returns 
 */
export default function ExamChapterVerseComponent(props) {

  const { quest, state, updateState, setDeduction, confirm, classes } = props;

  const handleChangeValue = (props) => (event) => {
    var updateItem = { ...state, value: { ...state.value, [props]: event.target.value } }
    updateState(updateItem);
  }

  const handleBibleChange = (event, newValue) => {
    handleChangeValue('bible_code')({target: {value: newValue.bible_code}});
  }

  const handleOnClick = function () {
    var res = {};
    var point = 0;
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
    <Container>

      <form className={classes.form_checking}>
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
                className={state.flags.theme === null ? null : (state.flags.theme === true ? classes.succeed : classes.failed)} />
            ) : <></>
        }
        <div className={classes.row_part}>
          <AutoCompleteBible
            classes={classes}
            fullWidth={true}
            id="checking_bible"
            className={state.flags.bible_code === null ? null : (state.flags.bible_code === true ? classes.succeed : classes.failed)}
            onChange={handleBibleChange}
            {... (state.flags.result ? { defaultValue: quest.bible_code } : {})}
          />
          <TextField type="number"
            value={state.value.chapter}
            variant="outlined"
            label="장"
            required
            onChange={handleChangeValue('chapter')}
            className={state.flags.chapter === null ? null : (state.flags.chapter === true ? classes.succeed : classes.failed)} />
          <TextField type="number"
            value={state.value.f_verse}
            variant="outlined"
            label="시작 구절"
            required
            onChange={handleChangeValue('f_verse')}
            className={state.flags.f_verse === null ? null : (state.flags.f_verse === true ? classes.succeed : classes.failed)} />
          <TextField type="number"
            value={state.value.l_verse}
            variant="outlined"
            label="끝 구절"
            required
            onChange={handleChangeValue('l_verse')}
            className={state.flags.l_verse === null ? null : (state.flags.l_verse === true ? classes.succeed : classes.failed)} />
        </div>
        <TextField id="checking_content" rows="6" variant="outlined" value={quest.content}
          inputProps={{ readOnly: true }}
          multiline
          label="내용"
          className={classes.content_checking} />
        <Divider />
        <Button type="button" variant="contained" color="primary" onClick={() => { handleOnClick() }}>확인</Button>
      </form>

    </Container>
  )
}