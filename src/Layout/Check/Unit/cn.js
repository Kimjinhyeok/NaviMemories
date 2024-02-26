import { Button, Container, TextField } from '@mui/material'
import React from 'react'

import AutoCompleteBible from '../../autoCompleteBible';
import { Refresh } from '@mui/icons-material';
import compareText from '../../../Utils/compareText';
import TextInput from '../../../Components/TextInput';
import TextArea from '../../../Components/TextArea';

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

  React.useEffect(() => {
    handleOnRefresh();
  }, [origin])
  
  const handleOnClick = function () {
    var res = {
      content : value.content == origin.content,
      result : true
    };
    if(origin.theme) {
      
      res.theme = value.theme === origin.theme;
      if(value.theme !== origin.theme) {
        setValue({...value, theme: origin.theme})
      }
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
  /**
   * 
   * @param {String} text 
   */
  function get2WorldSegments(text) {
    let segments = text.split(/(\s+)/);

    if(segments.length <= 2) {
      return segments.join("");
    } else {

    }
  }
  const handleHint = function () {
    var res = compareText(value.content, origin.content);

    let spanTagList = [];
    var segmentCount = 0;
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
            spanTagList.push({type : -1, text : segmentsWithSpace.slice(0, idxLastSegment).join("")});
            segmentCount += 2;
          } else if (segmentCount < 2) {
            // 2어절 이하인 경우
            spanTagList.push({type : -1, text : segmentsWithSpace.join("")});
            if(res[Number(idx)+1][0] !== 1) {
              segmentCount += segments.length;
            }
          }
          break;
        case 0:
          spanTagList.push({type : 0, text : res[idx][1]});
          if (segmentCount > 0) segmentCount++;
          break;
        case 1:
          segments = res[idx][1].split(" ").filter(item => item != "");
          segmentsWithSpace = res[idx][1].split(/(\s+)/);
          if (segmentCount >= 2) {
            // 이미 첨삭이 이루어진 경우 빼주지 않음
            spanTagList.push({type : 1, text : res[idx][1]});
          }
          else if (segments.length >= 2) {
            // 2어절 초과인 경우 2어절, 앞에서 첨삭이 있었으면 남는 만큼만 빼준다
            let firstSegment = segments[2 - segmentCount];
            let idxFirstSegment = segmentsWithSpace.findIndex(item => item === firstSegment);

            spanTagList.push({type : 1, text : segmentsWithSpace.slice(idxFirstSegment).join("")});
            segmentCount += 2;
          }
          break;
      }
    }
    setMatchResult(spanTagList);
    if(!flags.hint) {
      setFlags({...flags, hint : true});
    }

  }
  const compareContent = function () {
    var result = compareText(value.content, origin.content);

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
          disabled={!origin.theme}
          className={flags.theme === null ? null : (flags.theme === true ? classes.succeed : classes.failed)}/>
        <AutoCompleteBible
          classes={classes}
          fullWidth={true}
          defaultValue={origin.bible_code}
          disabled={true}
          id="checking_bible"
        />
        <div className={classes.row_part}>
          <TextInput
            type='number'
            label='장'
            value={origin.chapter}
            props={{readOnly : true}}
          />
          <TextInput
            type="number"
            value={origin.f_verse} 
            label="시작 구절" 
            props={{readOnly: true}}
          />
          <TextInput
            type="number"
            value={origin.l_verse} 
            label="끝 구절" 
            props={{readOnly: true}}
          />
        </div>
        <TextArea 
          value={value.content}
          label="내용" 
          className={(flags.result ? classes.hide : '')}
          onChange={handleChangeValue('content')} 
        />
        <div className={(flags.result || flags.hint) ? classes.content_result : classes.hide}>
          {
            matchResult.length > 0 ? (matchResult.map((item, idx) => (<span key={idx} className={item.type===0 ? classes.correct : (item.type === -1 ? classes.incorrect : classes.omitted) }>{item.text}</span>))) : <></>
          }
        </div>
        <div className={classes.action_button}>
          {
            flags.result ? 
              <Button type="button" variant="contained" color="primary" onClick={() => {handleOnRefresh()}}><Refresh />재도전</Button>
            :
            <>
              <Button type="button" variant="outlined" color="default" onClick={() => {handleHint()}}>힌트</Button>
              <Button type="button" variant="contained" color="primary" onClick={() => {handleOnClick()}}>확인</Button>
            </>
          }
          
        </div>
      </form>
      
    </Container>
  )
}