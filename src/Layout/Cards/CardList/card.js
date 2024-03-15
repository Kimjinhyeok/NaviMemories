import { Box, Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import cookies from '../../../Data/cookies';

function CardComponent (props, ref) {
    
    const { item, updatePassed, version } = props;
    return (
        <Card ref={ref} sx={{ margin: '8px', position: 'relative' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '4px', marginBottom: '4px' }}>
                {
                    item.theme ? 
                        <div className={'text-xl'}>
                            {item.theme}
                        </div>
                    :
                        <></>
                }
                <Box className={'mt-2 flex flex-row space-x-1'}>
                    <Typography sx={{ marginRight: '4px' }}>{item.bible_name}</Typography>
                    <Typography>{item.chapter}</Typography>:
                    <Typography>{item.f_verse}</Typography>
                    {
                        item.l_verse ? <Fragment>~ <Typography>{item.l_verse}</Typography></Fragment> : <></>
                    }
                </Box>
                <Box sx={{ marginTop: '4px', marginBottom: '4px' }}>{version ? item.verse_gae : (item.verse_kor || item.verse_gae)}</Box>
                <Box className={'mt-2 text-right'}>{item.category}</Box>
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

export default React.forwardRef(CardComponent);