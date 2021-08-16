import { Checkbox, FormControlLabel } from '@material-ui/core';
import React from 'react'
import cookies from '../../../Data/cookies';
export default function CardHtml(props) {

    const { item, classes, updatePassed, version} = props;

    return (
        <div className={classes.carouselCard}>
            <div className={classes.carouselCardInner}>
                {
                    item.theme ? 
                        <div className={classes.carouselTitle}>{item.theme}</div>
                    :
                        <></>
                }
                <div className={classes.carouselText}>
                    <div className={classes.chapterLayer}>
                        <div className={classes.bibleName}>{item.bible_name}</div>
                        <div className={classes.chapter}>{item.chapter}</div>
                        <span>:</span>
                        <div className={classes.verses}>
                            <span>{item.f_verse}</span>
                            {item.l_verse ? <div><span>~</span><span>{item.l_verse}</span></div> : <></>}
                        </div>
                    </div>
                    <div className={classes.verseText}><div>{version ? item.verse_gae : (item.verse_kor || item.verse_gae)}</div></div>
                    <div className={classes.category}>{item.category}</div>
                </div>
                {
                    cookies.isLogin() ?
                        <div className={classes.option}>
                            <FormControlLabel
                                checked={(item.passed === null || item.passed === undefined) ? false : item.passed}
                                value={(item.passed === null || item.passed === undefined) ? false : item.passed}
                                control={<Checkbox color="primary" />}
                                label="암송"
                                labelPlacement="start"
                                onChange={(ev) => updatePassed(ev, item)}
                            />
                        </div>
                    :
                        <></>

                }
            </div>
        </div>
    )
}