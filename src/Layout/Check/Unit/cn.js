import { Button, Container, TextField } from '@material-ui/core'
import React from 'react'
import DiffMatchPatch from 'diff-match-patch';
import AutoCompleteBible from '../../autoCompleteBible';
import { Refresh } from '@material-ui/icons';

export default function CheckContentComponent(props) {

  const { classes, origin} = props;

  const initialValues = {theme : "", content: ""}
  const initialFlags = {
    theme : null,
    content : null,
    hint : false,
    result : false
  }
  var [value, setValue] = React.useState(initialValues);
  var [flags, setFlags] = React.useState(initialFlags);

  const [matchResult, setMatchResult] = React.useState([]);
  
  const handleChangeValue = (props) => (event) => {
    setValue({...value, [props] : event.target.value})
  }
  
  const handleOnClick = function () {
    var res = {
      theme : value.theme === origin.theme,
      content : value.content == origin.content,
      result : true
    };
    if(value.theme !== origin.theme) {
      setValue({...value, theme: origin.theme})
    }
    setFlags({
      ...flags,
      ...res
    });
    compareContent()
  }
  const handleOnRefresh = function () {
    setValue(initialValues);
    setFlags(initialFlags);
    setMatchResult([]);
  }
  
  function checkEmpty(params) {
    return params ? params : ''
  }
  function getHintText(segments) {
    return segments[0] + checkEmpty(segments[1]) + checkEmpty(segments[2]) + (segments[0] === " " ? checkEmpty(segments[3]) : "")
  }
  const handleHint = function () {
    var diffMatchPatch = new DiffMatchPatch.diff_match_patch();
    var result = diffMatchPatch.diff_main(origin.content, value.content);

    var lastIncorrectIndex = -1;
    var incorrectCount = 0;
    result.forEach((node, idx) => {
      if(node[0] === -1) {
        lastIncorrectIndex = idx
        incorrectCount++; 
      }
    });

    var spanTagList = [];
    if(lastIncorrectIndex == 1 && incorrectCount == 1) { // 다 맞다가 모르는 경우
      spanTagList.push({type : 0, text : result[0][1]});
      let segments = result[1][1].split(/(\s+)/);
      if(!segments[0]) {
        segments.shift(); // ''값이 있을 경우 제거
      }
      let hint = getHintText(segments);
      spanTagList.push({type : -1, text : hint});

    } else if(lastIncorrectIndex >= 0 && incorrectCount > 1) { // 중간에 틀린 어절이 있는 경우
      let segmentCount = 0;
      for(var node of result) {
        switch(node[0]) {
          case 0:
            spanTagList.push({type : 0, text : node[1]})
            break;
          case -1:
            if(node[1] !== " ") segmentCount++;
            if(segmentCount === 2) break;
            else spanTagList.push({type : -1, text : node[1]})
            break;
          case 1:
            spanTagList.push({type : 1, text : node[1]})
            break;
        }
        if(segmentCount == 2) break;
      }
    } else {  // 그냥 모르는 경우
      let segments = result[0][1].split(/(\s+)/);
      let hint = getHintText(segments);
      spanTagList.push({type : -1, text : hint})
    }
    setMatchResult(spanTagList);
    if(!flags.hint) {
      setFlags({...flags, hint : true});
    }

  }
  const compareContent = function () {
    var diffMatchPatch = new DiffMatchPatch.diff_match_patch();
    var result = diffMatchPatch.diff_main(origin.content, value.content);

    var spanTagList =  result.map(node => {
      return {
        type : node[0],
        text : node[1]
      }
    });
    setMatchResult(spanTagList);

  }
  return (
    <Container maxWidth="md" className={classes.root_checking}>
    
      <form className={classes.form_checking}>
        <TextField id="checking_theme" variant="outlined" 
          value={value.theme} 
          onChange={handleChangeValue('theme')} 
          autoComplete="off"
          required
          label="주제" 
          className={flags.theme === null ? null : (flags.theme === true ? classes.succeed : classes.failed)}/>
        <div className={classes.row_part}>
          <AutoCompleteBible
            classes={classes}
            fullWidth={true}
            defaultValue={origin.bible_code}
            disabled={true}
            id="checking_bible"
          />
          <TextField type="number" 
            value={value.chapter} 
            variant="outlined" 
            label="장" 
            defaultValue={origin.chapter}
            inputProps={{readOnly: true}}
          />
          <TextField type="number" 
            value={value.f_verse} 
            variant="outlined" 
            label="시작 구절" 
            defaultValue={origin.f_verse}
            inputProps={{readOnly: true}}
          />
          <TextField type="number" 
            value={value.l_verse} 
            variant="outlined" 
            label="끝 구절" 
            defaultValue={origin.l_verse}
            inputProps={{readOnly: true}}  
          />
        </div>
        <TextField id="checking_content" rows="6" variant="outlined" value={value.content}
          multiline
          required
          autoComplete="off"
          label="내용" 
          // className={(flags.result ? classes.hide : '')}
          onChange={handleChangeValue('content')} 
        />
        <div className={(flags.result || flags.hint) ? classes.content_result : classes.hide}>
          {
            matchResult.length > 0 ? (matchResult.map((item, idx) => (<span key={idx} className={item.type===0 ? classes.correct : (item.type === -1 ? classes.incorrect : classes.omitted) }>{item.text}</span>))) : <></>
          }
        </div>
        <div className={classes.action_button}>
          <Button type="button" variant="outlined" color="default" onClick={() => {handleHint()}}>힌트</Button>
          {
            flags.result ? 
            <Button type="button" variant="contained" color="primary" onClick={() => {handleOnRefresh()}}><Refresh />재도전</Button>
            :
            <Button type="button" variant="contained" color="primary" onClick={() => {handleOnClick()}}>확인</Button>
          }
          
        </div>
      </form>
      
    </Container>
  )
}