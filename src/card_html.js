import { makeStyles } from '@material-ui/core';
import React from 'react'
export default function CardHtml(props) {

    const [memory] = React.useState({
        bible_code : props.item.bible_code,
        card_num : props.item.card_num,
        category : props.item.category,
        chapter : props.item.chapter,
        f_verse : props.item.f_verse,
        l_verse : props.item.l_verse,
        series_code : props.item.series_code,
        theme : props.item.theme,
        verse_gae : props.item.verse_gae,
        verse_kor : props.item.verse_kor,
    })

    return (
        <div className="carousel-card">
            <div className="carousel-card-inner">
                <div className="carousel-title">{memory.theme}</div>
                <div className="carousel-text">
                    <div className="chapter_layer">
                        <div className="bible_name">{memory.bible_code}</div>
                        <div className="chapter">{memory.chapter}</div>
                        <span>:</span>
                        <div className="verses">
                            <span>{memory.f_verse}</span>
                            {memory.l_verse ? <div><span>~</span><span>{memory.l_verse}</span></div> : <></>}
                        </div>
                    </div>
                    <div className="verse_text">{memory.verse_gae}</div>
                    <div className="category">{memory.category}</div>
                </div>
            </div>
        </div>
    )
} 