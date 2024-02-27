import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react'
import cookies from '../../../Data/cookies';
import { SwiperSlide } from 'swiper/react';
export default function CardHtml(props) {

    const { item, classes, updatePassed, version } = props;

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className={'w-[300px] h-full flex justify-center items-center rounded'}>
                <div className={'flex flex-col relative w-[400px] h-[400px] rounded border-2 p-2'}>
                    {
                        item.theme ?
                            <div className={'text-xl'}>{item.theme}</div>
                            :
                            <></>
                    }
                    <div className={'mt-2 flex flex-1 flex-col whitespace-pre-wrap text-left'}>
                        <div className={'flex flex-row align-middle mb-1 space-x-1'}>
                            <div>{item.bible_name}</div>
                            <div>{item.chapter}</div>
                            <span>:</span>
                            <div className={'flex flex-row flex-1 space-x-1'}>
                                <span>{item.f_verse}</span>
                                {item.l_verse ? <div><span>~</span><span>{item.l_verse}</span></div> : <></>}
                            </div>
                        </div>
                        <div className={'mt-1'}><div>{version ? item.verse_gae : (item.verse_kor || item.verse_gae)}</div></div>
                        <div className={'mt-2 text-right'}>{item.category}</div>
                    </div>
                    {
                        cookies.isLogin() ?
                            <div className={'absolute'}>
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
        </div>
    )
}