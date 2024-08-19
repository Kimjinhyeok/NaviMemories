import { Box, Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React, { Fragment, useMemo } from 'react'
import cookies from '../../../Data/cookies';
import { useSelector } from 'react-redux';
import { KEY_HIDE_OPTIONS } from '../../../Redux/hideOptions/action';

function CardComponent (props, ref) {
    
    const hideOptions = useSelector(state => state[KEY_HIDE_OPTIONS]);

    const { item, updatePassed, version, idx, length } = props;
    const commonShow = useMemo(() => !(hideOptions.cv || hideOptions.cn), [hideOptions]);

    return (
        <Card ref={ref} sx={{ margin: '8px', position: 'relative' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '4px', paddingBottom: '16px !important' }}>
                <ThemeLayer show={commonShow} {...item} />
                <ChapterLayer show={!hideOptions.cv} {...item} />
                <Box sx={{ marginTop: '4px', marginBottom: '4px', opacity: hideOptions.cn ? 0 : 1 }}>{version ? item.verse_gae : (item.verse_kor || item.verse_gae)}</Box>
                <div className='w-full flex justify-between items-end'>
                    <Box className={'h-7 mt-2 text-right text-gray-600 font-light'}>{commonShow && (item.category)}</Box>
                    <Box className='text-sm text-gray-400'>{idx+1}/{length}</Box>
                </div>
            </CardContent>
            {
                cookies.isLogin() ?
                    <div className={'absolute right-1 top-0'}>
                        <FormControlLabel
                            checked={(item.passed === null || item.passed === undefined) ? false : item.passed}
                            value={(item.passed === null || item.passed === undefined) ? false : item.passed}
                            control={<Checkbox color="primary" />}
                            label="암송"
                            labelPlacement="start"
                            onChange={(ev) => updatePassed(ev, item)}
                            />
                    </div>
                :   <></>

            }
        </Card>
    )
}
const ThemeLayer = ({show=true, theme = ''}) => (
    theme 
    ? 
        <div className={'h-7 text-xl'}>
            {show ? theme : ''}
        </div>
    :
        <></>
)
const ChapterLayer = ({show=true, bible_name = '', chapter = 0, f_verse = 0, l_verse = 0}) => (
    <>
        <Box className={'h-6 mt-2 flex flex-row space-x-1 text-green-600'}>
            {
                show 
                ? 
                    <>
                        <Typography sx={{ marginRight: '4px' }}>{bible_name}</Typography>
                        <Typography>{chapter}</Typography>
                        <Typography>:</Typography>
                        <Typography>{f_verse}</Typography>
                        {
                            l_verse 
                                ? <Fragment>
                                    ,
                                    <Typography>{l_verse}</Typography>
                                </Fragment> 
                                : <></>
                        }                    
                    </>
                : <></>
            }
        </Box>
    </>
)
export default React.forwardRef(CardComponent);