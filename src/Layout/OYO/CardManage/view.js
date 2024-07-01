import React from 'react'
/**
 * 
 * @typedef OYOCardForViewProps
 * @property {Object} v
 * @property {Object} classes
 * 
 * @param {OYOCardForViewProps} props 
 * @returns 
 */
export default function OYOCardForView(props) {
  const v = props.v;
  return (
    <div className={'p-2 pt-0'}>
      <div className="theme"><span aria-label="oyo_theme">{v.theme}</span></div>
      <div className="bcv flex space-x-1 text-green-600">
        <span aria-label="oyo_bible">{v.bible_name}</span>
        <span aria-label="oyo_chapter">{v.chapter}</span>
        <span aria-label="oyo_chapter_colon">:</span>
        <span aria-label="oyo_f_verse">{`${v.f_verse}${v.l_verse ? ',' : ''}`}</span>
        {
          v.l_verse ? (<span aria-label="oyo_l_verse">{v.l_verse}</span>) : <></>
        }
      </div>
      <div className="cn mt-1 leading-[18px]">
        {v.content}
      </div>
    </div>
  )
}