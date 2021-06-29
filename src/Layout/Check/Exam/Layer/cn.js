import { Button, Container, TextField } from '@material-ui/core';
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
export default function ExamContentComponent(props) {

  const {quest, state, updateState, setDeduction, confirm, classes} = props;

  const handleChangeValue = (props) => (event) => {
    updateState(props, event.target.value);
  }
  const handleHint = function() {

  }
  const handleOnClick = function() {

  }
  return (
    <Container maxWidth="md" className={classes.root_checking}>
    
      <form className={classes.form_checking}>
        <TextField id="checking_theme" variant="outlined" 
          value={state.value.theme} 
          onChange={handleChangeValue('theme')} 
          autoComplete="off"
          required
          label="주제" 
          className={state.flags.theme === null ? null : (state.flags.theme === true ? classes.succeed : classes.failed)}/>
        <div className={classes.row_part}>
          <AutoCompleteBible
            classes={classes}
            fullWidth={true}
            defaultValue={quest.bible_code}
            disabled={true}
            id="checking_bible"
          />
          <TextField type="number" 
            value={state.value.chapter} 
            variant="outlined" 
            label="장" 
            value={quest.chapter}
            inputProps={{readOnly: true}}
          />
          <TextField type="number" 
            value={state.value.f_verse} 
            variant="outlined" 
            label="시작 구절" 
            value={quest.f_verse}
            inputProps={{readOnly: true}}
          />
          <TextField type="number" 
            value={state.value.l_verse} 
            variant="outlined" 
            label="끝 구절" 
            value={quest.l_verse}
            inputProps={{readOnly: true}}  
          />
        </div>
        <TextField id="checking_content" rows="6" variant="outlined" value={state.value.content}
          multiline
          required
          autoComplete="off"
          label="내용" 
          // className={(state.flags.result ? classes.hide : '')}
          onChange={handleChangeValue('content')} 
        />
        <div className={classes.action_button}>
          <Button type="button" variant="outlined" color="default" onClick={() => {handleHint()}}>힌트</Button>
          <Button type="button" variant="contained" color="primary" onClick={() => {handleOnClick()}}>확인</Button>
        </div>
      </form>
      
    </Container>
  )
}