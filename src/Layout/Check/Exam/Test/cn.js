import { Button, Container, TextField } from '@mui/material';
import React from 'react'
import AutoCompleteBible from '../../../autoCompleteBible';
import DiffMatchPatch from 'diff-match-patch';
import compareText from '../../../../Utils/compareText';

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

  const { quest, state, updateState, setDeduction, confirm, classes } = props;
  const defPoint = 6;

  const handleHint = function () {
    var diffMatchPatch = new DiffMatchPatch.diff_match_patch();
    var res = diffMatchPatch.diff_main(quest.content, state.value.content).filter(item => item[1] != " ");

    var segmentCount = 0;
    var hintText = "";
    for (var idx in res) {
      let segments = [];
      let segmentsWithSpace
      switch (res[idx][0]) {
        case -1:
          segments = res[idx][1].split(" ").filter(item => item != "");
          segmentsWithSpace = res[idx][1].split(/(\s+)/);
          if (segmentCount < 2 && segments.length > 2) {
            // 2어절 초과인 경우
            let lastSegment = segments[2 - segmentCount];
            let idxLastSegment = segmentsWithSpace.findIndex(item => item === lastSegment);
            if (segmentsWithSpace[idxLastSegment] + 1 == " ") {
              idxLastSegment++;
            }
            hintText += segmentsWithSpace.slice(0, idxLastSegment).join("");
            segmentCount += 2;
          } else if (segmentCount < 2) {
            // 2어절 이하인 경우
            hintText += segmentsWithSpace.join("");
            if(res[Number(idx)+1][0] !== 1) {
              segmentCount += segments.length;
            }
          }
          break;
        case 0:
          hintText += res[idx][1];
          if (segmentCount > 0) segmentCount++;
          break;
        case 1:
          segments = res[idx][1].split(" ").filter(item => item != "");
          segmentsWithSpace = res[idx][1].split(/(\s+)/);
          if (segmentCount >= 2) {
            // 이미 첨삭이 이루어진 경우 빼주지 않음
            hintText += res[idx][1];
          }
          else if (segments.length >= 2) {
            // 2어절 초과인 경우 2어절, 앞에서 첨삭이 있었으면 남는 만큼만 빼준다
            let firstSegment = segments[2 - segmentCount];
            let idxFirstSegment = segmentsWithSpace.findIndex(item => item === firstSegment);

            // if(segmentsWithSpace[idxFirstSegment]+1 == " ") {
            //   idxFirstSegment++;
            // }
            hintText += segmentsWithSpace.slice(idxFirstSegment).join("");
            segmentCount += 2;
          }
          break;
      }
    }
    
    var updateItem = { flags: { ...state.flags, hintCount: state.flags.hintCount - 1 }, value: { ...state.value, content: hintText } }
    updateState(updateItem);
  }

  const handleChangeValue = (props) => (event) => {
    var updateItem = { ...state, value: { ...state.value, [props]: event.target.value } }
    updateState(updateItem);
  }

  const handleOnClick = function () {
    var point = 0;
    var res = state.flags;
    var result = compareText(state.value.content, quest.content);

    let incorrectText = result.filter(item => item[0] != 0).map(item => item[1]);
    let sumIncorrectPoint = 0;
    
    incorrectText.forEach(txt => {
      let segments = txt.split(" ");
      sumIncorrectPoint += ((Math.floor(segments.length / 2)) + (segments.length % 2));
    });

    res.content = !(sumIncorrectPoint > 0);
    point += sumIncorrectPoint;

    if (state.flags.doTheme) {
      res.theme = quest.theme === state.value.theme;
      if (!res.theme) {
        point += 2;
      }
    }
    point += state.flags.hintCount;

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
                className={state.flags.theme === null ? null : (state.flags.theme === true ? classes.succeed : classes.failed)} />
            ) : <></>
        }

        <AutoCompleteBible
          fullWidth={true}
          defaultValue={quest.bible_code}
          disabled={true}
          
          id="checking_bible"
        />
        <div className={'flex space-x-2'}>
          <TextField type="number"
            variant="outlined"
            label="장"
            value={quest.chapter}
            inputProps={{ readOnly: true }}
          />
          <TextField type="number"
            variant="outlined"
            label="시작 구절"
            value={quest.f_verse}
            inputProps={{ readOnly: true }}
          />
          <TextField type="number"
            variant="outlined"
            label="끝 구절"
            value={quest.l_verse}
            inputProps={{ readOnly: true }}
          />
        </div>
        <TextField id="checking_content" rows="6" variant="outlined" value={state.value.content}
          multiline
          required
          autoComplete="off"
          label="내용"
          // className={(state.flags.result ? classes.hide : '')}
          onChange={handleChangeValue('content')}
          onFocus={handleFocus('content')}
          className={state.flags.content === null ? null : (state.flags.content === true ? classes.succeed : classes.failed)}
        />
        <div className={'flex justify-end space-x-2'}>
          <Button variant="outlined" onClick={handleHint}>힌트</Button>
          <Button variant="contained" color="primary" onClick={handleOnClick}>확인</Button>
        </div>
      </form>

    </Container>
  )
}