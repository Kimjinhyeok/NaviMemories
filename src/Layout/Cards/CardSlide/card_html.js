import React from 'react'
export default function CardHtml(props) {

    const [memory] = React.useState({
        bible_code: props.item.bible_code,
        bible_name: props.item.bible_name,
        card_num: props.item.card_num,
        category: props.item.category,
        chapter: props.item.chapter,
        f_verse: props.item.f_verse,
        l_verse: props.item.l_verse,
        series_code: props.item.series_code,
        theme: props.item.theme,
        verse_gae: props.item.verse_gae,
        verse_kor: props.item.verse_kor,
    });
    const { classes } = props;

    return (
        <div className={classes.carouselCard}>
            <div className={classes.carouselCardInner}>
                <div className={classes.carouselTitle}>{memory.theme}</div>
                <div className={classes.carouselText}>
                    <div className={classes.chapterLayer}>
                        <div className={classes.bibleName}>{memory.bible_name}</div>
                        <div className={classes.chapter}>{memory.chapter}</div>
                        <span>:</span>
                        <div className={classes.verses}>
                            <span>{memory.f_verse}</span>
                            {memory.l_verse ? <div><span>~</span><span>{memory.l_verse}</span></div> : <></>}
                        </div>
                    </div>
                    <div className={classes.verseText}><div>{memory.verse_gae}</div></div>
                    <div className={classes.category}>{memory.category}</div>
                </div>
            </div>
        </div>
    )
}