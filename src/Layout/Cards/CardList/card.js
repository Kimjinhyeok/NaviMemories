import { Box, Card, CardContent, Checkbox, FormControlLabel, makeStyles, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import cookies from '../../../Data/cookies';

function CardComponent (props, ref) {
    
    const { item, classes, updatePassed, version } = props;
    return (
        <Card className={classes.root} ref={ref}>
            <CardContent className={classes.c_content}>
                {
                    item.theme ? 
                        <div className={classes.title}>
                            {item.theme}
                        </div>
                    :
                        <></>
                }
                <Box className={classes.chapter}>
                    <Typography className={classes.bible_code}>{item.bible_name}</Typography>
                    <Typography>{item.chapter}</Typography>:
                    <Typography>{item.f_verse}</Typography>
                    {
                        item.l_verse ? <Fragment>~ <Typography>{item.l_verse}</Typography></Fragment> : <></>
                    }
                </Box>
                <Box className={classes.verse_text}>{version ? item.verse_gae : (item.verse_kor || item.verse_gae)}</Box>
                <Box className={classes.category}>{item.category}</Box>
            </CardContent>
            {
                cookies.isLogin() ?
                    <div className={classes.options}>
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