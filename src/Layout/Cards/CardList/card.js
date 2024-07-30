import { Box, Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import cookies from '../../../Data/cookies';

function CardComponent (props, ref) {
    
    const { item, updatePassed, version, idx, length } = props;
    return (
        <Card ref={ref} sx={{ margin: '8px', position: 'relative' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '4px', paddingBottom: '16px !important' }}>
                <ThemeLayer {...item} />
                <ChapterLayer {...item} />
                <Box sx={{ marginTop: '4px', marginBottom: '4px' }}>{version ? item.verse_gae : (item.verse_kor || item.verse_gae)}</Box>
                <div className='w-full flex justify-between items-end'>
                    <Box className={'mt-2 text-right text-gray-600 font-light'}>{item.category}</Box>
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
const ThemeLayer = ({theme = ''}) => (
    theme 
    ? 
        <div className={'text-xl'}>
            {theme}
        </div>
    :
        <></>
)
const ChapterLayer = ({bible_name = '', chapter = 0, f_verse = 0, l_verse = 0}) => (
    <>
        <Box className={'mt-2 flex flex-row space-x-1 text-green-600'}>
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
        </Box>
    </>
)
export default React.forwardRef(CardComponent);