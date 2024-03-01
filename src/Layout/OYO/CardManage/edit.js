import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import AutoCompleteBible from '../../autoCompleteBible'

/**
 * @typedef OYOCardForEditProps
 * @property {Object} v
 * @property {Function} cancelEdit
 * @property {Function} runEdit
 * 
 * @param {OYOCardForEditProps} props 
 * @returns 
 */
export default function OYOCardForEdit(props) {

  const {cancelEdit, runEdit} = props;
  const [CardInfo, setCardInfo] = useState(props.v);

  const onChangeHandling = (property) => (ev) => {
    setCardInfo({
      ...CardInfo,
      [property] : ev.target.value
    });
  }
  const onChangeHandleBible = function(ev, val) {
    setCardInfo({
      ...CardInfo,
      bible_code: val.bible_code
    });
  }
  return (
    <div className={'p-2 pt-0'}>
      <TextField id="card_theme" value={CardInfo.theme} onChange={onChangeHandling('theme')} label="주제" variant="outlined" fullWidth={true}/>
      <AutoCompleteBible
        fullWidth={true}
        id="card_bible"
        onChange={onChangeHandleBible}
        defaultValue={CardInfo.bible_code} 
        variant="outlined"
        renderOption={(params) => (<><span className={'mr-3'}>{params.short_name}</span>{params.bible_name}</>)}
      />
      <div className="cv">
        <TextField id="card_chapter" value={CardInfo.chapter} onChange={onChangeHandling('chapter')} label="장" variant="outlined"/>
        <TextField id="card_f_verse" value={CardInfo.f_verse} onChange={onChangeHandling('f_verse')} label="첫절" variant="outlined"/>
        <TextField id="card_l_verse" value={CardInfo.l_verse} onChange={onChangeHandling('l_verse')} label="끝절" variant="outlined"/>
      </div>
      <TextField id="card_content" value={CardInfo.content} onChange={onChangeHandling('content')} label="내용" variant="outlined" rows={3} fullWidth={true} multiline={true} className="content"/>
      <div className="actions">
        <Button variant="contained" color="secondary" onClick={() => {cancelEdit()}}>취소</Button>
        <Button variant="contained" color="primary" onClick={() => {runEdit(CardInfo)}}>완료</Button>
      </div>
    </div>
  )
}